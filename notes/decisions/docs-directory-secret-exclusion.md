---
date: 2026-07-20
status: accepted
tags: [decision, security, git]
---

# docs/ tracking: exclude by pattern, not by directory

## Context
`docs/` currently sits entirely gitignored (`.gitignore` line 99: `docs/`), contradicting the
line's own comment ("Keep docs/ in repo"). Per OQ4 (ratified in SPEC.md, KOEN-8), `docs/` should
be tracked going forward — it holds product docs, the ERD, and sprint plans that reviewers and
future sessions need — but two files in it must never be committed: a live Firebase
service-account key (`koentjoro-k-firebase-adminsdk-fbsvc-*.json`) and the owner's CV PDF
(`fajrul_koentjoro_cv_en.pdf`, personal document, not project documentation).

## Decision
Replace the blanket `docs/` ignore with two pattern-based rules scoped to `docs/`:
```
docs/*firebase-adminsdk*.json
docs/*.pdf
```
The `*firebase-adminsdk*.json` pattern (not the exact current filename) catches any future
rotated key using Firebase's standard service-account naming convention, so a key rotation
doesn't silently start tracking the new file. `*.pdf` blanket-excludes CV-style personal
documents from `docs/` since none of the current or planned product docs are PDFs.

## Alternatives considered
- Exact filename match for the current key — rejected: a rotated key gets a new filename
  (new key ID suffix), so this would need editing `.gitignore` again on every rotation.
- `.gitignore` entry outside `docs/` (repo-wide `*.pdf`) — rejected: too broad, would hide
  legitimate PDFs added elsewhere in the repo later.

## Consequences
- The old key file must still be deleted from the working tree/history is not required (it was
  never committed — `git ls-files docs/` returns empty), but it must be rotated in the Firebase
  console regardless, since it has existed unencrypted on disk. This is a manual owner action
  Claude cannot perform.
- Any future secret-shaped file dropped into `docs/` needs its own pattern added here, or it
  will be tracked by default (tracked-by-default is the intended posture per OQ4).

## Related
- [[Home]]
- SPEC.md OQ4
