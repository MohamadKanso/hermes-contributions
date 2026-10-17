import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { readFile, writeFile } from "node:fs/promises";

const run = promisify(execFile);
const base = "repos/NousResearch/hermes-agent";
const pulls = JSON.parse(await readFile(".audit/pulls.json", "utf8"));
const upstream = JSON.parse(
  await readFile(".audit/upstream-commits.json", "utf8"),
);
const api = async (endpoint, args = []) =>
  JSON.parse(
    (
      await run("gh", ["api", ...args, endpoint], {
        maxBuffer: 32 * 1024 * 1024,
      })
    ).stdout,
  );
const current = await api(`${base}/commits/main`);
const authored = pulls.filter((x) =>
  ["MohamadKanso", "MoKanso"].includes(x.pr.user.login),
);
const shas = new Set(authored.flatMap((x) => x.commits.map((c) => c.sha)));
const coauthorPattern =
  /co-authored-by:.*(?:mohamad\s*kanso|mkanso|kanso1245)/i;
// github commit search covers the default branch. every trailer hit is
// re-checked below as an ancestor of the current main head.
const coauthorQueries = [
  '"Co-authored-by: MohamadKanso"',
  '"Co-authored-by: Mohamad Kanso"',
  '"91088196+MohamadKanso"',
  '"kanso1245@gmail.com"',
  "co-authored-by kanso",
];
const coauthors = new Set();
for (const q of coauthorQueries) {
  const pages = await api("search/commits", [
    "-X",
    "GET",
    "-f",
    `q=repo:NousResearch/hermes-agent ${q}`,
    "-f",
    "per_page=100",
    "--paginate",
    "--slurp",
  ]);
  for (const item of pages.flatMap((p) => p.items))
    if (coauthorPattern.test(item.commit.message)) coauthors.add(item.sha);
}
for (const sha of coauthors) {
  const { status } = await api(`${base}/compare/${sha}...${current.sha}`);
  if (!["ahead", "identical"].includes(status))
    throw new Error(`co-authored commit not on main: ${sha} (${status})`);
}
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
      method: "github commit search, each sha checked against main",
      currentMain: current.sha,
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
