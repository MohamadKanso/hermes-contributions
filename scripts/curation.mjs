// plain-language descriptions are editorial. status and attribution come from github.
export const descriptions = {
  117166: [
    "keep silence filtering tied to config",
    "gateway",
    "stops a persistent preference from overriding how replies should be filtered",
  ],
  117125: [
    "release a chat after a phone disconnects",
    "sessions",
    "lets a bot chat become available again when its ios connection is gone",
  ],
  116454: [
    "make ctrl+d behave as expected",
    "interface",
    "exits on an empty, idle input without treating a mac shortcut as the same key",
  ],
  116442: [
    "show copilot limits in /usage",
    "providers",
    "brings account quotas and useful auth errors into the existing usage view",
  ],
  116311: [
    "skip an unnecessary permission prompt",
    "tools",
    "avoids asking for tool override access when a plugin has not requested it",
  ],
  116298: [
    "handle a replaced state database safely",
    "sessions",
    "checks and reopens the database under a lock in the remaining entry points",
  ],
  116248: [
    "run tests from a large file list",
    "developer tools",
    "reads test paths from disk so a long command does not hit the operating system limit",
  ],
  116206: [
    "give clipboard probes a valid input",
    "interface",
    "keeps image detection working when the parent process has no usable stdin",
  ],
  116167: [
    "respect a configured local model server",
    "providers",
    "uses an explicitly configured llamacpp entry instead of falling through an alias",
  ],
  116083: [
    "route the same provider the same way",
    "providers",
    "addresses an openai alias that worked in one agent path but failed in another",
  ],
  116068: [
    "choose the right gemini endpoint",
    "providers",
    "uses ai studio by default for aq keys and makes vertex routing explicit",
  ],
  116051: [
    "sort finished tasks by completion time",
    "interface",
    "puts recently completed kanban cards in the right order on the board",
  ],
  116050: [
    "sort finished tasks by completion time",
    "interface",
    "the earlier, broader version of the board sorting change, replaced by #116051",
  ],
  116040: [
    "keep skill trust in linked worktrees",
    "tools",
    "recognises the parent repository when loading trusted project skills",
  ],
  116028: [
    "recover a dead tool connection",
    "tools",
    "tries to reconnect a dead stdio mcp session after its proof deadline",
  ],
  115521: [
    "keep mixed-version updates running",
    "developer tools",
    "handles an older dashboard function signature instead of aborting the update sweep",
  ],
  115511: [
    "rewind the conversation people actually saw",
    "sessions",
    "aligns rewind with the repaired history when consecutive user turns were combined",
  ],
  115498: [
    "close overlapping telemetry scopes safely",
    "observability",
    "investigates a shared-metrics close race during concurrent turns",
  ],
  115095: [
    "recover an expired desktop session",
    "interface",
    "proposes access to gateway settings and token refresh from the failed-start view",
  ],
  114999: [
    "stop repeated copilot token warnings",
    "providers",
    "avoids probing an unselected provider and repeats a warning only when its token changes",
  ],
  114485: [
    "resolve bedrock profile context limits",
    "providers",
    "looks up the underlying model instead of treating its inference-profile arn as a model id",
  ],
  114473: [
    "stop scheduled jobs drifting later",
    "runtime",
    "accounts for time spent doing the work before sleeping until the next tick",
  ],
  114455: [
    "load skills from the right project",
    "tools",
    "uses the session workspace rather than a home-directory placeholder",
  ],
  114441: [
    "let the agent reread after compaction",
    "memory",
    "allows a scoped re-anchoring read without disabling the repeated-tool loop guard",
  ],
  114430: [
    "make missing-credential errors useful",
    "providers",
    "points people to the real environment variable or sign-in step",
  ],
  114218: [
    "carry profile secrets into scheduled scripts",
    "runtime",
    "investigates why a profile-scoped 1password token never reaches a no-agent job",
  ],
  114207: [
    "bound browser reconnect attempts",
    "tools",
    "limits how long the browser supervisor can keep retrying a dead connection",
  ],
  113028: [
    "bound oversized conversation tails",
    "memory",
    "moves completed history into the summary while keeping active work and tool groups safe",
  ],
  112989: [
    "restart the right desktop backend",
    "runtime",
    "separates primary backend recovery from the state of other profile processes",
  ],
  112947: [
    "make image history budgets configurable",
    "vision",
    "lets users tune embedded image size with safe bounds instead of a fixed byte limit",
  ],
  112930: [
    "block session switching during a turn",
    "sessions",
    "stops /resume from moving a running agent into a different conversation",
  ],
  112833: [
    "keep reasoning separate from answers",
    "memory",
    "gates reasoning-only answer promotion by route and adds clearer model/provider diagnostics",
  ],
  112803: [
    "remove duplicate provider matches",
    "providers",
    "avoids treating equivalent provider entries as conflicting choices",
  ],
  112778: [
    "see where computer-use time goes",
    "observability",
    "adds phase-level signals around computer-use setup, execution and cleanup",
  ],
  112730: [
    "keep skill context through compaction",
    "memory",
    "keeps tool operations and failure outcomes visible in compressed skill summaries",
  ],
  111693: [
    "clean up terminal redraw failures",
    "runtime",
    "handles failed redraw writes without leaving a terminal attached to a dead viewer",
  ],
  110992: [
    "reload tools without a gateway restart",
    "tools",
    "adds control-socket mcp reloads with separate handling for served profiles",
  ],
  110966: [
    "keep human replies visible",
    "gateway",
    "distinguishes human turns from background work when a silence marker is returned",
  ],
  110951: [
    "check credentials before switching providers",
    "providers",
    "rejects unusable placeholders and exhausted credential pools on fallback",
  ],
  110933: [
    "preserve custom skills during updates",
    "tools",
    "keeps user-created skill roots when a distribution is refreshed",
  ],
  110859: [
    "recover terminals after socket failures",
    "runtime",
    "detaches the failed viewer so the existing cleanup can reclaim the session",
  ],
  110824: [
    "show full terminal commands on request",
    "gateway",
    "adds an opt-in view for commands that are normally shortened in the gateway",
  ],
  110756: [
    "test custom model ids stay unchanged",
    "developer tools",
    "adds regression coverage for discovered model names with custom prefixes",
  ],
  109874: [
    "expand long replies while they stream",
    "interface",
    "keeps the full response available behind a show/collapse control",
  ],
  109845: [
    "re-anchor file reads after compaction",
    "memory",
    "the original re-anchoring proposal, later simplified into #114441",
  ],
};

