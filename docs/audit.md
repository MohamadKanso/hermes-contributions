# contribution audit

snapshot: 20 september 2026. repository: `NousResearch/hermes-agent`.

## scope

searched both `MohamadKanso` and the earlier `MoKanso` account name. paginated authored-pr, authored-issue, explicit-mention and text searches. collected pr descriptions, comments, formal reviews, inline reviews, timelines, commits and file diffs. followed related issue references, including references without a closing keyword.

the audit covers 76 authored or mention-related prs, 47 related issues and 83 unique commit objects. the 45 authored prs contain 66 distinct commit objects: 64 authored by mohamad and two upstream commits. rebases and cherry-picks can create different objects for the same underlying change, so these are not counted as 83 independent fixes.

eight primary-authored commits were confirmed through github's default-branch commit listing. nine further commits were confirmed by `co-authored-by` trailers in the local upstream history. the local history was verified as an ancestor of current main, `b7d7d2929a10e0658a98a7a03f4531093e1480ed`, and the later comparison was checked too. each landed commit was linked back to its merged integration pr.

## the 14 landed contribution paths

| my original pr | merged integration | what the credit covers |
| --- | --- | --- |
| [#110933](https://github.com/NousResearch/hermes-agent/pull/110933) | [#111344](https://github.com/NousResearch/hermes-agent/pull/111344) | two authored skill-preservation commits, combined with others' follow-ups |
| [#110859](https://github.com/NousResearch/hermes-agent/pull/110859) | [#111357](https://github.com/NousResearch/hermes-agent/pull/111357) | two authored terminal socket-failure commits |
| [#110966](https://github.com/NousResearch/hermes-agent/pull/110966) | [#111624](https://github.com/NousResearch/hermes-agent/pull/111624) | authored human-turn silence-marker fix |
| [#112930](https://github.com/NousResearch/hermes-agent/pull/112930) | [#113210](https://github.com/NousResearch/hermes-agent/pull/113210) | authored resume guard and co-author credit on combined tests |
| [#112947](https://github.com/NousResearch/hermes-agent/pull/112947) | [#113817](https://github.com/NousResearch/hermes-agent/pull/113817) | authored native-image embed budget resolver and clamp |
| [#114473](https://github.com/NousResearch/hermes-agent/pull/114473) | [#114755](https://github.com/NousResearch/hermes-agent/pull/114755) | authored scheduler deadline change |
| [#112730](https://github.com/NousResearch/hermes-agent/pull/112730) | [#113106](https://github.com/NousResearch/hermes-agent/pull/113106) | shared co-author credit for skill-tool summary scope |
| [#112989](https://github.com/NousResearch/hermes-agent/pull/112989) | [#113180](https://github.com/NousResearch/hermes-agent/pull/113180) | pool-independent recovery inputs adopted with co-author credit |
| [#112833](https://github.com/NousResearch/hermes-agent/pull/112833) | [#113188](https://github.com/NousResearch/hermes-agent/pull/113188) | diagnostic model/provider log-line idea only, not the entire open route policy |
| [#114218](https://github.com/NousResearch/hermes-agent/pull/114218) | [#114851](https://github.com/NousResearch/hermes-agent/pull/114851) | co-author credit on a broader replacement for the original vendor-specific fix |
| [#114430](https://github.com/NousResearch/hermes-agent/pull/114430) | [#114852](https://github.com/NousResearch/hermes-agent/pull/114852) | shared co-author credit on credential hints |
| [#114455](https://github.com/NousResearch/hermes-agent/pull/114455) | [#114888](https://github.com/NousResearch/hermes-agent/pull/114888) | shared design credit for session cwd binding and registry tagging |
| [#116083](https://github.com/NousResearch/hermes-agent/pull/116083) | [#116346](https://github.com/NousResearch/hermes-agent/pull/116346) | diagnosis and shared alias direction, implemented as a smaller redo |
| [#115498](https://github.com/NousResearch/hermes-agent/pull/115498) | [#116685](https://github.com/NousResearch/hermes-agent/pull/116685) | co-author credit for the investigation; original draining approach was replaced |

## important distinctions

- the accepted work is represented by six integrations with primary-authored code and eight more with co-author credit. the original proposal and final integration are linked in each row.
- closed is not the same as rejected, and mentioned is not the same as merged.
- 39 mention records are distinct public descriptions or comments explicitly tagging the account, excluding the author's own writing. 34 are by teknium, five by kshitijk4poor. some say a different implementation was selected. this is not an endorsement count.
- reviews disclosed as automated or ai-assisted are labelled that way in each record. test claims from old comments are not presented as newly rerun verification.
- a related issue's closed state does not establish that my patch closed it. the issue archive does not claim issue authorship.
- all summaries describe software engineering contributions, not model training or ownership of the larger system.

## limitations

public reachable history only. deleted comments, force-pushed-away commits not reachable through the recorded histories, private discussion, and unattributed reuse cannot be exhaustively recovered. public metadata was collected over the audit session rather than as one atomic database snapshot. statuses may change after the displayed date.

the github contributors page was checked in its last-month view. a top-50 ranking for this account was not verified, so it is deliberately absent from the page. github documents its contributor graph as a top-100 view with its own counting rules: [github documentation](https://docs.github.com/en/repositories/viewing-activity-and-data-for-your-repository/viewing-a-projects-contributors).

teknium's nous research co-founder role is documented in the [first-party interview transcript](https://www.delphiintelligence.io/research/ama-1-transcript-with-nous-research-co-founder-and-post-training-lead-teknium1). the portfolio quotes specific github statements about the work, not a separate recommendation or testimonial.

## design research

the current hermes landing page uses condensed display type, ultramarine, fine texture and engraved imagery. the nous site uses a quieter monochrome editorial layout. the public hermes `website/` tree is the documentation site, not proof that every asset on the current landing page has an open license. no proprietary font, sculpture, logo or site source was copied.

to avoid generic generated design, the site uses actual contribution relationships for its main visual, a typographic hierarchy rather than a card grid, and verifiable excerpts rather than marketing claims. relevant design critique: [smoothui](https://smoothui.dev/blog/ai-design-slop), [joshua snoddy](https://www.joshuasnoddy.com/blog/why-ai-websites-look-the-same/).
