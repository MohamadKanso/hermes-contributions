import "@fontsource/barlow-condensed/latin-300.css";
import "@fontsource/barlow-condensed/latin-400.css";
import "@fontsource/barlow-condensed/latin-500.css";
import "@fontsource/ibm-plex-mono/latin-400.css";
import "./style.css";
import {
  escapeHtml as e,
  filterRecords,
  displayDate,
  diffHtml,
} from "./lib.js";

const arrow =
  '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" stroke-width="1.2"/></svg>';
const outArrow =
  '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12" stroke="currentColor" stroke-width="1.2"/></svg>';
const ext = (url, label, cls = "text-link") =>
  `<a class="${cls}" href="${e(url)}" target="_blank" rel="noopener noreferrer">${label}${outArrow}</a>`;
const ghPR = (n) => `https://github.com/NousResearch/hermes-agent/pull/${n}`;
const outcomeLabel = (p) =>
  p.landed
    ? p.landed.kind === "authored"
      ? "code landed"
      : "co-author credit"
    : p.status;
const state = { tab: "prs", status: "all", query: "", page: 1, feature: 0 };
const pageSize = 9;
let data;
let lastFocus;
let toastTimer;
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
let motion = !reduced.matches;

async function init() {
  const response = await fetch(
    `${import.meta.env.BASE_URL}data/contributions.json`,
  );
  if (!response.ok) throw new Error("evidence index unavailable");
  data = await response.json();
  renderPage();
  wireEvents();
  renderFeature();
  renderArchive();
  setMotion(motion);
  openHash();
  if (location.hash && !location.hash.startsWith("#pr-"))
    requestAnimationFrame(() =>
      document.getElementById(location.hash.slice(1))?.scrollIntoView(),
    );
}

function graph() {
  const paths = data.integrations
    .map((r, i) => {
      const y = 120 + i * 26;
      const x = 72 + Math.cos(i * 0.48) * 43;
      const lines = Array.from({ length: 5 }, (_, k) => {
        const o = k * 2.8;
        return `<path d="M${x} ${y + o} C${235 + o} ${y + o}, ${246 + o} ${240 - o}, 330 ${255 - o} S${508 + o} ${224 - o}, 565 ${39 + o}"/>`;
      }).join("");
      return `<g class="map-thread" data-map-thread="${r.original}">${lines}<a href="#pr-${r.original}" aria-label="${e(r.title)}: view contribution"><circle class="map-hit" cx="${x}" cy="${y}" r="12"/><circle class="map-node" cx="${x}" cy="${y}" r="3"/>${i % 3 === 0 ? `<text x="${x - 12}" y="${y + 3}" text-anchor="end">${r.original}</text>` : ""}</a></g>`;
    })
    .join("");
  return `<svg class="contribution-map" viewBox="0 0 650 535" role="group" aria-label="14 contribution paths into hermes main">
    <g class="map-guides"><path d="M22 505H621M330 70V483M565 20V505"/><path d="M324 70h12M324 483h12M559 505h12"/></g>
    <g class="map-streams">${paths}</g><circle cx="565" cy="39" r="4" fill="currentColor"/>
    <text class="map-end" x="582" y="43">main</text><text x="338" y="397">14 paths</text><text x="338" y="413">into hermes</text>
    <text x="23" y="524">original patches</text><text x="622" y="524" text-anchor="end">merged changes</text>
  </svg>`;
}

