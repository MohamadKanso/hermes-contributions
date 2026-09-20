import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";

const run = promisify(execFile);
const root = new URL("../.audit/", import.meta.url);
await mkdir(root, { recursive: true });
const errors = [];
const repo = "NousResearch/hermes-agent";
const accounts = ["MohamadKanso", "MoKanso"];

async function api(endpoint, paginate = false) {
  const key = createHash("sha256")
    .update(endpoint + paginate)
    .digest("hex");
  const path = new URL(`cache/${key}.json`, root);
  if (!process.argv.includes("--refresh")) {
    try {
      return JSON.parse(await readFile(path, "utf8"));
    } catch {}
  }
  const args = ["api", endpoint];
  if (paginate) args.push("--paginate", "--slurp");
  for (let retry = 0; retry < 3; retry++) {
    try {
      const { stdout } = await run("gh", args, { maxBuffer: 64 * 1024 * 1024 });
      const parsed = JSON.parse(stdout);
      const value = paginate ? parsed.flat() : parsed;
      await mkdir(new URL("cache/", root), { recursive: true });
      await writeFile(path, JSON.stringify(value));
      return value;
    } catch (error) {
      if (retry === 2)
        throw new Error(`${endpoint}: ${error.stderr || error.message}`);
      await new Promise((resolve) => setTimeout(resolve, 700 * (retry + 1)));
    }
  }
}

async function mapLimit(items, fn, limit = 5) {
  let cursor = 0;
  const out = new Array(items.length);
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (cursor < items.length) {
        const i = cursor++;
        try {
          out[i] = await fn(items[i]);
        } catch (error) {
          errors.push(String(error));
          out[i] = null;
        }
      }
    }),
  );
  return out.filter(Boolean);
}

async function search(q) {
  const pages = await api(
    `search/issues?q=${encodeURIComponent(q)}&per_page=100`,
    true,
  );
  const total = pages[0]?.total_count || 0;
  const items = pages.flatMap((p) => p.items);
  if (items.length !== total)
    errors.push(`search completeness: ${q}: ${items.length}/${total}`);
  return { query: q, total, items };
}

const searches = await mapLimit(
  accounts.flatMap((name) => [
    `repo:${repo} is:pr author:${name}`,
    `repo:${repo} is:issue author:${name}`,
    `repo:${repo} mentions:${name}`,
    `repo:${repo} "${name}" in:body,comments`,
  ]),
  search,
);
await writeFile(
  new URL("searches.json", root),
  JSON.stringify(searches, null, 2),
);
const found = new Map(
  searches.flatMap((s) => s.items).map((p) => [p.number, p]),
);
const prs = [...found.values()].filter((i) => i.pull_request);
console.log(`collecting ${prs.length} authored or mentioned pull requests`);
const details = await mapLimit(
  prs,
  async (item) => {
    const base = `repos/${repo}`;
    const results = await Promise.all([
      api(`${base}/pulls/${item.number}`),
      api(`${base}/issues/${item.number}/comments?per_page=100`, true),
      api(`${base}/pulls/${item.number}/reviews?per_page=100`, true),
      api(`${base}/pulls/${item.number}/comments?per_page=100`, true),
      api(`${base}/pulls/${item.number}/commits?per_page=100`, true),
      api(`${base}/pulls/${item.number}/files?per_page=100`, true),
      api(`${base}/issues/${item.number}/timeline?per_page=100`, true),
    ]);
    const [pr, comments, reviews, reviewComments, commits, files, timeline] =
      results;
    console.log(
      `#${item.number} ${pr.merged_at ? "merged" : pr.state} ${comments.length} comments ${commits.length} commits`,
    );
    return { pr, comments, reviews, reviewComments, commits, files, timeline };
  },
  3,
);
await writeFile(new URL("pulls.json", root), JSON.stringify(details, null, 2));

const issueNumbers = new Set(
  [...found.values()].filter((i) => !i.pull_request).map((i) => i.number),
);
for (const { pr, timeline } of details) {
  if (!accounts.includes(pr.user.login)) continue;
  const text = `${pr.title}\n${pr.body}`;
  for (const match of text.matchAll(
    /(?:fix(?:es|ed)?|close[sd]?|resolv(?:e[sd]?))\s+#(\d+)/gi,
  ))
    issueNumbers.add(Number(match[1]));
  const titleIssue = pr.title.match(/\(#(\d+)\)/);
  if (titleIssue) issueNumbers.add(Number(titleIssue[1]));
  for (const event of timeline) {
    const issue = event.source?.issue;
    if (issue && !issue.pull_request && issue.repository_url?.endsWith(repo))
      issueNumbers.add(issue.number);
  }
}
const issues = await mapLimit([...issueNumbers], async (number) => ({
  issue: await api(`repos/${repo}/issues/${number}`),
  comments: await api(
    `repos/${repo}/issues/${number}/comments?per_page=100`,
    true,
  ),
  timeline: await api(
    `repos/${repo}/issues/${number}/timeline?per_page=100`,
    true,
  ),
}));
await writeFile(new URL("issues.json", root), JSON.stringify(issues, null, 2));

const commits = await mapLimit(accounts, (name) =>
  api(`repos/${repo}/commits?author=${name}&per_page=100`, true),
);
const unique = [...new Map(commits.flat().map((c) => [c.sha, c])).values()];
const upstream = await mapLimit(unique, async (c) => ({
  commit: await api(`repos/${repo}/commits/${c.sha}`),
  pulls: await api(`repos/${repo}/commits/${c.sha}/pulls?per_page=100`, true),
}));
await writeFile(
  new URL("upstream-commits.json", root),
  JSON.stringify(upstream, null, 2),
);
await writeFile(
  new URL("manifest.json", root),
  JSON.stringify(
    {
      checkedAt: new Date().toISOString(),
      repo,
      accounts,
      authoredPRs: details.filter((x) => accounts.includes(x.pr.user.login))
        .length,
      scannedPRs: details.length,
      scannedIssues: issues.length,
      upstreamAttributedCommits: upstream.length,
      errors,
    },
    null,
    2,
  ),
);
console.log(
  JSON.stringify({
    pulls: details.length,
    issues: issues.length,
    upstreamCommits: upstream.length,
    errors,
  }),
);