// one entry per original contribution, not one per mention or per intermediate pr.
export const integrations = [
  {
    original: 110933,
    via: 111344,
    kind: "authored",
    title: "preserve custom skills",
    note: "my two commits were cherry-picked. the merged change also includes broader directory protection and follow-ups from other contributors.",
  },
  {
    original: 110859,
    via: 111357,
    kind: "authored",
    title: "recover terminal sessions",
    note: "both my attach-replay and live-send fixes were cherry-picked, with follow-up work from the maintainer.",
  },
  {
    original: 110966,
    via: 111624,
    kind: "authored",
    title: "keep human replies visible",
    note: "my commit was cherry-picked. follow-ups unified the turn-display rules.",
  },
  {
    original: 112930,
    via: 113210,
    kind: "authored",
    title: "protect active sessions",
    note: "my /resume guard landed alongside another contributor’s /branch guard. i also received co-author credit on the combined tests.",
  },
  {
    original: 112947,
    via: 113817,
    kind: "authored",
    title: "tune native vision budgets",
    note: "my byte-budget resolver and clamp were ported under my authorship. the merged pr also includes other image-budget fixes.",
  },
  {
    original: 114473,
    via: 114755,
    kind: "authored",
    title: "stop scheduler drift",
    note: "my source change was cherry-picked as-is. the maintainer tightened the tests.",
  },
  {
    original: 112730,
    via: 113106,
    kind: "co-authored",
    title: "keep skill context",
    note: "shared co-author credit for the skill-summary scope. the merged implementation builds on another contributor’s patch.",
  },
  {
    original: 112989,
    via: 113180,
    kind: "co-authored",
    title: "recover the desktop backend",
    note: "my finding about pool-independent recovery inputs was adopted in the follow-up commit, with co-author credit.",
  },
  {
    original: 112833,
    via: 113188,
    kind: "co-authored",
    title: "identify reasoning-only failures",
    note: "my model/provider log-line idea was carried into the merged change. the broader promotion-policy proposal remains open and is not counted as merged.",
  },
  {
    original: 114218,
    via: 114851,
    kind: "co-authored",
    title: "route profile secrets",
    note: "co-author credit on the broader declared-secret fix. my original 1password-specific implementation was replaced, not merged as-is.",
  },
  {
    original: 114430,
    via: 114852,
    kind: "co-authored",
    title: "show useful auth hints",
    note: "shared co-author credit. the merged solution combines earlier work across the startup and auxiliary-client paths.",
  },
  {
    original: 114455,
    via: 114888,
    kind: "co-authored",
    title: "bind skills to the right project",
    note: "shared design credit for session cwd binding and the project-aware registry cache.",
  },
  {
    original: 116083,
    via: 116346,
    kind: "co-authored",
    title: "make provider routing consistent",
    note: "the maintainer confirmed the diagnosis and shipped a smaller redo with a shared alias helper, crediting me as co-author.",
  },
  {
    original: 115498,
    via: 116685,
    kind: "co-authored",
    title: "handle concurrent telemetry",
    note: "co-author credit for the investigation. the maintainer replaced my scope-draining approach because it could affect a live sibling turn.",
  },
];
export const pending = {
  114999: 117008,
  115511: 116975,
  116454: 116851,
  116206: 116824,
  116298: 116748,
  116051: 116777,
  116167: 116679,
};
export const alternatives = {
  115095: 117085,
  116311: 116927,
  116248: 116822,
  114485: 114841,
  114207: 114897,
  112803: 113103,
  110951: 111451,
};

