// plain-language descriptions are editorial. status and attribution come from github.
export const descriptions = {
  137982: [
    "keep ambiguous relay deliveries ambiguous",
    "gateway",
    "preserves the ambiguous result when the relay reader exits before an acknowledgement",
  ],
  137868: [
    "keep office media paths with spaces",
    "interface",
    "stops an unquoted office media path with spaces being cut at the first space",
  ],
  135528: [
    "accept path answers to clarify prompts",
    "gateway",
    "lets a pending clarify accept an answer that starts with a path",
  ],
  135467: [
    "close the scoped review pane",
    "interface",
    "lets the review pane's close action hide a pane a changed-files card revealed",
  ],
  135334: [
    "keep shipped docker extras",
    "runtime",
    "records the extras in the docker image so the first package generation keeps them",
  ],
  135224: [
    "drop stale dates from version labels",
    "developer tools",
    "removes an outdated release-date suffix from cli version labels",
  ],
  135141: [
    "keep subprocess output above fd_setsize",
    "runtime",
    "keeps reading pipes whose descriptor is above the select limit",
  ],
  135070: [
    "strip terminal escapes before clipping",
    "tools",
    "stops cut escape sequences leaking into process output previews",
  ],
  135045: [
    "register the plugin scan default",
    "tools",
    "makes the effective plugins.scan_on_install value visible before it is saved",
  ],
  134924: [
    "keep failed backups out of retention",
    "tools",
    "stops a failed minecraft backup from counting as good and deleting an older one",
  ],
  134907: [
    "prune each profile's scratch space",
    "runtime",
    "lets every profile prune its own scratch directory once per process",
  ],
  134756: [
    "hide tool and subagent sessions from projects",
    "interface",
    "keeps automation sessions out of the desktop project tree and its counts",
  ],
  133998: [
    "stage native deps outside the build tree",
    "developer tools",
    "fixes explicit-architecture desktop builds failing before packaging",
  ],
  133218: [
    "avoid resending partial signal group messages",
    "gateway",
    "stops a partly delivered group reply from reaching the same members twice",
  ],
  132427: [
    "keep refreshed model prices",
    "interface",
    "stops an older cached catalog read from undoing an explicit refresh",
  ],
  132420: [
    "run posix-dependent tests on native lanes",
    "developer tools",
    "adds platform markers so os-dependent tests run where their behaviour is owned",
  ],
  132418: [
    "avoid re-exec loops during deferred updates",
    "runtime",
    "stops the launcher restarting the same interpreter while source completion is backing off",
  ],
  132413: [
    "escape backtick shortcuts in the desktop guide",
    "developer tools",
    "stops unescaped backtick keys pairing into inline code in the docs",
  ],
  131702: [
    "route artifact reads to the owning connection",
    "interface",
    "reads an artifact from the connection that produced it",
  ],
  131651: [
    "deliver a late steer instead of dropping it",
    "gateway",
    "runs a mid-turn steer first when a queued message or background event also arrives",
  ],
  131647: [
    "protect live sessions during app swaps",
    "interface",
    "leaves a running desktop bundle alone on posix updates and asks for a rerun",
  ],
  131646: [
    "close numeric ip ssrf bypasses",
    "security",
    "blocks decimal, octal and hex ip literals in a2a callback urls",
  ],
  131643: [
    "jump to the latest reply from the timeline",
    "interface",
    "scrolls to the bottom and re-latches stick-to-bottom from the newest timeline tick",
  ],
  131641: [
    "test the xai oauth write-through",
    "developer tools",
    "adds assertions for how xai oauth credentials are written back",
  ],
  131638: [
    "validate s6 environment keys",
    "security",
    "rejects unsafe environment variable names when rendering s6 service scripts",
  ],
  131636: [
    "redact bluebubbles passwords from errors",
    "security",
    "keeps query-string credentials out of rest error messages and logs",
  ],
  131633: [
    "verify relay media origins",
    "security",
    "replaces a substring check with origin and scheme checks before fetching relay media",
  ],
  131628: [
    "prevent path traversal in pending approvals",
    "security",
    "constrains pending-approval record paths to their own directory",
  ],
  131622: [
    "fix signal formatting around code blocks",
    "gateway",
    "keeps monospace ranges aligned when headings come before code blocks",
  ],
  131618: [
    "block backslash open redirects",
    "security",
    "rejects backslash paths that browsers treat as a different origin after dashboard sign-in",
  ],
  131613: [
    "render command templates in one pass",
    "tools",
    "replaces two-pass placeholder substitution in tts command templates with a single regex pass",
  ],
  131607: [
    "sort pinned conversations by name",
    "interface",
    "orders pinned desktop conversations alphabetically",
  ],
  131597: [
    "keep subagent completions out of the chat",
    "gateway",
    "stops background work from a subagent re-pinning the parent chat's route",
  ],
  130376: [
    "load bound skills on the first turn",
    "gateway",
    "stops a non-generating command from causing a channel's bound skills to be skipped",
  ],
  121722: [
    "check slash access against the right profile",
    "gateway",
    "reads slash-command permissions from the serving profile and fails closed when it is missing",
  ],
  121672: [
    "guard the restart watcher against pid reuse",
    "runtime",
    "prevents a detached watcher from starting a second gateway when a pid never exits",
  ],
  121308: [
    "avoid duplicate clarify rows",
    "interface",
    "stops an answered clarify prompt from being written to the transcript twice",
  ],
  121243: [
    "match dashboard processes exactly",
    "developer tools",
    "uses the exact entrypoint matcher so unrelated processes are not treated as hermes",
  ],
  119479: [
    "accept plugin tool servers at startup",
    "tools",
    "stops valid portable plugin mcp names from triggering a false unknown-toolsets warning",
  ],
  119085: [
    "aggregate sessions across gateways",
    "interface",
    "makes the desktop sessions list span every registered gateway and profile",
  ],
  119037: [
    "keep steering through a session rotation",
    "interface",
    "stops mid-turn steering from going nowhere while a stored session id rotates",
  ],
  119022: [
    "keep windows ssh homes on the remote",
    "interface",
    "takes the hermes home from the remote machine instead of the forwarded ssh environment",
  ],
  118990: [
    "load the local skin before connecting",
    "interface",
    "applies the saved desktop theme before waiting on the gateway connection",
  ],
  118530: [
    "keep the transcript pinned while it grows",
    "interface",
    "holds the view at the bottom during streaming when the reader was already there",
  ],
  118489: [
    "reuse the private host token on update",
    "interface",
    "lets a relaunched desktop window recover its token from the same-user rendezvous record",
  ],
  118442: [
    "keep message times beside their actions",
    "interface",
    "shows user and assistant timestamps next to the existing message controls",
  ],
  118406: [
    "reject refusals posing as summaries",
    "memory",
    "stops a summary model's refusal from replacing real conversation history during compression",
  ],
  118374: [
    "make relay connector failures clear",
    "gateway",
    "turns malformed or non-utf8 connector responses into one consistent error",
  ],
  117504: [
    "honour the provider's rate-limit reset",
    "providers",
    "uses the provider's own reset time instead of guessing an exponential cooldown",
  ],
  117177: [
    "clean up checkpoints on windows",
    "developer tools",
    "clears read-only git objects so checkpoint cleanup does not fail with access denied",
  ],
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
  {
    original: 112833,
    via: 133729,
    also: [113188],
    kind: "authored",
    title: "keep private reasoning private",
    note: "rebuilt on current main under my authorship. the merged pr names the route gate, the nemotron default trust and dropping the reasoning preview as my design; the integrator added 15 follow-up commits. my earlier log-line idea was co-credited in #113188.",
  },
  {
    original: 116298,
    via: 116748,
    kind: "authored",
    title: "survive a replaced state database",
    note: "my commit was cherry-picked with authorship. the maintainer trimmed the tests in a follow-up commit.",
  },
  {
    original: 116206,
    via: 116824,
    kind: "authored",
    title: "fix wayland image paste",
    note: "my commit was cherry-picked with authorship. the merged pr adds the root-cause write-up and regression coverage.",
  },
  {
    original: 114999,
    via: 117008,
    kind: "authored",
    title: "stop repeated copilot warnings",
    note: "my dedup helper and auxiliary-client hunks were kept verbatim. the broader no-exchange-for-unselected-provider fix is the maintainer’s follow-up commit.",
  },
  {
    original: 117166,
    via: 117593,
    kind: "authored",
    title: "make silence filtering config-only",
    note: "salvaged into a wider per-profile settings fix that also carries two other contributors’ work.",
  },
  {
    original: 119085,
    via: 119085,
    kind: "authored",
    direct: true,
    title: "aggregate sessions across gateways",
    note: "merged directly under its own pr number. both commits on main are mine.",
  },
  {
    original: 118990,
    via: 121607,
    kind: "authored",
    title: "load the local skin first",
    note: "my commit was cherry-picked with authorship kept. a different pr’s post-mount fetch was not taken.",
  },
  {
    original: 121722,
    via: 126145,
    kind: "authored",
    title: "gate slash commands per profile",
    note: "my commit landed. the maintainer reduced the helper to a smaller function and resolves the bot-owning profile’s config instead of the routed one.",
  },
  {
    original: 119037,
    via: 128455,
    kind: "authored",
    title: "keep steering through rotation",
    note: "all three commits were cherry-picked with authorship kept, grafted around newer rotation handling on main.",
  },
  {
    original: 131651,
    via: 131888,
    kind: "authored",
    title: "deliver late steering",
    note: "my commit was cherry-picked unchanged. the integrator added a channel-input correction and combined it with another contributor’s busy follow-up fix.",
  },
  {
    original: 116051,
    via: 116777,
    kind: "co-authored",
    title: "sort finished tasks",
    note: "another contributor’s earlier patch was the one cherry-picked. mine was superseded, and its comment wording was reused with co-author credit on the docs commit.",
  },
  {
    original: 116454,
    via: 116851,
    kind: "co-authored",
    title: "make ctrl+d exit on mac",
    note: "a slimmer redo in the same direction, 35 lines instead of 406, with co-author credit. my delete-under-cursor addition was dropped.",
  },
  {
    original: 115511,
    via: 116975,
    kind: "co-authored",
    title: "make /undo and /retry work again",
    note: "a slimmer redo in the same direction with co-author credit. my content marker and matching relaxation were dropped.",
  },
  {
    original: 118406,
    via: 118920,
    kind: "co-authored",
    title: "reject refusal summaries",
    note: "my provider refusal-field handling and wider opener set landed as one co-authored commit, on top of a parallel contributor’s detector.",
  },
];
export const pending = {};
export const alternatives = {
  116167: 116679,
  117504: 117604,
  121243: 126179,
  119022: 126179,
  131597: 136225,
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
    id: 112833,
    headline: "private reasoning is not the answer.",
    before:
      "on openrouter, deepseek, bedrock and other routes, a reasoning model that stopped with empty content could have its private chain-of-thought shown as the reply.",
    after:
      "promote reasoning to the answer only on routes trusted to put answers there, such as the local nemotron parser it was built for. every other route takes the normal recovery path, and the reasoning preview is no longer echoed.",
    why: "what a model thinks and what it tells the user are different things. the agent should never confuse them.",
    file: "agent/turn_final_response.py",
    sha: "71c1669404e773fc9e6b844e1821212c966afc67",
  },
  {
    id: 121722,
    headline: "every profile keeps its own access rules.",
    before:
      "in a multi-profile gateway, slash-command permissions were read from the launch profile. a platform configured only in another profile came back unrestricted, skipping its admin gate.",
    after:
      "resolve the policy from the profile that serves the message and fail closed when its config is missing. the merged change keeps the per-profile rule with a smaller helper.",
    why: "an access check is only as good as the config it reads.",
    file: "gateway/slash_commands.py",
    sha: "d067d2fdc39ab1ad7d3f7865733e24dd2965692b",
  },
  {
    id: 118406,
    headline: "a refusal is not a summary.",
    before:
      "when the summary model refused, compression accepted the refusal as the summary and dropped the middle of the conversation behind it.",
    after:
      "treat an explicit provider refusal field and a wider set of refusal openers as failures. this landed as one co-authored commit on top of a parallel contributor’s detector.",
    why: "losing context silently is worse than not compressing at all.",
    file: "agent/context_compressor.py",
    sha: "460fef87cac7a643f4fe9d1f6c4aa23b7363750a",
  },
  {
    id: 131651,
    headline: "a late steer should still arrive.",
    before:
      "a /steer sent near the end of a turn was silently discarded if a queued message or background event arrived at the same time.",
    after:
      "deliver the steer first and put the pending event back at the head of the queue. my commit was cherry-picked unchanged into the merged fix.",
    why: "when someone redirects the agent, that instruction must not disappear.",
    file: "gateway/run_turn.py",
    sha: "c6406d57bf0d050eaff8ae264034b5388fe73dd8",
  },
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
    id: 119085,
    headline: "every gateway, one sessions list.",
    before:
      "with several registered connections, the desktop sessions sidebar only ever showed the selected gateway, so grouping by gateway and profile never spanned more than one.",
    after:
      "send all-profiles session reads through the existing aggregate path, keep each session attached to its ssh or local owner, and page large reads so nothing is cut off.",
    why: "an overview is only useful if it shows everything you are connected to. merged directly as #119085.",
    file: "apps/desktop/electron/profile-session-routing.ts",
    sha: "e21291663f72a45c95cb80078912dfa0f1e57166",
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
    pr: 115498,
    comment: 5748392403,
    by: "teknium1",
    quote: "this landed on main via #116685 (148d1f6da54e)",
    context: "on the concurrent telemetry investigation",
    label: "landed on main",
  },
  {
    pr: 133729,
    by: "kshitijk4poor",
    quote:
      "The route gate, the Nemotron default trust and dropping the reasoning preview are his design.",
    context: "on keeping private reasoning private",
    label: "design credited",
  },
  {
    pr: 117008,
    by: "teknium1",
    quote: "dedup helper + aux-chain hunks kept verbatim",
    context: "on the copilot warning fix",
    label: "kept verbatim",
  },
  {
    pr: 128455,
    by: "OutThisLife",
    quote: "all 3 commits cherry-picked, authorship kept",
    context: "on steering through session rotation",
    label: "authorship kept",
  },
];

