# Implementation Plan: Koentjoro Platform (SPEC.md phases 0–6)

> Generated 2026-07-20 by `/plan-me`. Source of truth for scope is `SPEC.md`; this file is the
> execution breakdown. Jira project: **KOEN** (synced 2026-07-20, KOEN-1…KOEN-42).
> Capacity model: **1 SP ≈ 1.5 h · ~7 SP/week** (solo, part-time, AI-assisted) · Fibonacci points.

## Overview

Build the reverse-hiring platform in seven phases: foundation reset, hand-written auth/users,
offers domain, real-time & jobs, AI-owned frontend (public pages, then app), and launch at
koentjoro.cloud. **Division of labor is the defining constraint:** every `-BE` ticket is
hand-written by Fajrul (Claude reviews/plans only); every `-FE` ticket is Claude-owned
end-to-end. Phases 0–1 are detailed task-level; phases 2–6 are slice-level and get expanded
at the preceding checkpoint (`/plan-a-ticket` per ticket, `/plan-me` per phase re-slice).

## Planning assumptions (from SPEC.md Open Questions — ratified in P0-T1)

1. **Auth = hand-rolled JWT** (access + refresh); Firebase removed (OQ2).
2. **Go service = WebSocket notification hub** fed by Redis pub/sub (OQ1; adds Redis — "ask first" honored via P0-T1).
3. **Frontend tests = Vitest + React Testing Library** now, Playwright smoke at Phase 5 (OQ3; dependency approval folded into P0-T1).
4. **`docs/` becomes tracked**; Firebase key relocated + rotated, CV excluded (OQ4).
5. **GraphQL is the primary API**; existing REST stays for health/docs/auth-as-built (OQ5).
6. **MongoDB + Beanie stays** (OQ6).

If the owner overturns any of these at P0-T1, re-run `/plan-me` on the affected phases.

## Current state (verified 2026-07-20)

- Backend: `auth` domain exists (user model, token utils, Firebase utils, 1 migration); `email`
  domain exists; no `offer`/`message`/`profile` domains; `src/worker/` empty; `backend-go/` stub.
- Frontend: page components exist (home, resume, abilities, contact, bid) but only the home
  route is wired; auth dialogs use Firebase; no test framework; design system not started.
- Infra: docker-compose dev (Mongo only) + prod exist; **no `.github/workflows/` — CI absent**.
- Jira KOEN: empty — all tickets below are new.

## Dependency graph

```
CP0 Foundation (spec ✓, secrets ✓, CI ✓)
 ├── Phase 1 Auth & Users (BE) ──► CP1
 │     ├── Phase 2 Offers (BE) ──► CP2
 │     │     └── Phase 3 Real-time & Jobs (BE/Go) ──► CP3
 │     └────────────┐
 └── Phase 4 Frontend I: design system + public pages (FE) ──► CP4
                    │
       CP1 + CP2 + CP3 + CP4 ──► Phase 5 Frontend II: auth, dashboards, real-time (FE) ──► CP5
                                        └── Phase 6 Ops & Launch ──► CP6 (LAUNCH)
```

Phase 4 only needs CP0 (+ `/health`, which already exists) — it can interleave with phases
1–3 for demo availability, but SP capacity is shared, so interleaving doesn't compress the
calendar.

## Ticket conventions

- Jira titles: `[BACKEND] M1-T2: …` / `[FRONTEND] M4-S1: …`; type beats area (`[REFACTOR]`,
  `[BUG]`); epics & CHECKPOINTs untagged. Internal codes (`-BE`/`-FE` suffix) live here and in
  each ticket body.
- Labels: `backend`/`frontend`, `tdd`, `merge-gated` (risk carries via label — KOEN has no
  priority field), `checkpoint` for gates.
- Checkpoint gates are 1 SP verification sessions; a phase is done only when its gate passes.

---

## Phase 0 [KOEN-1] — Foundation Reset (7 SP · 2026-07-21 → 2026-07-28)

### P0-T1: Approve SPEC.md and settle the 6 open questions — 1 SP · **KOEN-8**
**Goal:** Owner ratifies SPEC.md and writes a decision for each Open Question (defaults = the
recommendations above).
**AC:** SPEC.md status flipped from Draft to Approved; each OQ has a written decision inline;
dependency approvals (Vitest/RTL, Redis) explicitly granted or denied.
**Verify:** `git log -1 -- SPEC.md`; SPEC.md contains no unanswered "Open Question".
**Depends:** none. **Files:** `SPEC.md` [edit].

