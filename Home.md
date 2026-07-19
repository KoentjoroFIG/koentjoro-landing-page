---
tags: [home]
---

# Koentjoro Landing Page — Project Brain

Entry point for the notes vault. This vault root **is** the project repo, so every code file,
[[SPEC]], [[README]], and [[CLAUDE]] is natively linkable and searchable from here.

## Core references
- [[SPEC]] — full spec, boundaries, and open questions
- [[README]] — project overview and setup
- [[CLAUDE]] — engineering principles and repo conventions for Claude Code
- `tasks/` — planning / todo

## Current status (2026-07-20)
- **Sprint 1** (KOEN board, 2026-07-21 → 2026-08-04) is planned and assigned: KOEN-8, KOEN-9,
  KOEN-10, KOEN-11 (CHECKPOINT 0) — 7 SP of 14 SP assumed capacity (no velocity history yet,
  low-confidence forecast).
- **Goal:** Foundation locked — SPEC approved, secrets clean, CI gating every PR — unblocking
  both Phase 1 (backend auth) and Phase 4 (frontend design system).
- **Next step:** owner works P0-T1→T3, then CHECKPOINT 0 review. Nothing else in the backlog is
  startable until CP0 passes — it gates Phase 1 *and* Phase 4 alike.
- **Open proposal (owner to confirm):** pull Phase 4 (frontend design system, KOEN-29+) ahead
  of/alongside Phase 1 (backend auth) starting Sprint 2, per owner's UI-design priority — not
  yet reflected in `tasks/plan.md`/`todo.md`.
- **Active blockers:** none.

## Working notes
- `notes/daily/` — one note per coding session/day (cold-start context + follow-ups)
- `notes/decisions/` — lightweight ADRs for architecture/product calls

## Workflow
1. Before a session: jot the plan/intent in a daily note (`notes/daily/YYYY-MM-DD.md`).
2. Mid-session: capture decisions as they happen; link back to the relevant `SPEC.md` section with
   `[[SPEC#section-name]]`.
3. When a real architectural or product decision is made: promote it into `notes/decisions/` using
   the Decision template.
4. End of session: run `/take-notes` to fill Result/Follow-ups and refresh the status block above.