export const features = [
  {
    id: 110933,
    headline: "an update should not erase your work.",
    before:
      "a distribution update could remove custom skills that people had added to their agent.",
    after:
      "preserve unshipped skill roots and refresh the ones the distribution owns. review caught stale files and unsafe symlinks; the follow-up addressed them.",
    why: "agent reliability starts with protecting what the user has built.",
    file: "hermes_cli/profile_distribution.py",
    sha: "a4f0a5e0357b87cef3ba0bcbf32d158a03d58b89",
  },
  {
    id: 112930,
    headline: "a running task belongs to one session.",
    before:
      "switching conversations with /resume could change the session underneath an active agent turn.",
    after:
      "refuse the switch while the agent is busy. the merged change combines this with the /branch guard and tests the session identity staying put.",
    why: "a small guard protects a much larger state boundary.",
    file: "hermes_cli/cli_commands_mixin.py",
    sha: "a3cd00cae50505268db1f7614a8cb506ef8dcc02",
  },
  {
    id: 112947,
    headline: "image quality needs a sensible budget.",
    before:
      "native vision embeds used a hardcoded 256 kb byte budget and were sent again in later conversation turns.",
    after:
      "make the embed budget configurable with safe bounds, and use the setting for native image and browser screenshot paths.",
    why: "useful for tuning agent workflows where image detail and repeated payload size both matter. no speedup is claimed here.",
    file: "tools/vision_tools_history_budget.py",
    sha: "f37336522be2e5e7ac051100390b529ed35a43e6",
  },
  {
    id: 116083,
    headline: "one provider name should mean one route.",
    before:
      "the openai alias worked for some auxiliary tasks but failed in the runtime resolver used by others.",
    after:
      "the merged redo shares one alias helper across both paths. my diagnosis and shared-helper direction received co-author credit.",
    why: "consistent routing matters when an agent delegates work to different models.",
    file: "hermes_cli/runtime_provider_custom.py",
    sha: "956a8c843ddc63e4631a06b33a8635b8710777b7",
  },
  {
    id: 112730,
    headline: "shorter context should still tell the truth.",
    before:
      "a compressed skill-tool result could lose the operation or make a failed call look successful.",
    after:
      "the merged change retains operation names and failure outcomes in short summaries. my contribution received shared co-author credit.",
    why: "compaction is useful only if the agent can still understand what happened.",
    file: "agent/context_compressor.py",
    sha: "5670f846cf168497d951019c49abd345d6bff561",
  },
  {
    id: 110859,
    headline: "a dropped viewer should not pin a terminal.",
    before:
      "a failed socket send could leave a terminal marked as attached and prevent normal cleanup.",
    after:
      "capture the viewer before sending and detach it on failure. the existing identity guard keeps a replacement viewer safe.",
    why: "handles both buffered replay and live output, including a viewer changing mid-send.",
    file: "hermes_cli/pty_session.py",
    sha: "6d622d8eba5d48bbd5695b8c676952f6977ba7ad",
  },
];

export const quotes = [
  {
    pr: 114473,
    comment: 5734308317,
    by: "teknium1",
    quote:
      "Your change was salvaged into #114755 with your authorship preserved (cherry-picked)",
    context: "on the scheduler drift fix",
    label: "authorship preserved",
  },
  {
    pr: 116083,
    comment: 5745471383,
    by: "teknium1",
    quote: "Your diagnosis of the aux `openai` alias divergence was right",
    context: "on consistent provider routing",
    label: "diagnosis confirmed",
  },
  {
    pr: 111357,
    by: "teknium1",
    quote: "both commits cherry-picked: attach rollback + drain-side detach",
    context: "on terminal session recovery",
    label: "both commits carried forward",
  },
  {
    pr: 110966,
    comment: 5676323534,
    by: "kshitijk4poor",
    quote:
      "Salvaged as #111624 with your commit cherry-picked (authorship preserved, @MohamadKanso)",
    context: "on keeping human replies visible",
    label: "merged with credit",
  },
];
