# Todo — Koentjoro Platform (from tasks/plan.md, 2026-07-20)

Jira keys synced 2026-07-20 (epics KOEN-1…7). `-BE` = Fajrul hand-writes (Claude reviews only) · `-FE` = Claude-owned.

## Phase 0 [KOEN-1] — Foundation Reset (7 SP)
- [ ] P0-T1 — Approve SPEC.md + settle 6 open questions (1 SP) · **KOEN-8**
- [ ] P0-T2 — Secret hygiene + track docs/ (2 SP) · **KOEN-9**
- [ ] P0-T3 — CI pipeline: lint + tests on every PR (3 SP) · **KOEN-10**
- [ ] CHECKPOINT 0 — Foundation verified (1 SP) · **KOEN-11**

## Phase 1 [KOEN-2] — Auth & Users, hand-written (22 SP)
- [ ] M1-T1-BE — Registration with hashed credentials (TDD, 3 SP) · **KOEN-12**
- [ ] M1-T2-BE — JWT access + refresh flow (TDD, merge-gated, 5 SP) · **KOEN-13**
- [ ] M1-T3-BE — RBAC guards on every operation (TDD, merge-gated, 3 SP) · **KOEN-14**
- [ ] M1-T4-BE — Email verification flow (TDD, 3 SP) · **KOEN-15**
- [ ] M1-T5-BE — Profile domain: owner profile/resume/abilities (TDD, 5 SP) · **KOEN-16**
- [ ] M1-T6-BE — [REFACTOR] Remove Firebase from backend (2 SP) · **KOEN-17**
- [ ] CHECKPOINT 1 — Auth complete; expand Phase 2 (1 SP) · **KOEN-18**

## Phase 2 [KOEN-3] — Offers Domain, hand-written (17 SP, slice-level)
- [ ] M2-S1-BE — Offer submission: company-rep CRUD (TDD, 5 SP) · **KOEN-19**
- [ ] M2-S2-BE — State machine + owner responses (TDD, merge-gated, 5 SP) · **KOEN-20**
- [ ] M2-S3-BE — Offer history / audit trail (TDD, 3 SP) · **KOEN-21**
- [ ] M2-S4-BE — Ranking & leaderboard (TDD, 3 SP) · **KOEN-22**
- [ ] CHECKPOINT 2 — Offers complete; expand Phase 3 (1 SP) · **KOEN-23**

## Phase 3 [KOEN-4] — Real-time & Jobs, hand-written (24 SP, slice-level)
- [ ] M3-S1-BE — Messaging domain (TDD, 5 SP) · **KOEN-24**
- [ ] M3-S2-BE — Domain events via Redis pub/sub (TDD, 5 SP) · **KOEN-25**
- [ ] M3-S3-BE — Go WebSocket notification hub (TDD, merge-gated, 8 SP — split at plan-a-ticket) · **KOEN-26**
- [ ] M3-S4-BE — Email background worker (TDD, 5 SP) · **KOEN-27**
- [ ] CHECKPOINT 3 — Real-time ≤1 s verified; expand Phases 4/5 (1 SP) · **KOEN-28**

## Phase 4 [KOEN-5] — AI Frontend I, Claude-owned (19 SP, slice-level)
- [ ] M4-S1-FE — Dark-technical design system + Vitest setup (TDD, 5 SP) · **KOEN-29**
- [ ] M4-S2-FE — Home: command-prompt hero + live status footer (TDD, 5 SP) · **KOEN-30**
- [ ] M4-S3-FE — Resume + abilities pages (TDD, 5 SP) · **KOEN-31**
- [ ] M4-S4-FE — Contact page + form (TDD, 3 SP) · **KOEN-32**
- [ ] CHECKPOINT 4 — Lighthouse a11y ≥90, responsive 360px (1 SP) · **KOEN-33**

## Phase 5 [KOEN-6] — AI Frontend II, Claude-owned (27 SP, slice-level)
- [ ] M5-S1-FE — Auth flows vs hand-rolled JWT; remove Firebase client (TDD, 5 SP) · **KOEN-34**
- [ ] M5-S2-FE — Company dashboard: offers + messaging (TDD, 8 SP — split at plan-a-ticket) · **KOEN-35**
- [ ] M5-S3-FE — Owner dashboard: ranking + state-machine UI (TDD, 8 SP — split at plan-a-ticket) · **KOEN-36**
- [ ] M5-S4-FE — Real-time client: live notifications (TDD, 5 SP) · **KOEN-37**
- [ ] CHECKPOINT 5 — Full E2E flow verified (1 SP) · **KOEN-38**

## Phase 6 [KOEN-7] — Ops & Launch (14 SP, slice-level)
- [ ] M6-S1-BE — Observability polish (TDD, 5 SP) · **KOEN-39**
- [ ] M6-S2 — Production deploy: koentjoro.cloud (5 SP) · **KOEN-40**
- [ ] M6-S3-FE — SEO + meta + performance pass (3 SP) · **KOEN-41**
- [ ] CHECKPOINT 6 — LAUNCH GATE: all 9 SPEC criteria live (1 SP) · **KOEN-42**

**Total: 130 SP · ~19 weeks + buffer · launch target 2026-12-22**
