# Spec: Koentjoro Platform — Backend Engineering Showcase

> **Status:** Approved
> **Last updated:** 2026-07-20
> Living document: update this file first when a decision changes, then implement.

## Objective

A "reverse hiring" platform (companies bid to hire Fajrul) whose **primary purpose is to
demonstrate Fajrul's backend software engineering ability** — and to serve as a deliberate
learning vehicle across the full breadth of backend concerns.

The product concept (portfolio + companies submit competing offers) is the *vehicle*; the
*point* is the engineering underneath it: authentication and RBAC, real-time delivery,
background job processing, and production-grade observability and operations.

### Division of labor (the defining constraint of this project)

| Area | Author | AI (Claude) role |
|---|---|---|
| Backend — Python API (`backend-python/`) | **Fajrul, hand-written** | Review, planning, debugging advice, spec/docs. **Never writes implementation code.** |
| Backend — Go service (`backend-go/`) | **Fajrul, hand-written** | Same as above. |
| Backend tests | Fajrul (AI may review; scaffolding only if asked) | Review, suggest cases |
| API contract (GraphQL schema) | Co-designed, documented in `docs/` | Propose, validate against frontend needs |
| Frontend (`frontend/`) | **AI, fully** — design system, components, routes, state, tests | Owns end-to-end |
| UI/UX design | **AI, fully** — per the design brief below | Owns end-to-end |
| Infra / CI / deploy | Co-owned | Propose changes, ask before applying |

### Users

- **Visitor** — browses public profile, resume, abilities; submits contact form.
- **Company representative** — registers, signs in, submits/edits/withdraws offers, messages the owner.
- **Owner (Fajrul)** — reviews offers (accept / reject / negotiate), messages companies, manages profile.

### Success looks like

A deployed, production-quality platform at **koentjoro.cloud** where a recruiter can inspect
both the product *and* the engineering (public repo, live health/metrics, clean commit
history showing hand-written backend work).

## Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Frontend | React 19, TypeScript 5.8 (strict), Vite 7, TanStack Router, Tailwind CSS 4, Radix UI, zustand, zod, lucide-react | pnpm; atomic design |
| Backend API | Python 3.14, FastAPI, Strawberry GraphQL, Pydantic | Port 1911; domain-driven `src/domain/<module>` layout |
| Database | MongoDB 8 + Beanie ODM | Beanie migrations in `src/database/migrations` |
| Go service | Go — WebSocket notification hub, fans out offer/message events via Redis pub/sub | `backend-go/`; adds Redis to infra |
| Auth | Firebase (Google sign-in only) issues an ID token; backend verifies it once, then mints its own hand-rolled JWT (access + refresh) for all API sessions/RBAC (owner / company_representative / visitor) | Firebase never gates API requests directly — hand-rolled JWT does |
| Infra | Docker Compose (dev + prod), GitHub Actions CI | Deploy target: koentjoro.cloud |

## Commands

### Frontend (`frontend/`)
```bash
pnpm install                 # install deps
pnpm dev                     # dev server → http://localhost:5173
pnpm build                   # tsc -b && vite build
pnpm lint                    # eslint .
pnpm test                    # Vitest + React Testing Library (approved; Playwright e2e lands at Phase 5)
```

### Backend Python (`backend-python/`)
```bash
make install-dev-deps        # pip install -r requirement.dev.txt
make run                     # uvicorn src.main:app --host 0.0.0.0 --port 1911 --reload
pytest                       # all tests (verbose, strict markers)
pytest -m unit               # unit tests only (also: integration, component)
make pre-commit              # black + isort + flake8 + hygiene hooks

# Migrations (Beanie)
make create-migration migration_name=<name>
make roll-up-one / roll-up-all / roll-down-one / roll-down-all
```

### Backend Go (`backend-go/`, once real)
```bash
go run ./cmd/<service>       # run locally
go test ./... -race          # tests with race detector
go vet ./... && gofmt -l .   # static checks
```

### Infra (repo root)
```bash
docker compose up                                  # dev: MongoDB (frontend service currently commented out)
docker compose -f docker-compose.prod.yml up -d    # production stack
```

Endpoints: API docs `:1911/docs` · GraphQL `:1911/graphql` · Health `:1911/health`

## Project Structure

