export const escapeHtml = (value) =>
  String(value ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
export function filterRecords(data, tab, query = "", status = "all") {
  const q = query.trim().toLowerCase().replace(/^#/, "");
  const items = data[tab] || [];
  return items.filter((item) => {
    const text = [
      item.number,
      item.sha,
      item.title,
      item.githubTitle,
      item.summary,
      item.area,
      item.by,
      item.author,
      item.role,
      ...(item.labels || []),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    if (q && !text.includes(q)) return false;
    if (status === "all") return true;
    if (tab === "prs")
      return status === "open"
        ? item.state === "open"
        : status === "closed"
          ? item.state === "closed" && item.status !== "landed"
          : item.status === status;
    if (tab === "commits")
      return status === "landed" ? item.onMain : !item.onMain;
    if (tab === "issues") return item.state === status;
    return status === "teknium1" ? item.by === status : true;
  });
}
export const displayDate = (iso) =>
  new Date(iso)
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    })
    .toLowerCase();
export function diffHtml(text) {
  return text
    .split("\n")
    .map(
      (line) =>
        `<span class="diff-line ${line.startsWith("+") ? "add" : line.startsWith("-") ? "remove" : line.startsWith("@@") ? "hunk" : ""}">${escapeHtml(line) || " "}</span>`,
    )
    .join("");
}
