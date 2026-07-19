# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Purpose & Division of Labor (read first)

This is a portfolio + "reverse hiring" platform (companies bid to hire the owner), but its
real purpose is to **showcase the owner's hand-written backend engineering**. See `SPEC.md`
for the full spec and boundaries. The non-negotiable rule:

- **Never write backend implementation code** (`backend-python/`, `backend-go/`). The owner
  hand-writes all of it. Claude's backend role is limited to review, planning, debugging
  advice, and co-designing the API contract. Backend test scaffolding only when explicitly asked.
- **Claude fully owns the frontend** (`frontend/`) — code, tests, and UI design (the
  "dark technical" design brief is in SPEC.md).
- Work on `develop`/feature branches; `main` only via PR.

## Engineering Principles

Non-negotiable for all work Claude does here (frontend code, plus review/planning/debug advice on
the backend — the owner hand-writes backend implementation):

- **SOLID** — single-responsibility units; depend on abstractions, not concretions. Keep modules
  open for extension, closed for modification.
- **DRY & granular** — no duplicated logic; factor shared behavior into small, composable,
  single-purpose functions/components/hooks. Check for an existing atom/molecule/util (frontend) or
  service/repository helper (backend) before creating a new one.
- **TDD** — for frontend work, write a failing test first, implement to green, then refactor (once a
  frontend test runner is approved — see SPEC.md). On the backend the owner writes tests; Claude
  adds backend test scaffolding only when explicitly asked.
- **KISS / YAGNI** — solve the actual requirement with the simplest design that works. No
  speculative abstraction, config, or layering that isn't needed yet. Prefer the smallest change
  that delivers value.
- **Library-first** — for non-trivial functionality, prefer a well-maintained existing library over
  hand-rolling. Order of preference: (1) something already in `package.json`/`requirement.txt`,
  (2) an established, actively-maintained library scoped to the need, (3) hand-roll only when the
  need is thin enough that a dependency is overkill. Vet every candidate before adoption
  (provenance, open CVEs, active maintenance, real adoption) with a fresh registry/web check — not
  from memory. Adding a dependency is a design decision: settle it during planning and get approval,
  never silently mid-build (SPEC.md requires dependency approval).
- **Descriptive naming** — names state intent fully (`registrationDeadline`, not `regDl`). No
  abbreviations except widely-understood ones (`id`, `url`, `api`, `props`). A reader should not
  have to decode a name.
- **Minimal comments** — code should read cleanly on its own through good naming and structure.
  Comment only to explain _why_ (non-obvious intent, tradeoffs, domain rules), never _what_ the code
  plainly does.
- **Up-to-date context** — always check the surrounding code and the current state of the repo
  before adding new code; follow existing module boundaries. Avoid dead code, unused imports, or
  outdated patterns. Check CONTEXT7 for current library docs before using an API.
- **Clean but professional** — production-quality, but not over-engineered.

## Commands

### Backend Python (run from `backend-python/`)

```bash
make install-dev-deps        # pip install -r requirement.dev.txt
make run                     # uvicorn src.main:app --host 0.0.0.0 --port 1911 --reload
make pre-commit              # black + isort + flake8 (flake8-annotations: type hints mandatory)

pytest                       # all tests (pytest.ini: verbose, strict markers, asyncio auto)
pytest -m unit               # by marker: unit | integration | component
pytest test/unit_test/test_auth_model.py                 # single file
pytest test/unit_test/test_auth_model.py::test_name      # single test

# Beanie migrations (need CONNECTION_STRING + MONGODB_NAME from root .env)
make create-migration migration_name=<name>
make roll-up-one / roll-up-all / roll-down-one / roll-down-all
```

### Frontend (run from `frontend/`, uses pnpm)

```bash
pnpm dev                     # Vite dev server → http://localhost:5173
pnpm build                   # tsc -b && vite build
pnpm lint                    # eslint .
```

No frontend test framework is set up yet (Vitest + Testing Library is proposed in SPEC.md —
adding it requires dependency approval).

### Infra (repo root)

```bash
make run-dev                 # docker compose up -d (currently only MongoDB; frontend service commented out)
make run-prod                # docker compose -f docker-compose.prod.yml up -d
```

Endpoints: REST docs `:1911/docs` · GraphQL `:1911/graphql` · health `:1911/health`.
Smoke test after backend changes: start uvicorn and hit `/health`; for frontend, `pnpm dev` and verify the UI loads.

## Architecture

Monorepo with three apps: `frontend/` (React), `backend-python/` (primary API), `backend-go/`
(planned Go service — currently a stub).

### backend-python — layered domain modules