function renderPage() {
  const m = data.metrics;
  document.querySelector("#app").innerHTML = `
  <section class="hero blue" id="top">
    <div class="hero-frame">
      <header class="header"><a class="wordmark" href="#top" aria-label="mohamad kanso home"><span class="mark" aria-hidden="true">m/k</span> mohamad kanso</a><nav aria-label="main navigation"><a href="#work">work</a><a href="#credits">credits</a><a href="#archive">archive</a>${ext("https://github.com/MohamadKanso", "github", "nav-github")}</nav></header>
      <div class="hero-content"><div class="hero-copy"><p class="overline"><span class="status-dot"></span> independent open-source contributor</p><h1>small fixes.<br><strong>real impact.</strong></h1><p class="hero-intro">i contribute to hermes agent, the open-source agent from nous research. here’s the work and the path into main.</p><a class="button hero-cta" href="#work">explore the work ${arrow}</a><a class="project-link" href="https://github.com/NousResearch/hermes-agent" target="_blank" rel="noopener noreferrer">hermes agent / nous research ${outArrow}</a></div>
      <div class="map-wrap">${graph()}<div class="map-caption"><span id="map-caption">each point opens a real contribution</span><button id="motion-toggle" aria-pressed="true">motion on</button></div></div></div>
      <div class="hero-stats"><a href="#method"><strong>${m.landed.toString().padStart(2, "0")}</strong><span>landed contributions<small>through merged community prs</small></span></a><a href="#archive" data-jump="commits"><strong>${m.authoredMain + m.coauthoredMain}</strong><span>credited commits on main<small>8 authored + 9 co-authored</small></span></a><a href="#archive" data-jump="prs"><strong>${m.prs}</strong><span>pull requests opened<small>the full record, not just the wins</small></span></a></div>
    </div><div class="hero-foot"><span>field notes / 13–20 september 2026</span><span>snapshot checked ${displayDate(data.checkedAt)}</span></div>
  </section>
  <section class="section work" id="work"><div class="section-rule"><span>01 / selected work</span><span>code, context, outcome</span></div><div class="section-heading"><h2>the work,<br><em>in context.</em></h2><p>small changes at the boundaries where agents lose context, switch sessions, route models or fail to recover.</p></div>
    <div class="feature-layout"><div class="feature-menu" role="tablist" aria-label="selected contributions">${data.features.map((f, i) => `<button role="tab" id="feature-tab-${i}" aria-selected="${i === 0}" aria-controls="feature-panel" tabindex="${i === 0 ? 0 : -1}" data-feature="${i}"><span class="feature-index">0${i + 1}</span><span>${e(descriptionsFor(f.id).title)}</span>${arrow}</button>`).join("")}</div><div id="feature-panel" role="tabpanel" aria-labelledby="feature-tab-0" tabindex="0"></div></div>
  </section>
  <section class="credits blue" id="credits"><div class="section-rule"><span>02 / the paper trail</span><span>in the maintainers’ own words</span></div>
    <div class="credit-main"><div><p class="overline">${e(data.quotes[0].label)}</p><blockquote>“${e(data.quotes[0].quote)}”</blockquote>${ext(data.quotes[0].url, "read the original comment", "button")}</div><div class="credit-margin"><span class="credit-cross" aria-hidden="true">+</span><p>@teknium1<br>nous research co-founder<br>hermes maintainer<br>${ext("https://www.delphiintelligence.io/research/ama-1-transcript-with-nous-research-co-founder-and-post-training-lead-teknium1", "role source")}</p><p>on the scheduler drift fix<br>18 september 2026</p><p class="credit-note">an excerpt, not a separate endorsement. the link opens the full conversation.</p></div></div>
    <div class="credit-grid">${data.quotes
      .slice(1)
      .map(
        (q) =>
          `<article><p class="overline">${e(q.label)}</p><blockquote>“${e(q.quote)}”</blockquote><p class="credit-by">@${e(q.by)}<br><span>${e(q.context)}</span></p>${ext(q.url, "view source")}</article>`,
      )
      .join("")}</div>
    <details class="credit-ledger"><summary>show all ${data.cofounderTrail.length} co-founder integration references ${arrow}</summary><p class="credit-ledger-intro">these are direct excerpts from @teknium1’s merged pull request descriptions. each row links the original proposal, the merged integration and the credited main commit. the archive still includes all ${m.tekniumMentions} explicit @teknium1 references, including discussion and coordination.</p><ol>${data.cofounderTrail
      .map(
        (item) =>
          `<li><div class="credit-ledger-copy"><p class="overline">${e(item.label)} · ${e(item.kind)}</p><blockquote>“${e(item.quote)}”</blockquote><p>${e(item.note)}</p></div><div class="credit-ledger-links">${ext(item.originalUrl, `original #${item.original}`)}${ext(item.mergedUrl, `merged #${item.via}`)}${item.commitUrls.map((url, i) => ext(url, `commit ${i + 1}`)).join("")}${ext(item.sourceUrl, "source text")}</div></li>`,
      )
      .join("")}</ol></details>
    <div class="credit-bottom"><p>every credit has a source. shared work stays shared.</p><a href="#archive" data-jump="mentions" data-filter="teknium1">browse all ${m.tekniumMentions} @teknium1 references ${arrow}</a></div>
  </section>
  <section class="section process" id="approach"><div class="section-rule"><span>03 / what the work taught me</span><span>better through review</span></div><div class="process-grid"><h2>less code.<br><em>better boundaries.</em></h2><div class="principles"><article><span>01</span><div><h3>test the thing that must stay true.</h3><p>a session should not change mid-turn. a dead viewer should not keep a terminal alive. the best tests make those rules visible.</p>${ext(ghPR(113210), "session invariant tests")}</div></article><article><span>02</span><div><h3>use the seam that already exists.</h3><p>review pushed these fixes toward shared helpers and existing guards. the smaller final implementation often tells the clearest story.</p>${ext(ghPR(116346), "the provider routing redo")}</div></article><article><span>03</span><div><h3>follow the change, not just the pr.</h3><p>maintainers sometimes combine patches or carry the useful part into a new pr. this archive follows that chain and states exactly what landed.</p>${ext(ghPR(111344), "the skills-preservation chain")}</div></article></div></div></section>
  <section class="section archive" id="archive"><div class="section-rule"><span>04 / the complete record</span><span>every outcome, linked</span></div><div class="section-heading archive-heading"><h2>nothing<br><em>left out.</em></h2><p>explore the patches, related issues, reachable commits and public mentions. open and superseded work stays visible too.</p></div>
    <div class="archive-tabs" role="tablist" aria-label="archive type">${[
      ["prs", "pull requests", m.prs],
      ["commits", "commits", m.inspectedCommits],
      ["issues", "related issues", m.issues],
      ["mentions", "mentions", m.mentions],
    ]
      .map(
        ([id, label, count]) =>
          `<button role="tab" id="archive-tab-${id}" aria-selected="${id === "prs"}" aria-controls="archive-panel" tabindex="${id === "prs" ? 0 : -1}" data-tab="${id}">${label}<span>${count}</span></button>`,
      )
      .join("")}</div>
    <div class="archive-controls"><label class="search-wrap"><svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="8" cy="8" r="5.5" fill="none" stroke="currentColor"/><path d="m12 12 5 5" stroke="currentColor"/></svg><span class="sr-only">search the archive</span><input id="search" type="search" placeholder="search a topic, pr or commit" autocomplete="off"></label><label class="filter-label">show <select id="status-filter" aria-label="filter archive status"></select></label></div>
    <p class="archive-explainer" id="archive-explainer"></p><div id="archive-panel" role="tabpanel" aria-labelledby="archive-tab-prs"><div id="archive-table"></div></div>
    <div class="pagination"><p id="result-count" aria-live="polite"></p><div><button id="prev-page" aria-label="previous archive page">${arrow}</button><span id="page-label"></span><button id="next-page" aria-label="next archive page">${arrow}</button></div></div>
  </section>
  <section class="section method" id="method"><div class="section-rule"><span>05 / how this is counted</span><span>no inflated numbers</span></div><div class="method-grid"><h2>proof,<br><em>not a claim.</em></h2><div><p class="method-lead">${m.landed} distinct contributions are connected to merged upstream prs with author or co-author credit.</p><p>six merged prs contain my authored commits. eight more carry co-author credit. that is ${m.authoredMain} authored and ${m.coauthoredMain} co-authored commits on main. the work is collaborative, not a claim that i wrote each merged pr in full.</p><details><summary>what “landed” means here ${arrow}</summary><p>${m.directMerges} of my original prs were merged directly at this snapshot. maintainers carried accepted work into their own prs. some original prs are closed, and one still-open proposal has a smaller idea credited in an already-merged change. the archive records both states.</p></details><details><summary>audit scope and limits ${arrow}</summary><p>checked ${m.scannedPRs} authored or mention-related prs, ${m.issues} related issues and ${m.inspectedCommits} distinct commit objects. ${m.prCommits} are reachable from the recorded pr histories, including ${m.authoredPrCommits} authored by me and two upstream commits. ${m.authoredIssues} issues were filed by me; the issue list is related work, not an authorship claim.</p><p>the ${m.mentions} mention count is distinct public descriptions or comments by other accounts that explicitly tag me, including ${m.tekniumMentions} by teknium. mentions can be credit, coordination or criticism, not all praise. deleted content, overwritten branch history and unlinked private discussion are outside this audit.</p><p>the monthly top-50 ranking was not verified and is not claimed. this is a dated snapshot, not a live status dashboard.</p></details><details><summary>source, reuse and build notes ${arrow}</summary><p>the design takes cues from the ultramarine hermes landing page and the quieter nous research site. the implementation and contribution map are original. no official branding, proprietary fonts or artwork have been copied.</p><p>code excerpts are from the mit-licensed hermes repository. comments are short linked excerpts. this is an independent contributor’s portfolio, not an official nous research page.</p><p>${ext("https://github.com/MohamadKanso/hermes-contributions", "site source")} ${ext("https://hermes-agent.nousresearch.com/", "hermes reference")} ${ext("https://nousresearch.com/", "nous reference")}</p></details><a class="download-link" href="${import.meta.env.BASE_URL}data/contributions.json" download="hermes-contributions-2026-09-20.json">download the evidence index ${arrow}</a></div></div></section>
  <footer class="footer blue"><div class="footer-main"><div><p class="overline">more useful agents. one contribution at a time.</p><a class="footer-name" href="https://github.com/MohamadKanso" target="_blank" rel="noopener noreferrer">mohamad kanso ${outArrow}</a></div><div class="footer-links">${ext("https://github.com/MohamadKanso", "github")}${ext("https://www.linkedin.com/in/mohamadkanso/", "linkedin")}<a href="#top">back to top ${arrow}</a></div></div><div class="footer-fine"><span>independent contributor / not affiliated with nous research</span><span>built for the work to speak for itself / 2026</span></div></footer>`;
}
function descriptionsFor(id) {
  return data.prs.find((p) => p.number === id);
}
function renderFeature() {
  const f = data.features[state.feature],
    p = descriptionsFor(f.id),
    l = f.integration;
  document.querySelectorAll("[data-feature]").forEach((b, i) => {
    b.setAttribute("aria-selected", String(i === state.feature));
    b.tabIndex = i === state.feature ? 0 : -1;
  });
  const panel = document.querySelector("#feature-panel");
  panel.setAttribute("aria-labelledby", `feature-tab-${state.feature}`);
  panel.innerHTML = `<div class="feature-meta"><span>${e(p.area)}</span><span class="status landed">${l.kind === "authored" ? "authored code landed" : "co-author credit"}</span></div><h3>${e(f.headline)}</h3><div class="before-after"><div><span class="overline">the problem</span><p>${e(f.before)}</p></div><div><span class="overline">what changed</span><p>${e(f.after)}</p></div></div><div class="lineage">${p.issues.length ? `<a href="https://github.com/NousResearch/hermes-agent/issues/${p.issues[0]}" target="_blank" rel="noopener noreferrer"><small>reported issue</small>#${p.issues[0]}</a>` : "<span><small>reported issue</small>upstream report</span>"}${arrow}<a href="${p.url}" target="_blank" rel="noopener noreferrer"><small>my proposal</small>#${f.id}</a>${arrow}<a href="${l.url}" target="_blank" rel="noopener noreferrer"><small>merged change</small>#${l.via}</a></div><div class="code-panel"><div class="code-heading"><span>landed diff / ${e(f.snippet.path)}</span>${ext(f.snippet.url, "source")}</div><pre tabindex="0" aria-label="landed code excerpt"><code>${diffHtml(f.snippet.text)}</code></pre><p>excerpt from ${f.sha.slice(0, 7)} · ${l.kind === "authored" ? "authored commit" : "shared co-authored commit"}</p></div><div class="feature-note"><p>${e(l.note)}</p><button class="text-link" data-detail="${f.id}">full contribution record ${arrow}</button></div>`;
}
const filterOptions = {
  prs: [
    ["all", "all outcomes"],
    ["landed", "landed contribution"],
    ["in review", "integration in review"],
    ["open", "original pr open"],
    ["closed", "closed, not landed"],
  ],
  commits: [
    ["all", "all inspected commits"],
    ["landed", "credited on main"],
    ["pr", "pr history only"],
  ],
  issues: [
    ["all", "all related issues"],
    ["open", "open"],
    ["closed", "closed"],
  ],
  mentions: [
    ["all", "all mentions"],
    ["teknium1", "by teknium"],
  ],
};
function updateFilter() {
  document.querySelector("#status-filter").innerHTML = filterOptions[state.tab]
    .map(([v, l]) => `<option value="${v}">${l}</option>`)
    .join("");
  document.querySelector("#status-filter").value = state.status;
}
function renderArchive() {
  const items = filterRecords(data, state.tab, state.query, state.status);
  const pages = Math.max(1, Math.ceil(items.length / pageSize));
  state.page = Math.min(state.page, pages);
  const slice = items.slice((state.page - 1) * pageSize, state.page * pageSize);
  if (document.querySelector("#status-filter").options.length === 0)
    updateFilter();
  document
    .querySelector("#archive-panel")
    .setAttribute("aria-labelledby", `archive-tab-${state.tab}`);
  document.querySelector("#archive-explainer").textContent = {
    prs: "“landed” follows the accepted contribution into a maintainer pr. it does not mean the original pr was merged directly.",
    commits:
      "17 credited commits on main plus 66 distinct commits in the original pr histories. rebased or cherry-picked versions are separate objects, not extra fixes.",
    issues:
      "related reports read during the audit. these were filed by the community, not by me. a closed issue is not automatically my fix.",
    mentions:
      "39 distinct places where another account tagged me. some are credit, some are coordination or criticism. open the source for the full context.",
  }[state.tab];
  document.querySelectorAll("[data-tab]").forEach((b) => {
    b.setAttribute("aria-selected", String(b.dataset.tab === state.tab));
    b.tabIndex = b.dataset.tab === state.tab ? 0 : -1;
  });
  const head =
    state.tab === "prs"
      ? ["ref", "contribution", "area", "outcome"]
      : state.tab === "commits"
        ? ["commit", "change", "attribution", "record"]
        : state.tab === "issues"
          ? ["issue", "reported problem", "filed by", "state"]
          : ["source", "mention context", "by", "type"];
  const rows = slice
    .map((item) => {
      if (state.tab === "prs")
        return `<tr><td class="ref">#${item.number}</td><td><button class="row-title" data-detail="${item.number}">${e(item.title)} ${outArrow}</button><small class="row-subtitle">${e(item.summary)}</small></td><td class="area-cell">${e(item.area)}</td><td><span class="status ${item.status.replaceAll(" ", "-")}">${e(outcomeLabel(item))}</span>${item.landed ? `<small class="row-subtitle">via #${item.landed.via}${item.state === "open" ? "<br>original pr open" : ""}</small>` : ""}</td></tr>`;
      if (state.tab === "commits")
        return `<tr><td class="ref">${item.sha.slice(0, 7)}</td><td>${ext(item.url, e(item.title), "row-title")}<small class="row-subtitle">${displayDate(item.date)} · ${item.files.length} files</small></td><td class="area-cell">${e(item.role)}</td><td><span class="status ${item.onMain ? "landed" : "open"}">${item.onMain ? "on main" : "pr history"}</span></td></tr>`;
      if (state.tab === "issues")
        return `<tr><td class="ref">#${item.number}</td><td>${ext(item.url, e(item.title), "row-title")}<small class="row-subtitle">${item.prs.length ? "my related " + item.prs.map((n) => "#" + n).join(", ") : "related upstream discussion"}</small></td><td class="area-cell">${e(item.author)}</td><td><span class="status ${item.state}">${item.state}</span></td></tr>`;
      return `<tr><td class="ref">#${item.number}</td><td>${ext(item.url, e(item.title), "row-title")}<small class="row-subtitle">${e(item.credit)}</small></td><td class="area-cell">@${e(item.by)}</td><td>${e(item.kind)}</td></tr>`;
    })
    .join("");
  document.querySelector("#archive-table").innerHTML = items.length
    ? `<div class="table-scroll"><table><caption class="sr-only">${state.tab} contribution archive</caption><thead><tr>${head.map((h) => `<th scope="col">${h}</th>`).join("")}</tr></thead><tbody>${rows}</tbody></table></div>`
    : `<div class="empty-state"><h3>nothing matches that search.</h3><p>try a topic like “vision”, a pr number, or clear the filters.</p><button id="clear-filters" class="button">clear filters ${arrow}</button></div>`;
  document.querySelector("#result-count").textContent = items.length
    ? `${(state.page - 1) * pageSize + 1}–${Math.min(state.page * pageSize, items.length)} of ${items.length} records`
    : "0 records";
  document.querySelector("#page-label").textContent =
    `${state.page} / ${pages}`;
  document.querySelector("#prev-page").disabled = state.page === 1;
  document.querySelector("#next-page").disabled = state.page === pages;
}
function changeTab(tab, filter = "all") {
  state.tab = tab;
  state.status = filter;
  state.page = 1;
  state.query = "";
  document.querySelector("#search").value = "";
  updateFilter();
  renderArchive();
}
function setMotion(value) {
  motion = value;
  document.documentElement.dataset.motion = String(value);
  const b = document.querySelector("#motion-toggle");
  if (b) {
    b.textContent = `motion ${value ? "on" : "off"}`;
    b.setAttribute("aria-pressed", String(value));
  }
}
function showToast(text) {
  clearTimeout(toastTimer);
  const t = document.querySelector("#toast");
  t.textContent = text;
  t.classList.add("visible");
  toastTimer = setTimeout(() => t.classList.remove("visible"), 2400);
}
function openHash() {
  const match = location.hash.match(/^#pr-(\d+)$/);
  if (match) showDetail(+match[1]);
}
function showDetail(number) {
  const p = data.prs.find((p) => p.number === number);
  if (!p) return;
  const dialog = document.querySelector("#detail-dialog");
  if (!dialog.open) lastFocus = document.activeElement;
  const role = p.landed
    ? `<p class="detail-outcome">${e(p.landed.note)}</p>${ext(p.landed.url, `merged through #${p.landed.via}`, "button")}`
    : p.pending
      ? `<p class="detail-outcome">a maintainer has a related integration open at #${p.pending.number}. it has not been counted as landed.</p>${ext(p.pending.url, "view the integration", "button")}`
      : `<p class="detail-outcome">${p.state === "open" ? "this proposal is still open. it is not counted as a landed contribution." : "this original pr is closed. no authored or co-authored main-branch commit was verified for it in this audit."}</p>${p.alternative ? ext(p.alternative, "related maintainer decision", "button") : ""}`;
  document.querySelector("#detail-content").innerHTML =
    `<div class="detail-top"><span>contribution record / #${p.number}</span><button class="close-detail" aria-label="close contribution record">close <span aria-hidden="true">×</span></button></div><div class="detail-body"><p class="overline">${e(p.area)} · ${displayDate(p.created)}</p><h2 id="detail-title">${e(p.title)}</h2><p class="detail-summary">${e(p.summary)}</p><div class="detail-badges"><span class="status ${p.status.replaceAll(" ", "-")}">${p.status}</span><span>original pr: ${p.state}</span><span>${p.commits.length} ${p.commits.length === 1 ? "commit" : "commits"}</span></div>${role}<div class="detail-links">${ext(p.url, "original pr")}${ext(`${p.url}/files`, "full diff")}<button class="text-link" id="copy-record" data-number="${p.number}">copy record link ${arrow}</button></div>${p.issues.length ? `<h3>related reports</h3><div class="detail-links">${p.issues.map((n) => ext(`https://github.com/NousResearch/hermes-agent/issues/${n}`, `#${n}`)).join("")}</div>` : ""}<h3>files changed</h3><ul class="file-list">${p.files.map((f) => `<li><code>${e(f.path)}</code><span>+${f.additions} / −${f.deletions}</span></li>`).join("")}</ul>${p.snippet ? `<div class="code-panel"><div class="code-heading">original pr excerpt / ${e(p.snippet.path)}</div><pre tabindex="0"><code>${diffHtml(p.snippet.text)}</code></pre><p>this is the proposal’s diff, not necessarily the final merged implementation</p></div>` : ""}<h3>commit trail</h3><ul class="commit-list">${p.commits
      .map((sha) => {
        const c = data.commits.find((x) => x.sha === sha);
        return `<li>${ext(c?.url || `https://github.com/NousResearch/hermes-agent/commit/${sha}`, `${sha.slice(0, 7)} · ${e(c?.title || "commit")}`)}</li>`;
      })
      .join("")}</ul>${
      p.landed
        ? `<h3>credited on main</h3><ul class="commit-list">${p.landed.commits
            .map((sha) => {
              const c = data.commits.find((x) => x.sha === sha);
              return `<li>${ext(c.url, `${sha.slice(0, 7)} · ${e(c.role)}`)}</li>`;
            })
            .join("")}</ul>`
        : ""
    }<h3>review and discussion</h3>${p.feedback.length ? `<ul class="feedback-list">${p.feedback.map((f) => `<li>${ext(f.url, `@${e(f.by)} · ${f.kind}`)}<span>${f.automated ? "disclosed as ai-assisted review" : "public github discussion"}</span></li>`).join("")}</ul>` : "<p>no external comments or reviews were recorded on the original pr at this snapshot.</p>"}<p class="detail-footnote">status checked ${displayDate(data.checkedAt)}. follow the github links for anything newer.</p></div>`;
  if (!dialog.open) dialog.showModal();
  document.querySelector(".close-detail").focus();
}
function closeDetail() {
  document.querySelector("#detail-dialog").close();
}
function wireEvents() {
  document.addEventListener("click", async (event) => {
    const b = event.target.closest("button,a");
    if (!b) return;
    if (b.dataset.feature !== undefined) {
      state.feature = +b.dataset.feature;
      renderFeature();
    }
    if (b.dataset.tab) {
      changeTab(b.dataset.tab);
    }
    if (b.dataset.jump) {
      changeTab(b.dataset.jump, b.dataset.filter || "all");
    }
    if (b.dataset.detail) {
      history.replaceState(null, "", `#pr-${b.dataset.detail}`);
      showDetail(+b.dataset.detail);
    }
    if (b.classList.contains("close-detail")) closeDetail();
    if (b.id === "motion-toggle") setMotion(!motion);
    if (b.id === "next-page") {
      state.page++;
      renderArchive();
    }
    if (b.id === "prev-page") {
      state.page--;
      renderArchive();
    }
    if (b.id === "clear-filters") {
      state.query = "";
      state.status = "all";
      state.page = 1;
      document.querySelector("#search").value = "";
      updateFilter();
      renderArchive();
    }
    if (b.id === "copy-record") {
      try {
        await navigator.clipboard.writeText(
          `${location.origin}${import.meta.env.BASE_URL}#pr-${b.dataset.number}`,
        );
        showToast("record link copied");
      } catch {
        showToast("copy the link from your address bar");
      }
    }
  });
  document.querySelector("#search").addEventListener("input", (event) => {
    state.query = event.target.value;
    state.page = 1;
    renderArchive();
  });
  document
    .querySelector("#status-filter")
    .addEventListener("change", (event) => {
      state.status = event.target.value;
      state.page = 1;
      renderArchive();
    });
  document.querySelectorAll('[role="tablist"]').forEach((list) =>
    list.addEventListener("keydown", (event) => {
      if (
        ![
          "ArrowLeft",
          "ArrowRight",
          "ArrowUp",
          "ArrowDown",
          "Home",
          "End",
        ].includes(event.key)
      )
        return;
      event.preventDefault();
      const tabs = [...list.querySelectorAll('[role="tab"]')];
      let i = tabs.indexOf(document.activeElement);
      if (i < 0) return;
      i =
        event.key === "Home"
          ? 0
          : event.key === "End"
            ? tabs.length - 1
            : (i +
                (["ArrowLeft", "ArrowUp"].includes(event.key) ? -1 : 1) +
                tabs.length) %
              tabs.length;
      tabs[i].click();
      tabs[i].focus();
    }),
  );
  const dialog = document.querySelector("#detail-dialog");
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      const r = dialog.getBoundingClientRect();
      if (
        event.clientX < r.left ||
        event.clientX > r.right ||
        event.clientY < r.top ||
        event.clientY > r.bottom
      )
        closeDetail();
    }
  });
  dialog.addEventListener("close", () => {
    if (/^#pr-/.test(location.hash))
      history.replaceState(null, "", `${location.pathname}#archive`);
    lastFocus?.focus({ preventScroll: true });
  });
  window.addEventListener("hashchange", openHash);
  reduced.addEventListener("change", (event) => {
    if (event.matches) setMotion(false);
  });
  document.querySelectorAll(".map-thread").forEach((g) => {
    const p = descriptionsFor(+g.dataset.mapThread);
    const update = () => {
      document.querySelector("#map-caption").textContent =
        `#${p.number} / ${p.title}`;
    };
    g.addEventListener("pointerenter", update);
    g.addEventListener("focusin", update);
    g.addEventListener(
      "pointerleave",
      () =>
        (document.querySelector("#map-caption").textContent =
          "each point opens a real contribution"),
    );
  });
}
init().catch((error) => {
  console.error(error);
  const status = document.querySelector("#loading-status");
  if (status)
    status.innerHTML =
      'the archive could not load. <a href="https://github.com/NousResearch/hermes-agent/pulls?q=is%3Apr+author%3AMohamadKanso">view the source on github</a> or refresh to try again.';
});
