import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { readFile, writeFile } from "node:fs/promises";

const run = promisify(execFile);
const base = "repos/NousResearch/hermes-agent";
const source = process.env.HERMES_SOURCE;
if (!source) throw new Error("set HERMES_SOURCE to the local hermes checkout");
const pulls = JSON.parse(await readFile(".audit/pulls.json", "utf8"));
const upstream = JSON.parse(
  await readFile(".audit/upstream-commits.json", "utf8"),
);
const git = async (args) =>
  (await run("git", args, { cwd: source, maxBuffer: 32 * 1024 * 1024 })).stdout;
const api = async (endpoint) =>
  JSON.parse(
    (await run("gh", ["api", endpoint], { maxBuffer: 32 * 1024 * 1024 }))
      .stdout,
  );
const baseSha = (await git(["rev-parse", "upstream/main"])).trim();
const current = await api(`${base}/commits/main`);
const recent = await api(
  `${base}/compare/${baseSha}...${current.sha}?per_page=100`,
);
if (recent.total_commits > recent.commits.length)
  throw new Error("recent comparison needs pagination");
const authored = pulls.filter((x) =>
  ["MohamadKanso", "MoKanso"].includes(x.pr.user.login),
);
const shas = new Set(authored.flatMap((x) => x.commits.map((c) => c.sha)));
const coauthorPattern =
  /co-authored-by:.*(?:mohamad\s*kanso|mkanso|kanso1245)/i;
const localCoauthors = (
  await git([
    "log",
    "upstream/main",
    "--format=%H",
    "--regexp-ignore-case",
    "--grep=co-authored-by:.*kanso",
  ])
)
  .trim()
  .split("\n")
  .filter(Boolean);
const coauthors = new Set([
  ...localCoauthors,
  ...recent.commits
    .filter((c) => coauthorPattern.test(c.commit.message))
    .map((c) => c.sha),
]);
for (const c of upstream) shas.add(c.commit.sha);
for (const sha of coauthors) shas.add(sha);
const result = [];
const pending = [...shas];
await Promise.all(
  Array.from({ length: 4 }, async () => {
    while (pending.length) {
      const sha = pending.shift();
      let commit;
      try {
        commit = JSON.parse(
          await readFile(`.audit/commit-${sha}.json`, "utf8"),
        );
      } catch {
        commit = await api(`${base}/commits/${sha}`);
        await writeFile(`.audit/commit-${sha}.json`, JSON.stringify(commit));
      }
      const belongs = authored
        .filter((x) => x.commits.some((c) => c.sha === sha))
        .map((x) => x.pr.number);
      const landedAuthor = upstream.some((x) => x.commit.sha === sha);
      const landedCoauthor =
        coauthors.has(sha) && coauthorPattern.test(commit.commit.message);
      let linked = [];
      if (landedAuthor || landedCoauthor)
        linked = await api(`${base}/commits/${sha}/pulls`);
      result.push({
        commit,
        authoredPRs: belongs,
        landedAuthor,
        landedCoauthor,
        linked,
      });
    }
  }),
);
await writeFile(".audit/all-commits.json", JSON.stringify(result, null, 2));
await writeFile(
  ".audit/ancestry.json",
  JSON.stringify(
    {
      checkedAt: new Date().toISOString(),
      localAncestor: baseSha,
      currentMain: current.sha,
      status: recent.status,
      newCommits: recent.total_commits,
      coauthorShas: [...coauthors],
    },
    null,
    2,
  ),
);
console.log({
  allCommits: result.length,
  prCommits: result.filter((x) => x.authoredPRs.length).length,
  authoredLanded: result.filter((x) => x.landedAuthor).length,
  coauthoredLanded: result.filter((x) => x.landedCoauthor).length,
  main: current.sha,
});