FastAPI serving **both REST and GraphQL**. Entry point `src/main.py` (`init_app()`); the
lifespan hook sets up logging and `firebase_admin`.

Every domain module under `src/domain/<name>/` follows the same layered layout — new domains
must match it:

- `model.py` — Beanie document (MongoDB)
- `repository.py` — data access
- `service.py` — business logic (never imports GraphQL types)
- `schema.py` — Pydantic schemas
- `graphql/schema.py` + `graphql/resolver.py` — GraphQL layer (resolvers stay thin, call services)
- `router.py` — REST endpoints
- `deps.py`, `exception.py`, `constant.py`, `config.py` — DI, typed domain errors, constants, module settings

Wiring happens in two aggregation points:
- REST: `src/domain/__init__.py` collects module routers, mounted at `/api` in `main.py`
  (e.g. auth → `/api/auth`).
- GraphQL: `src/graphql/{query,mutation,subscription}.py` assemble the root schema from
  module GraphQL schemas.

Cross-cutting pieces: `src/core/` (settings via `src.core.config.settings`, structured
logging via `src.core.logger`), `src/database/` (Beanie init, base model, migrations),
`src/worker/` (background jobs, empty so far).

Tests mirror the marker system: `test/unit_test/`, `test/integration_test/`,
`test/component_test/`.

### frontend — file-based routing + atomic design

React 19 + TypeScript strict + Vite. TanStack Router file routes live in `src/routes/`
(`__root.tsx`, `__app.tsx`, `__app/...`); `src/routeTree.gen.ts` is **generated — never
hand-edit**. Components follow atomic design: `src/components/{atoms,molecules,organisms,pages}`.
State: zustand. Validation: zod at API boundaries. Styling: Tailwind CSS 4 + Radix UI
primitives, variants via `class-variance-authority` + `tailwind-merge`. `src/lib/` holds
config, firebase client, and utilities.

## Conventions & Gotchas

- Python: black (88 cols), isort (black profile), flake8 with **flake8-annotations** — all
  functions need full type annotations or pre-commit fails. Python 3.14.
- Prefer the smallest change that delivers value; follow existing module boundaries; don't
  restructure the repo or add infrastructure without prior discussion (from
  `.github/copilot-instructions.md`, still applies).
- Root `.env` feeds docker-compose and the backend Makefile (`CONNECTION_STRING`,
  `MONGODB_NAME`, `JWT_SECRET_KEY`, Mongo root credentials).
- **`docs/` is entirely gitignored** (despite the .gitignore comment saying otherwise) — the
  product docs, ERD, and sprint plans exist only locally. A Firebase service-account key
  also sits in `docs/`; it must never be committed.
- Database is MongoDB via Beanie ODM — the ERD in `docs/ERD.md` uses SQL idioms, but the
  implementation is document-based.
- Auth is in flux: Firebase is wired in (frontend dep + `firebase_admin` at startup) but the
  spec direction is hand-rolled JWT — check SPEC.md Open Questions before touching auth.

## Project Memory & Notes

Two complementary systems keep context across sessions — each fact lives in exactly one place:

- **Claude native memory** (`~/.claude/projects/D--WorkStation/memory/`, indexed by `MEMORY.md`,
  auto-loaded every session) — durable facts about _how to work_: owner identity/preferences,
  feedback and corrections, stable project goals/constraints, reference links. Claude maintains it
  automatically. ⚠️ This store is keyed to the `D--WorkStation` workspace, so it is **shared with
  other projects under `D:\WorkStation`** (e.g. asadScoringPlatform). Launch Claude Code from inside
  `KoentjoroLandingPage/` if you want an isolated memory namespace.
- **In-repo notes vault** (Obsidian, version-controlled with the code) — the human-readable
  _project logbook_:
  - `Home.md` — entry point + current-status block (where we are, next step, load-bearing decision
    links, active blockers).
  - `notes/decisions/` — lightweight ADRs (one decision per note, from `templates/Decision.md`):
    what we decided and _why_.
  - `notes/daily/` — one session log per day (from `templates/Session Log.md`): cold-start context +
    follow-ups.

  The **`take-notes` skill** (`.claude/skills/take-notes`, or `/take-notes`) maintains this vault —
  run it after a session that produced decisions or a direction change. (This is a slimmed-down
  version of asadScoringPlatform's vault — `notes/architecture/` and `notes/inbox/` were dropped.)

**Routing rule of thumb:** a convention that must bind future code → **this CLAUDE.md**; a decision
with rationale → `notes/decisions/`; a durable "how to work with me" fact → **native memory**;
session narrative → `notes/daily/`.