### P0-T2: Secret hygiene + track `docs/` — 2 SP · **KOEN-9**
**Goal:** Firebase service-account key out of `docs/`, rotated; `.gitignore` line-99
contradiction fixed; `docs/` tracked (minus secrets/CV).
**AC:** `git ls-files` shows docs/ content but no key/CV; key rotated in Firebase console;
`.gitignore` comment and rules agree.
**Verify:** `git ls-files docs/`; grep .gitignore; manual console check.
**Depends:** P0-T1 (OQ4). **Files:** `.gitignore` [edit], `docs/` [edit].

### P0-T3: CI pipeline — lint + all test suites on every PR — 3 SP · **KOEN-10**
**Goal:** GitHub Actions: backend black/isort/flake8 + pytest (unit; integration via Mongo
service container), frontend eslint + `tsc -b && vite build`; red suite blocks merge; `main`
protected (PR-only).
**AC:** CI runs on PR to develop/main; backend job green; frontend job green; branch
protection verified.
**Verify:** open a no-op PR, watch checks; attempt direct push to main fails.
**Depends:** P0-T1. **Files:** `.github/workflows/ci.yml` [new — no workflows exist yet].

### CHECKPOINT 0: Foundation verified — 1 SP · **KOEN-11**
Spec approved · no secrets in git history going forward · CI green on a real PR.

---

## Phase 1 [KOEN-2] — Auth & Users, hand-written (22 SP · 2026-07-29 → 2026-08-20)

### M1-T1-BE: Registration with hashed credentials (TDD) — 3 SP · **KOEN-12**
**Goal:** Company-rep registration (GraphQL mutation + existing REST as built) storing
argon2/bcrypt-hashed passwords; duplicate email → typed domain error.
**AC:** register creates user with hashed pw + role `company_representative`; duplicate email
returns typed error, not 500; unit + component tests cover both.
**Verify:** `pytest -m unit`, `pytest -m component`; manual GraphQL register at `/graphql`.
**Depends:** CP0. **Files:** `backend-python/src/domain/auth/{model,service,repository,schema,router}.py` [edit], `backend-python/src/domain/auth/graphql/{schema,resolver}.py` [edit], migration [new if schema changes].

### M1-T2-BE: JWT access + refresh flow (TDD, merge-gated) — 5 SP · **KOEN-13**
**Goal:** Sign-in issues short-lived access + rotating refresh token; refresh endpoint
rotates; sign-out revokes; secrets from `JWT_SECRET_KEY`.
**AC:** sign-in returns both tokens; expired access + valid refresh → new pair; reused/revoked
refresh rejected with typed error; sign-out revokes the family.
**Verify:** `pytest -m unit && pytest -m component`; manual token flow via `/docs`.
**Depends:** M1-T1. **Files:** `backend-python/src/domain/auth/utils/token_utils.py` [edit], `backend-python/src/domain/auth/{service,deps,router}.py` [edit], `backend-python/src/domain/auth/graphql/*` [edit], migration [new — refresh-token store].

### M1-T3-BE: RBAC guards on every operation (TDD, merge-gated) — 3 SP · **KOEN-14**
**Goal:** Roles owner / company_representative / visitor enforced by shared guard deps; every
resolver and route checks role.
**AC:** role-forbidden op → typed PermissionDenied; guard applied to 100% of non-public
resolvers (component test sweeps the schema); owner seeded via migration/env.
**Verify:** `pytest -m component` includes a "every operation guarded" sweep.
**Depends:** M1-T2. **Files:** `backend-python/src/domain/auth/deps.py` [edit], `backend-python/src/domain/auth/{constant,exception}.py` [edit], `backend-python/src/graphql/{query,mutation}.py` [edit].

### M1-T4-BE: Email verification flow (TDD) — 3 SP · **KOEN-15**
**Goal:** Signed verification token emailed on register (FastAPI BackgroundTasks interim —
worker migration is M3-S4); verify endpoint flips flag; unverified users can't act.
**AC:** register triggers email send off the hot path; valid token verifies once (replay
rejected); unverified rep blocked from protected mutations.
**Verify:** `pytest -m unit && pytest -m integration` (email service faked).
**Depends:** M1-T1. **Files:** `backend-python/src/domain/email/**` [edit], `backend-python/src/domain/auth/{service,router}.py` [edit].

