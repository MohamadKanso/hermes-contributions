import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { filterRecords, escapeHtml, diffHtml } from "../src/lib.js";
const d = JSON.parse(
  await readFile(
    new URL("../public/data/contributions.json", import.meta.url),
    "utf8",
  ),
);
test("every original pr has a plain-language summary and a real source", () => {
  for (const p of d.prs) {
    assert.ok(p.title && p.summary && p.area);
    assert.equal(
      p.url,
      `https://github.com/NousResearch/hermes-agent/pull/${p.number}`,
    );
  }
});
test("landed is contribution-level, not original pr merge state", () => {
  assert.equal(filterRecords(d, "prs", "", "landed").length, 14);
  assert.equal(d.prs.filter((p) => p.mergedAt).length, 0);
  assert.ok(
    filterRecords(d, "prs", "", "open").some((p) => p.status === "landed"),
  );
});
test("all 17 credited main commits are searchable", () => {
  assert.equal(filterRecords(d, "commits", "", "landed").length, 17);
  for (const c of d.commits.filter((c) => c.onMain))
    assert.equal(filterRecords(d, "commits", c.sha).length, 1);
});
test("queries match topic, number and are case insensitive", () => {
  assert.equal(filterRecords(d, "prs", "#112947")[0].number, 112947);
  assert.ok(filterRecords(d, "prs", "VISION").length);
  assert.equal(filterRecords(d, "prs", "nothingmatches123").length, 0);
});
test("closed does not imply authored issue or personal merge", () => {
  assert.equal(d.metrics.authoredIssues, 0);
  assert.ok(filterRecords(d, "issues", "", "closed").length > 0);
  assert.ok(
    filterRecords(d, "prs", "", "closed").every((p) => p.status !== "landed"),
  );
});
test("mention totals count source records, not praise", () => {
  assert.equal(new Set(d.mentions.map((m) => m.url)).size, 39);
  assert.equal(filterRecords(d, "mentions", "", "teknium1").length, 34);
});
test("public source strings are escaped before rendering", () => {
  assert.equal(
    escapeHtml('<img src=x onerror="oops">'),
    "&lt;img src=x onerror=&quot;oops&quot;&gt;",
  );
  assert.ok(!diffHtml("+<script>alert(1)</script>").includes("<script>"));
});
test("every featured source sha is on main", () => {
  for (const f of d.features)
    assert.ok(d.commits.find((c) => c.onMain && c.sha === f.sha));
});
test("every co-founder trail row has a verified source and commit link", () => {
  assert.equal(d.cofounderTrail.length, 13);
  for (const item of d.cofounderTrail) {
    assert.match(
      item.sourceUrl,
      /github\.com\/NousResearch\/hermes-agent\/pull\/\d+$/,
    );
    assert.match(
      item.originalUrl,
      /github\.com\/NousResearch\/hermes-agent\/pull\/\d+$/,
    );
    assert.match(
      item.mergedUrl,
      /github\.com\/NousResearch\/hermes-agent\/pull\/\d+$/,
    );
    assert.ok(item.commitUrls.length);
    assert.ok(
      item.commitUrls.every((url) =>
        /github\.com\/NousResearch\/hermes-agent\/commit\//.test(url),
      ),
    );
    assert.ok(item.quote.length > 0);
  }
});
test("related pr references resolve inside the archive", () => {
  for (const c of d.commits)
    for (const n of c.prs) assert.ok(d.prs.find((p) => p.number === n));
});
