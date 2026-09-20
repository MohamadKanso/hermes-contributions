import { readFile } from "node:fs/promises";
import assert from "node:assert/strict";
const raw = await readFile("public/data/contributions.json", "utf8");
const d = JSON.parse(raw);
assert.equal(d.prs.length, d.metrics.prs);
assert.equal(d.integrations.length, d.metrics.landed);
assert.equal(
  d.commits.filter((c) => c.onMain).length,
  d.metrics.authoredMain + d.metrics.coauthoredMain,
);
assert.equal(d.mentions.length, d.metrics.mentions);
assert.equal(d.issues.length, d.metrics.issues);
assert.equal(d.cofounderTrail.length, 13);
assert.equal(new Set(d.prs.map((x) => x.number)).size, d.prs.length);
assert.equal(new Set(d.commits.map((x) => x.sha)).size, d.commits.length);
assert.equal(
  new Set(d.integrations.map((x) => x.original)).size,
  d.integrations.length,
);
for (const i of d.integrations) {
  assert.ok(i.date);
  assert.ok(d.prs.find((p) => p.number === i.original));
  assert.ok(i.commits.length);
  for (const sha of i.commits)
    assert.ok(d.commits.find((c) => c.sha === sha && c.onMain));
}
for (const f of d.features) {
  assert.ok(f.snippet.text.includes("@@"));
  assert.ok(d.commits.find((c) => c.sha === f.sha && c.onMain));
}
for (const item of d.cofounderTrail) {
  assert.ok(item.quote);
  assert.ok(item.sourceUrl.endsWith(`/pull/${item.via}`));
  assert.ok(item.originalUrl.endsWith(`/pull/${item.original}`));
  assert.ok(item.commitUrls.length);
}
function checkLinks(value) {
  if (!value || typeof value !== "object") return;
  for (const [key, child] of Object.entries(value)) {
    if ((key === "url" || key === "alternative") && typeof child === "string") {
      const u = new URL(child);
      assert.equal(u.protocol, "https:");
      assert.equal(u.hostname, "github.com");
      assert.ok(!u.searchParams.has("email_token"));
    } else checkLinks(child);
  }
}
checkLinks(d);
assert.ok(
  !/(?:\/Users\/|users\.noreply\.github\.com|ghp_[A-Za-z0-9]{20,}|github_pat_)/.test(
    raw,
  ),
);
console.log(
  `verified ${d.prs.length} prs, ${d.commits.length} commit objects, ${d.integrations.length} landed contributions`,
);