// direct excerpts from integration prs authored by @teknium1. each row is
// tied to an integration path where his pr body names the work.
export const cofounderTrail = [
  {
    original: 110933,
    via: 111344,
    quote: "Salvages #110933 by @MohamadKanso",
    label: "skills preservation",
    note: "the source says the commits were cherry-picked with authorship intact",
  },
  {
    original: 110859,
    via: 111357,
    quote:
      "Salvages #110859 by @MohamadKanso (both commits cherry-picked: attach rollback + drain-side detach).",
    label: "terminal recovery",
    note: "both authored fixes were carried into the merged dashboard change",
  },
  {
    original: 112930,
    via: 113210,
    quote: "#112930 (@MohamadKanso — `/resume` guard)",
    label: "session safety",
    note: "the merged change combines the resume guard with the session-switch invariant suite",
  },
  {
    original: 112947,
    via: 113817,
    quote:
      "Salvages #112947 (@MohamadKanso — embed-budget resolver + clamp, ported out of the facade under their authorship).",
    label: "vision budgets",
    note: "the source names the resolver and clamp as the part carried under the author’s name",
  },
  {
    original: 114473,
    via: 114755,
    quote:
      "Salvages #114473 (@MohamadKanso) — source hunk cherry-picked as-is (author preserved).",
    label: "scheduler drift",
    note: "the original source hunk was carried into the fixed-period ticker change",
  },
  {
    original: 112730,
    via: 113106,
    quote: "#112730 (@MohamadKanso, same skill-tool scope).",
    label: "skill context",
    note: "the source gives co-authored credit for the same skill-tool scope",
  },
  {
    original: 112989,
    via: 113180,
    quote: "Co-authored: #112989 (@MohamadKanso)",
    label: "desktop recovery",
    note: "the pool-independent recovery inputs were adopted in the follow-up commit",
  },
  {
    original: 112833,
    via: 113188,
    quote:
      "the model/provider log-line idea is carried here, credited via `Co-authored-by`",
    label: "reasoning diagnostics",
    note: "the source credits the diagnostic idea while separating it from the wider proposal",
  },
  {
    original: 114218,
    via: 114851,
    quote: "Supersedes #114218 (@MohamadKanso) — credited as Co-authored-by.",
    label: "profile secrets",
    note: "the broader declared-secret fix replaced the vendor-specific implementation",
  },
  {
    original: 114430,
    via: 114852,
    quote: "#114430 (@MohamadKanso)",
    label: "credential hints",
    note: "the merged auth fix lists this proposal among the related fixes it superseded",
  },
  {
    original: 114455,
    via: 114888,
    quote:
      "Co-authored (design of the RPC cwd binding + registry tag): #114455 (@MohamadKanso), #90234 (@sum117).",
    label: "project-local skills",
    note: "the source records shared design credit for the cwd binding and registry cache",
  },
  {
    original: 116083,
    via: 116346,
    quote: "credited as co-author on the first commit",
    label: "provider routing",
    note: "the maintainer describes the merged change as a slim redo in the same direction",
  },
  {
    original: 115498,
    via: 116685,
    quote: "credited via `Co-authored-by` on the #115471 commit",
    label: "concurrent telemetry",
    note: "the investigation was carried into a safer relay-scope fix",
  },
  {
    original: 116298,
    via: 116748,
    quote: "Salvages #116298 (@MohamadKanso) — cherry-picked with authorship",
    label: "state database",
    note: "the close-race fix was cherry-picked; the tests were trimmed in a follow-up",
  },
  {
    original: 116051,
    via: 116777,
    quote: "its comment wording reused with co-author credit",
    label: "kanban sort",
    note: "the source is explicit that this was superseded and only the wording was reused",
  },
  {
    original: 116206,
    via: 116824,
    quote: "Salvages #116206 (@MohamadKanso) — cherry-picked with authorship.",
    label: "wayland paste",
    note: "the stdin fix for clipboard probes was carried as-is",
  },
  {
    original: 116454,
    via: 116851,
    quote: "Slimmer redo of #116454 (@MohamadKanso, `Co-authored-by`)",
    label: "ctrl+d exit",
    note: "a smaller implementation in the same direction",
  },
  {
    original: 115511,
    via: 116975,
    quote: "Slimmer redo of #115511 by @MohamadKanso",
    label: "undo and retry",
    note: "same direction, with co-author credit on the commit",
  },
  {
    original: 114999,
    via: 117008,
    quote:
      "Salvages #114999 (@MohamadKanso, cherry-picked): dedup helper + aux-chain hunks kept verbatim",
    label: "copilot warnings",
    note: "the dedup helper and auxiliary-client hunks were kept verbatim",
  },
  {
    original: 117166,
    via: 117593,
    quote: "salvaged from #117166 (@MohamadKanso)",
    label: "silence filtering",
    note: "the config-only silence filter was carried into the per-profile settings fix",
  },
  {
    original: 121722,
    via: 126145,
    quote: "Salvages #121722 by @MohamadKanso",
    label: "slash access",
    note: "the helper was slimmed and resolves the bot-owning profile’s config",
  },
];