```
frontend/                    # AI-owned React app
  src/components/            #   atoms / molecules / organisms / pages (atomic design)
  src/routes/                #   TanStack Router file routes
  src/routeTree.gen.ts       #   GENERATED — never hand-edit
  src/lib/                   #   utilities, API client, zod schemas
backend-python/              # Hand-written FastAPI + Strawberry API
  src/core/                  #   config, structured logging
  src/database/              #   db init, base model, Beanie migrations
  src/domain/<module>/       #   domain modules (auth, email, offers, …): models, services, resolvers
  src/graphql/               #   schema assembly
  src/worker/                #   background jobs
  test/                      #   pytest — markers: unit / integration / component
backend-go/                  # Hand-written Go service (scope TBD)
  cmd/<service>/             #   entrypoints
  internal/                  #   private packages
docs/                        # Product docs, ERD, sprint plans (tracked in git minus Firebase key + CV PDF)
tasks/                       # plan.md + todo.md (created during the Plan phase)
SPEC.md                      # this file
```

## Code Style

### Python (enforced by pre-commit: black 88, isort black-profile, flake8 + flake8-annotations)

Full type annotations are mandatory. Resolvers stay thin; business logic lives in domain
services. Typed domain errors, never bare exceptions across layers.

```python
class OfferService:
    """Business logic for offers. Resolvers call this; it never imports GraphQL types."""

    async def respond_to_offer(
        self, offer_id: PydanticObjectId, action: OfferAction, actor: User
    ) -> Offer:
        offer = await Offer.get(offer_id)
        if offer is None:
            raise OfferNotFoundError(offer_id)
        if actor.role != UserRole.OWNER:
            raise PermissionDeniedError("only the owner can respond to offers")
        if action not in VALID_TRANSITIONS[offer.status]:
            raise InvalidTransitionError(offer.status, action)
        ...
```

### TypeScript (strict mode, ESLint flat config)

Atomic design under `src/components/`; variants via `class-variance-authority` +
`tailwind-merge`; all API responses parsed with zod at the boundary; zustand for client
state; named exports; PascalCase components, camelCase functions.

### Go

`gofmt` + `go vet` clean; `cmd/` + `internal/` layout; errors wrapped with context
(`fmt.Errorf("...: %w", err)`); table-driven tests.

## UI Design Brief — "Dark Technical"

The frontend must look like it was built by an engineer who sweats details, and it should
**make the backend visible** — the UI is itself an exhibit of the API behind it.

- **Palette:** near-black base (e.g. `#0B0E14`), high-contrast neutral text, **one** accent
  (electric cyan or terminal green) used sparingly for interactive/status elements. WCAG AA
  contrast minimum.
- **Type:** a clean sans (e.g. Inter/Geist) for prose; a monospace (e.g. JetBrains Mono) for
  labels, metadata, numbers, code, and status text.
- **Texture:** terminal-inspired details — command-prompt hero, status-dot indicators
  (`● operational`), keyboard hints, thin 1px borders, subtle glow on focus. No skeuomorphic
  terminal windows everywhere; restraint over gimmick.
- **Make the backend visible:** live system-status footer fed by `/health`, latency readouts
  on dashboard queries, offer state machine rendered as a diagram, real-time events visibly
  streaming in. The design should invite "how is this built?"
- **Motion:** fast and subtle (150–250 ms ease-out); respect `prefers-reduced-motion`.
- **Responsive** down to 360 px; keyboard-navigable; visible focus states.

## Testing Strategy

| Suite | Framework | Location | Expectation |
|---|---|---|---|
| Backend unit | pytest (`-m unit`) | `backend-python/test/` | Every domain service; pure logic, no I/O; ~80% coverage on `src/domain` |
| Backend integration | pytest (`-m integration`) | same | Against real MongoDB (Docker); migrations up/down |
| Backend component | pytest (`-m component`) | same | Every GraphQL operation exercised end-to-end in-process |
| Go | `go test -race` | alongside packages | Table-driven; handlers via `httptest` |
| Frontend | Vitest + Testing Library (proposed) | `frontend/src/**/*.test.tsx` | Critical flows: auth, offer submission, dashboards |
| Contract | GraphQL SDL snapshot | CI | Schema changes are explicit, reviewed diffs |

Tests run in CI on every PR; a red suite blocks merge.