### M1-T5-BE: Profile domain — owner profile, resume, abilities (TDD) — 5 SP · **KOEN-16**
**Goal:** New `profile` domain (standard layered layout) with public queries feeding
resume/abilities pages and owner-only mutations; seed migration.
**AC:** public profile/resume/abilities queries need no auth; mutations owner-only; migration
up/down clean; unit + component coverage.
**Verify:** `pytest`; `make roll-up-all && make roll-down-one`.
**Depends:** M1-T3. **Files:** `backend-python/src/domain/profile/` [new — no existing module holds profile/resume data], `backend-python/src/graphql/{query,mutation}.py` [edit], `backend-python/src/domain/__init__.py` [edit], migration [new].

### M1-T6-BE: Remove Firebase from the backend ([REFACTOR]) — 2 SP · **KOEN-17**
**Goal:** Per OQ2: drop `firebase_admin` startup, Firebase utils and deps (frontend removal
lands in M5-S1).
**AC:** no firebase import anywhere in `backend-python/src`; app boots; full suite green.
**Verify:** `grep -r firebase backend-python/src` empty; `make run` + `/health`; `pytest`.
**Depends:** M1-T2. **Files:** `backend-python/src/main.py` [edit], `backend-python/src/domain/auth/utils/firebase_utils.py` [edit→delete], `backend-python/requirement.{dev,prod}.txt` [edit].

### CHECKPOINT 1: Auth complete — 1 SP · **KOEN-18**
Full pytest green in CI · component test per auth GraphQL op · manual smoke:
register → verify → sign-in → refresh → role-blocked op · SDL snapshot committed.
**Expand Phase 2 tickets here.**

---

## Phase 2 [KOEN-3] — Offers Domain, hand-written (17 SP · 2026-08-21 → 2026-09-07) — slice-level

