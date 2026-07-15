#!/usr/bin/env bash
# Refresh the `hostinger-static` branch with the latest static export.
# This branch contains ONLY the prerendered HTML + assets at the root —
# what Hostinger's Git auto-deploy expects to find in public_html/.
#
# Usage:
#   bun run deploy:git-static     # rebuilds + pushes
#
# What it does:
#   1. Rebuilds dist-static/ (so the branch always reflects current main).
#   2. Uses a temporary git worktree on the `hostinger-static` branch.
#   3. Wipes the worktree, copies dist-static/ contents to its root.
#   4. Commits + pushes to origin/hostinger-static.
#   5. Cleans up the worktree.
# main is never touched.

set -euo pipefail

REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"
WORKTREE="/tmp/hs-worktree-$$"
BRANCH="hostinger-static"

cd "$REPO_DIR"

# Production publishing is intentionally CI-only. A local checkout pushed an
# older build over a verified release on 2026-07-15, so laptops and parallel
# agent worktrees must never write the generated production branch directly.
if [ "${GITHUB_ACTIONS:-}" != "true" ]; then
  echo "ERROR: Production deployment is GitHub-Actions-only." >&2
  echo "Push or merge to main, then let .github/workflows/build-deploy.yml publish." >&2
  exit 1
fi

SOURCE_SHA=$(git rev-parse HEAD)
if [ -z "${GITHUB_SHA:-}" ] || [ "$SOURCE_SHA" != "$GITHUB_SHA" ]; then
  echo "ERROR: Checked-out source ($SOURCE_SHA) does not match GITHUB_SHA (${GITHUB_SHA:-unset})." >&2
  exit 1
fi
if [ "${GITHUB_REF_NAME:-}" != "main" ]; then
  echo "ERROR: Refusing production deploy from '${GITHUB_REF_NAME:-unknown}'; expected main." >&2
  exit 1
fi
if [ -n "$(git status --porcelain --untracked-files=no)" ]; then
  echo "ERROR: Tracked files changed during the CI build; refusing a mixed-source deploy." >&2
  git status --short --untracked-files=no >&2
  exit 1
fi

echo "─── 1/4  Rebuilding dist-static/ ───"
# CI builds + gates dist-static in its own steps and sets SKIP_REBUILD=1.
if [ "${SKIP_REBUILD:-}" = "1" ]; then
  # SKIP_REBUILD is a CI-only optimization. On a laptop it can push a stale
  # dist-static/ that silently regresses the live site (this bit us in June:
  # source was fixed but week-old HTML stayed live). Outside CI, refuse unless
  # the export is fresh (<30 min old).
  if [ -z "${CI:-}" ]; then
    if [ -z "$(find dist-static/index.html -mmin -30 2>/dev/null)" ]; then
      echo "ERROR: SKIP_REBUILD=1 outside CI with a stale dist-static/ (>30 min old)." >&2
      echo "Rebuild first (bun run build:static) or drop SKIP_REBUILD." >&2
      exit 1
    fi
    echo "(SKIP_REBUILD=1 — local run, dist-static/ verified fresh)"
  else
    echo "(SKIP_REBUILD=1 — using existing dist-static/)"
  fi
else
  bun run build:static
fi
find dist-static -name "._*" -delete 2>/dev/null || true

# A public, non-cacheable provenance record lets the post-deploy gate prove
# that Hostinger is serving this exact source commit rather than a merely
# healthy-looking older build.
DEPLOYED_AT=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
printf '{\n  "sourceSha": "%s",\n  "sourceRef": "refs/heads/main",\n  "deployedAt": "%s",\n  "githubRunId": "%s"\n}\n' \
  "$SOURCE_SHA" "$DEPLOYED_AT" "${GITHUB_RUN_ID:-unknown}" > dist-static/deployment.json

echo
echo "─── 2/4  Preparing $BRANCH worktree ───"
git worktree remove --force "$WORKTREE" 2>/dev/null || true
rm -rf "$WORKTREE"

# Fetch latest remote state so we don't push stale refs
git fetch origin "$BRANCH" 2>/dev/null || true

# The branch is 100% generated output — never merge it. Hard-reset the local
# branch to origin (kills the silent-divergence → late non-fast-forward class
# of failure when several machines deploy), and push with --force-with-lease
# below so a concurrent deploy still can't be clobbered unseen.
if git show-ref --verify --quiet "refs/remotes/origin/$BRANCH"; then
  git worktree add -B "$BRANCH" "$WORKTREE" "origin/$BRANCH"
elif git show-ref --verify --quiet "refs/heads/$BRANCH"; then
  git worktree add "$WORKTREE" "$BRANCH"
else
  git worktree add --no-checkout "$WORKTREE" -b "$BRANCH"
fi

echo
echo "─── 3/4  Replacing $BRANCH contents with dist-static/ ───"
(
  cd "$WORKTREE"
  # Wipe everything except .git
  find . -mindepth 1 -maxdepth 1 -not -name '.git' -exec rm -rf {} +
  # Copy fresh static export
  rsync -aq "$REPO_DIR/dist-static/" ./
  find . -name "._*" -delete 2>/dev/null || true
  git add -A
  if git diff --cached --quiet; then
    echo "(no changes — branch already up to date)"
  else
    git commit -m "Static build from HEAD@${SOURCE_SHA:0:8}

Auto-generated. Do not edit directly.
Regenerate with: bun run deploy:git-static
"
  fi
)

echo
echo "─── 4/4  Pushing + cleaning up ───"
(cd "$WORKTREE" && git push --force-with-lease -u origin "$BRANCH")
git worktree remove --force "$WORKTREE"

echo
echo "✓ Done. Hostinger Git deploy should pull from branch '$BRANCH' (path /)."
echo "  Source: $SOURCE_SHA"
echo "  Live: https://github.com/RizwanZafaris/rizwan-pay-architect/tree/$BRANCH"