## Boundaries

### Always
- **Respect the division of labor:** Claude never writes backend implementation code
  (Python or Go) — review, planning, and advice only. Backend commits are Fajrul's own work.
- Claude fully owns frontend code and design.
- Run `make pre-commit` and the relevant test suite before every commit.
- Full Python type annotations; TypeScript strict; validate and authorize at the API
  boundary (every resolver checks role).
- Work on `develop` / feature branches; conventional commit messages.
- Update SPEC.md when a decision changes — spec first, then code.

### Ask first
- Adding or upgrading any dependency (frontend or backend).
- Database schema changes or new migrations.
- Breaking changes to the GraphQL contract.
- CI/CD workflow changes; new infrastructure components (e.g. Redis).
- AI-generated backend test scaffolding (allowed only on request).

### Never
- Commit secrets: `.env`, the Firebase service-account JSON, tokens. (Key currently lives
  in `docs/` — keep it out of git; rotate it if it was ever shared.)
- Hand-edit generated files (`routeTree.gen.ts`).
- Delete or skip failing tests to make a build pass.
- Push directly to `main`.
- Let Claude "quickly" implement backend logic to unblock something — that defeats the
  project's purpose.

## Success Criteria

1. A visitor can browse profile/resume/abilities pages — AI frontend served against the hand-written API.
2. A company rep can register, verify email, sign in (JWT access + refresh), and submit an offer; RBAC blocks every operation outside their role.
3. The owner dashboard lists offers with ranking; accept/reject/negotiate follow the state machine, and invalid transitions return typed errors.
4. New offer / status change / new message produces a real-time notification over WebSocket in ≤ ~1 s.
5. Emails (verification, offer events) are sent by a background worker — never in the request path.
6. `/health` reports dependency status; logs are structured JSON with request IDs; basic metrics exposed.
7. `docker compose -f docker-compose.prod.yml up` boots the full stack; the site is live at koentjoro.cloud.
8. CI runs lint + all test suites on every PR; `develop → main` only via PR.
9. Frontend: documented dark-technical design system; Lighthouse accessibility ≥ 90; responsive to 360 px.

## Roadmap (phases — detailed plan lands in `tasks/plan.md`)

0. **Foundation reset** — approve this spec; fix `docs/` gitignore mismatch; secret hygiene; CI green.
1. **Auth & users (hand-written)** — JWT + refresh, RBAC, email verification, profile domain, migrations, tests.
2. **Offers domain (hand-written)** — offer CRUD, state machine, history, ranking/leaderboard.
3. **Real-time & jobs (hand-written)** — notifications, messaging, Go service (per decision), email worker.
4. **AI frontend I** — design system + public pages (home, resume, abilities, contact).
5. **AI frontend II** — auth flows, company & owner dashboards, real-time client.
6. **Ops & launch** — observability polish, prod deploy, SEO.

Deferred to backlog (was in old docs, cut from core scope): blog, testimonials CMS, FAQ
admin, analytics dashboards, document management.

## Open Questions — Decided (KOEN-8, 2026-07-20)

1. **Go service scope** — **Decided: WebSocket notification hub.** Fans out offer/message
   events published by the Python API via Redis pub/sub. Adds Redis to infra.
2. **Auth provider** — **Decided: Firebase (Google sign-in) + hand-rolled JWT on top.**
   Firebase authenticates the user via Google OAuth and issues an ID token; the backend
   verifies that token once at login, then mints its own hand-rolled JWT (access + refresh)
   for RBAC and all subsequent API sessions. Firebase never gates API requests directly —
   every authenticated request after login is validated against the hand-rolled JWT, keeping
   auth demonstrative of backend skill.
3. **Frontend test stack** — **Decided: approved.** Vitest + React Testing Library now;
   Playwright e2e smoke tests approved for Phase 5.
4. **`docs/` is entirely gitignored** — **Decided: track `docs/` in git**, excluding the
   Firebase service-account key and the CV PDF (relocate or explicitly ignore those two
   files).
5. **API style** — **Decided: GraphQL + REST.** Keep GraphQL as primary, add REST endpoints
   alongside it for showcase breadth.
6. **Database** — **Decided: MongoDB stays** (Beanie ODM). The ERD's SQL idioms are
   documentation-only and don't change the document-based implementation.