### M2-S1-BE: Offer submission — company-rep CRUD (TDD) — 5 SP · **KOEN-19**
Submit/edit/withdraw with validation; rep sees own offers only.
**AC:** verified rep can submit/edit/withdraw; others' offers invisible; input validated.
**Verify:** `pytest`; GraphQL manual. **Depends:** CP1.
**Files:** `backend-python/src/domain/offer/` [new — domain doesn't exist], graphql aggregation + `domain/__init__.py` [edit], migration [new].

### M2-S2-BE: Offer state machine + owner responses (TDD, merge-gated) — 5 SP · **KOEN-20**
accept / reject / negotiate with `VALID_TRANSITIONS`; invalid transition → typed error (SPEC success criterion 3).
**AC:** all legal transitions pass; every illegal transition returns typed error; owner-only.
**Verify:** `pytest -m unit` exhausts the transition matrix. **Depends:** M2-S1.
**Files:** `backend-python/src/domain/offer/` [edit-after-S1].

### M2-S3-BE: Offer history / audit trail (TDD) — 3 SP · **KOEN-21**
Every state change recorded (who/when/what); queryable per offer.
**Depends:** M2-S2. **Files:** `backend-python/src/domain/offer/` [edit], migration [new].

### M2-S4-BE: Offer ranking & leaderboard (TDD) — 3 SP · **KOEN-22**
Ranking query for the owner dashboard (amount/recency/composite — settle at plan-a-ticket).
**Depends:** M2-S1. **Files:** `backend-python/src/domain/offer/` [edit].

### CHECKPOINT 2: Offers complete — 1 SP · **KOEN-23**
Suite green · state machine exhaustively tested · **expand Phase 3 here.**

---

## Phase 3 [KOEN-4] — Real-time & Jobs, hand-written (24 SP · 2026-09-08 → 2026-10-02) — slice-level

### M3-S1-BE: Messaging domain — company ↔ owner threads (TDD) — 5 SP · **KOEN-24**
**Depends:** CP2. **Files:** `backend-python/src/domain/message/` [new — no messaging exists], migration [new].

### M3-S2-BE: Domain events via Redis pub/sub (TDD) — 5 SP · **KOEN-25**
Offer/message/status events published; Redis added to compose (approved at P0-T1).
**Depends:** CP2. **Files:** `backend-python/src/core/` [edit], `docker-compose.yml` + `docker-compose.prod.yml` [edit], offer/message services [edit].

### M3-S3-BE: Go WebSocket notification hub (TDD, merge-gated) — 8 SP · **KOEN-26**
Subscribes Redis, fans out to authenticated WS clients ≤1 s (SPEC criterion 4). L-sized —
**split at plan-a-ticket** (skeleton/auth vs fan-out/delivery).
**Depends:** M3-S2. **Files:** `backend-go/cmd/notification-hub/` [new — backend-go is a stub], `backend-go/internal/` [new].

### M3-S4-BE: Email background worker (TDD) — 5 SP · **KOEN-27**
All email leaves the request path (SPEC criterion 5); M1-T4 interim replaced.
**Depends:** M3-S2. **Files:** `backend-python/src/worker/` [new — currently empty], `backend-python/src/domain/email/**` [edit].

### CHECKPOINT 3: Real-time verified — 1 SP · **KOEN-28**
New offer → WS notification ≤1 s measured · emails only via worker · **expand Phase 4/5 here.**

---

## Phase 4 [KOEN-5] — AI Frontend I: design system + public pages (19 SP · 2026-10-03 → 2026-10-22) — slice-level, Claude-owned

### M4-S1-FE: Dark-technical design system + Vitest setup (TDD) — 5 SP · **KOEN-29**
Tokens (near-black base, one accent, WCAG AA), Inter/Geist + JetBrains Mono, core atoms
restyled, `prefers-reduced-motion`; Vitest + RTL wired into CI (approved at P0-T1).
**Depends:** CP0 (can interleave with phases 1–3).
**Files:** `frontend/src/index.css` [edit], `frontend/tailwind.config.js` [edit], `frontend/src/components/atoms/` [edit], `frontend/package.json` [edit], `frontend/vitest.config.ts` [new — no test framework exists], `.github/workflows/ci.yml` [edit].

### M4-S2-FE: Home — command-prompt hero + live status footer (TDD) — 5 SP · **KOEN-30**
Hero per design brief; footer polls `/health` (`● operational`).
**Depends:** M4-S1. **Files:** `frontend/src/components/pages/home.tsx` [edit], `frontend/src/components/organisms/Footer/` [edit], `frontend/src/components/molecules/Footer/` [edit], `frontend/src/routes/__app/home/index.tsx` [edit].

### M4-S3-FE: Resume + abilities pages (TDD) — 5 SP · **KOEN-31**
Wire missing routes; feed from profile API (M1-T5) with static fallback until CP1.
**Depends:** M4-S1 (relates M1-T5). **Files:** `frontend/src/components/pages/{resume,abilities}.tsx` [edit], `frontend/src/routes/__app/` [new route files], `frontend/src/lib/` [edit — API client + zod schemas].

### M4-S4-FE: Contact page + form (TDD) — 3 SP · **KOEN-32**
Zod-validated form → email domain endpoint.
**Depends:** M4-S1. **Files:** `frontend/src/components/pages/contact.tsx` [edit], `frontend/src/routes/__app/` [new route file], `frontend/src/lib/` [edit].

### CHECKPOINT 4: Public site verified — 1 SP · **KOEN-33**
Lighthouse a11y ≥ 90 · responsive to 360 px · `pnpm test` + build green in CI · design system documented.

---

## Phase 5 [KOEN-6] — AI Frontend II: auth, dashboards, real-time (27 SP · 2026-10-23 → 2026-11-19) — slice-level, Claude-owned

### M5-S1-FE: Auth flows against hand-rolled JWT (TDD) — 5 SP · **KOEN-34**
Replace Firebase client (`lib/firebase.ts` removed); zustand session store; token
refresh handling; register/verify/sign-in flows.
**Depends:** CP4 + CP1. **Files:** `frontend/src/lib/firebase.ts` [edit→delete], `frontend/src/lib/` [edit], `frontend/src/components/molecules/Auth/` [edit], `frontend/src/routes/` [new auth routes], `frontend/package.json` [edit — drop firebase].

### M5-S2-FE: Company dashboard — offers + messaging (TDD) — 8 SP · **KOEN-35**
Submit/edit/withdraw offers; message the owner. L-sized — **split at plan-a-ticket**.
**Depends:** M5-S1 + CP2 (messaging part: CP3). **Files:** `frontend/src/components/{organisms,pages}/` [new dashboard components], `frontend/src/routes/` [new].

### M5-S3-FE: Owner dashboard — ranking + state-machine UI (TDD) — 8 SP · **KOEN-36**
Offer list + leaderboard; accept/reject/negotiate; state machine rendered as diagram
(design brief). L-sized — **split at plan-a-ticket**.
**Depends:** M5-S1 + CP2. **Files:** `frontend/src/components/{organisms,pages}/` [new], `frontend/src/routes/` [new].

### M5-S4-FE: Real-time client — live notifications (TDD) — 5 SP · **KOEN-37**
WS client to the Go hub; visible event stream; latency readout (design brief).
**Depends:** M5-S1 + CP3. **Files:** `frontend/src/lib/` [edit — WS client], `frontend/src/components/` [new notification components].

### CHECKPOINT 5: App flows verified — 1 SP · **KOEN-38**
E2E: register → verify → sign-in → submit offer → owner responds → rep notified ≤1 s ·
Playwright smoke added (per OQ3) · suites green.

---

## Phase 6 [KOEN-7] — Ops & Launch (14 SP · 2026-11-20 → 2026-12-04) — slice-level

### M6-S1-BE: Observability polish (TDD) — 5 SP · **KOEN-39**
Request IDs end-to-end, structured JSON logs, metrics endpoint, dependency-deep `/health`
(SPEC criterion 6). **Depends:** CP5. **Files:** `backend-python/src/core/{logger,config}.py` [edit], `backend-python/src/main.py` [edit].

### M6-S2: Production deploy — koentjoro.cloud — 5 SP · **KOEN-40**
Prod compose boots full stack; TLS; domain; co-owned infra (ask-first honored).
**Depends:** M6-S1. **Files:** `docker-compose.prod.yml` [edit], `frontend/nginx.conf` [edit], root `Makefile` [edit].

### M6-S3-FE: SEO + meta + performance pass — 3 SP · **KOEN-41**
**Depends:** CP5. **Files:** `frontend/index.html` [edit], `frontend/src/routes/__root.tsx` [edit], `frontend/vite.config.ts` [edit].

### CHECKPOINT 6 / LAUNCH GATE — 1 SP · **KOEN-42**
All 9 SPEC success criteria checked live at koentjoro.cloud.

---

## Roll-up & timeline (7 SP/week)

| Phase | SP | Window (2026) |
|---|---|---|
| 0 Foundation | 7 | Jul 21 – Jul 28 |
| 1 Auth & Users | 22 | Jul 29 – Aug 20 |
| 2 Offers | 17 | Aug 21 – Sep 07 |
| 3 Real-time & Jobs | 24 | Sep 08 – Oct 02 |
| 4 Frontend I | 19 | Oct 03 – Oct 22 |
| 5 Frontend II | 27 | Oct 23 – Nov 19 |
| 6 Ops & Launch | 14 | Nov 20 – Dec 04 |
| **Total** | **130** | **~19 wk + ~15% buffer → launch target 2026-12-22** |

**Scope-cut levers if the timeline is too long** (in cut order):
1. Drop the Go hub; serve WS from Strawberry GraphQL subscriptions in Python (−13 SP, loses Go showcase — OQ1 trade-off).
2. Defer messaging (M3-S1 + messaging half of M5-S2): −10 SP.
3. Defer ranking/leaderboard (M2-S4 + part of M5-S3): −5 SP.

## Risks & mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Backend velocity is one person's spare time | High | Honest 7 SP/wk model; frontend (Claude) interleaves; scope-cut levers above |
| Auth in flux (Firebase↔JWT) blocks everything | High | P0-T1 decision gate before any Phase 1 code; M1-T6 removes the dead path |
| Go hub is new territory | Med | 8 SP + merge-gated + split at plan-a-ticket; lever #1 as fallback |
| Secret already in `docs/` history | Med | P0-T2 rotates the key regardless of git history |
| Later-phase slices are L-sized | Med | Explicit "split at plan-a-ticket" markers; checkpoints re-expand phases |

## Open decisions for the owner (all parked on P0-T1)

The six SPEC Open Questions. The plan assumes the recommendations; overturning OQ1
(Go scope) or OQ2 (auth) changes Phase 3 / Phase 1 materially — re-run `/plan-me` then.
