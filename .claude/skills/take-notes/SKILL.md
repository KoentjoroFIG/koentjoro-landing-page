---
name: take-notes
description: Use when the user asks to capture a session into the notes vault — /take-notes, "update notes", "log this session", "save key takeaways" — after work that produced decisions, discoveries, or direction changes. If nothing valuable or important, no need to take a note.
model: sonnet
effort: medium
---

# Take Notes — distill a session into the vault

## Overview

The vault exists to make development **consistent** (decisions bind future code), **effective**
(nothing gets re-derived, re-debugged, or re-litigated), and **up to date** (a cold session resumes
from `Home.md` in one read). Record only session knowledge that serves one of those three goals,
each fact in exactly one place. The vault is a pointer network, not a transcript.

## Step 1 — Gather before writing

Read `Home.md` (Current status block) and list `notes/**`. For each candidate fact, grep the vault
for its topic. An existing note on the topic → you will UPDATE it, never create a sibling.

## Step 2 — Qualify each fact (all three must be yes)

1. Would the next session write different code, or resume faster, knowing this?
2. Is it recorded nowhere else? `SPEC.md`, `README.md`, `CLAUDE.md`, and git history are sources of
   truth — link to them, don't restate them.
3. Will it still matter next week?

Auto-drop: renames, dependency bumps, typo fixes, CI flakes, lint runs — git history already records
them. A convention that must bind future code ("use X in new code") goes to **CLAUDE.md** (loaded
every session), not the vault. A durable "how to work with me" fact goes to **Claude's native
memory**, not the vault.

## Step 3 — Route what qualifies

| Fact type | Destination | What the next session uses it for |
| --- | --- | --- |
| Decision made or changed | `notes/decisions/YYYY-MM-DD short-title.md` — existing note on topic → edit it (add `updated:`, adjust `status:`); else new from `templates/Decision.md` | Constraint to honor; don't re-litigate |
| Session narrative | `notes/daily/YYYY-MM-DD.md` — one per date, from `templates/Session Log.md`; append `## Session N` if the date file exists | Cold-start context + follow-ups |
| Status change (what's done, next-step pointer, new blocker) | `Home.md` Current status block — replace values in place | Where to resume, in one read |

## Step 4 — Refresh stale content (every pass, not just when adding)

Adding notes without refreshing old ones makes the vault lie. On every run:

- Flip `status:` on decisions confirmed or overturned this session (`proposed` → `accepted`;
  overturned → `superseded` + link the replacement; never delete).
- Remove resolved blockers from `Home.md`; move the next-step pointer.

## Output contracts

- **Important first:** if the session produced nothing important and valuable, say so and don't
  write a note.
- **Telegraphic, example-first:** facts, links, and one-line examples — never explanatory
  paragraphs. If a sentence explains _why_ at length, replace it with the one concrete case that
  shows it.
- **Decision note:** template sections, ≤ 25 lines, one decision per note.
- **Amendment to an existing note:** ≤ 3 lines — what changed, one-line why, test/commit link.

  > **Amended (2026-07-20):** switched token storage to httpOnly cookie. Caught in review.
- **Daily note:** Task / Result / Follow-ups. Task ≤ 2 lines; Result ≤ 3 lines; follow-ups one line
  each. A decision gets ONE line: `[[link]] — gist in ≤ 8 words`.
- **Home.md status block** holds only: where-we-are + next step, load-bearing decision links,
  waiting-on/blockers. Update values in place — never append hedges ("as of…"), history, or
  conventions.
- Whole run touches ≤ 5 files. Every fact lives in exactly one note; everywhere else, `[[link]]`.

## Common mistakes

| Mistake | Fix |
| --- | --- |
| Restating a decision's content in the daily note | One line: link + gist |
| Home.md as a conventions/risk registry | Conventions → CLAUDE.md; blockers only while active, then remove |
| "(as of…)" hedge annotations on stale values | Update the value or leave it untouched |
| New note that duplicates an existing topic | Edit the existing note |
| Recording what git history already knows | Drop it |
| Only adding, never refreshing | Step 4 runs every pass |
