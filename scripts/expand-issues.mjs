import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { readFile, writeFile } from "node:fs/promises";
const run = promisify(execFile);
const pulls = JSON.parse(await readFile(".audit/pulls.json", "utf8"));
const issues = JSON.parse(await readFile(".audit/issues.json", "utf8"));
const known = new Set([
  ...pulls.map((x) => x.pr.number),
  ...issues.map((x) => x.issue.number),
]);
const refs = new Set(
  pulls
    .filter((x) => ["MohamadKanso", "MoKanso"].includes(x.pr.user.login))
    .flatMap((x) =>
      [...`${x.pr.title}\n${x.pr.body}`.matchAll(/#(\d+)/g)].map((m) => +m[1]),
    ),
);
async function api(path, pages = false) {
  const a = ["api", `repos/NousResearch/hermes-agent/${path}`];
  if (pages) a.push("--paginate", "--slurp");
  const r = JSON.parse(
    (await run("gh", a, { maxBuffer: 32 * 1024 * 1024 })).stdout,
  );
  return pages ? r.flat() : r;
}
for (const n of refs) {
  if (known.has(n)) continue;
  const issue = await api(`issues/${n}`);
  if (issue.pull_request) continue;
  issues.push({
    issue,
    comments: await api(`issues/${n}/comments?per_page=100`, true),
    timeline: await api(`issues/${n}/timeline?per_page=100`, true),
  });
  console.log(`#${n} ${issue.title}`);
}
await writeFile(".audit/issues.json", JSON.stringify(issues, null, 2));
console.log(`total related issues: ${issues.length}`);
