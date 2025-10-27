# Copilot / AI Agent Instructions for KoentjoroLandingPage

You are a senior, pragmatic coding assistant. Follow the project's existing guidance (see `.github/instructions/koentjoro.instructions.md`) and prefer clear, small, testable changes. Keep suggestions minimal, idiomatic, and easy-to-review.

Summary (big picture)

- This repository is a multi-service landing/portfolio project (monorepo):
  - `frontend/` — React + TypeScript app built with Vite. Dev commands live in `frontend/package.json`.
  - `backend-python/` — FastAPI service (entry: `backend-python/src/main.py`) using Pydantic Settings in `src/core/config.py`, GraphQL in `src/graphql/`, and modular routers under `src/*` (e.g., `auth/`, `email/`).
  - Top-level `docker-compose.yml` and Dockerfiles support containerized runs for local/dev environments.

Key integration points & data flows

- Frontend -> Backend: frontend calls backend HTTP/GraphQL endpoints. Look for GraphQL definitions in `backend-python/src/graphql/` and REST routers in `backend-python/src/*/router.py`.
- Auth & Email: the Python backend contains `auth/` and `email/` modules, each exposing `router.py`, `schema.py`, `utils.py` and a `domain/` subpackage — prefer to add routes or business logic there.
- Configuration: backend Python config is centralized in `backend-python/src/core/config.py`. Settings are read from a top-level `.env` (see the `env_file` path) so prefer environment-driven changes.

How to run (developer workflows)

- Frontend (local):
  - Use pnpm if available (repository contains `pnpm-lock.yaml`) — otherwise npm/yarn work. Typical commands in `frontend/package.json`:
    - `pnpm --filter frontend install` (or `cd frontend && pnpm install`)
    - `cd frontend && pnpm dev` to start Vite (HMR)
    - `cd frontend && pnpm build` to build for production
- Python backend (local):
  - `cd backend-python` then either:
    - Run directly: `uvicorn main:app --host 0.0.0.0 --port 1911 --reload` (this matches `backend-python/src/main.py` defaults)
    - Or build/run via the provided Dockerfile and `docker-compose up` from the repo root.
  - Config: `backend-python/src/core/config.py` uses Pydantic Settings; update the `.env` referenced by that file for env-specific values.

Patterns & repository conventions (examples)

- Python FastAPI modules follow a modular router pattern: each feature folder (e.g., `auth/`, `email/`) contains `router.py`, `schema.py`, `utils.py` and a `domain/` subpackage. Add endpoints in `router.py` and domain logic under `domain/`.
- GraphQL in Python: mutations and schema live under `backend-python/src/graphql/` — follow existing naming and registration patterns when adding new types.
- Settings: all runtime flags should use `Settings` (Pydantic) in `src/core/config.py` — do not hardcode values.
- Frontend: use TypeScript + Vite patterns — component files live under `frontend/src/components` and routes under `frontend/src/routes/`. Lint and build use the scripts in `package.json` and the repo uses Tailwind CSS (see `tailwind.config.js`).

Examples to copy/paste

- Health-check (Python): `GET /health` is defined in `backend-python/src/main.py`. Example run:
  - `uvicorn main:app --host 127.0.0.1 --port 1911 --reload` then `curl http://127.0.0.1:1911/health`.
- Frontend dev: `cd frontend && pnpm dev` (Vite serves at the printed dev URL).

When changing code

- Make the smallest change that delivers value. Follow existing module boundaries. Add tests where feasible (there is a `test/` top-level folder).
- For Python changes, run a quick smoke test by starting `uvicorn` and hitting `/health`. For frontend, run `pnpm dev` and verify the UI loads.

What not to do

- Don’t change global repo structure or move services without a corresponding migration plan. Avoid adding heavy or global infra changes (e.g., new orchestration) without PR-level discussion.

Where to look first (quick navigation)

- Frontend: `frontend/package.json`, `frontend/src/`, `frontend/vite.config.ts`, `tailwind.config.js`.
- Backend (Python): `backend-python/src/main.py`, `backend-python/src/core/config.py`, `backend-python/src/graphql/`, `backend-python/src/auth/`, `backend-python/requirement.txt`, `backend-python/docs/`.
- Orchestration: `docker-compose.yml`, `backend-python/docker/dockerfile`, `frontend/docker/dockerfile`.

If something's missing

- Ask the repo owner to provide:
  - Environment `.env` templates for local development
  - Preferred package manager (pnpm vs npm) if ambiguous
  - Any non-obvious background services (external APIs, 3rd-party keys)

Feedback

- If any section is unclear or you want examples tailored to a specific change (e.g., add GraphQL type, add a backend route, wire frontend route), tell me which area and I'll expand with concrete diffs.
