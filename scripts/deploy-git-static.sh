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

echo "─── 1/4  Rebuilding dist-static/ ───"
# CI builds + gates dist-static in its own steps and sets SKIP_REBUILD=1.
if [ "${SKIP_REBUILD:-}" = "1" ]; then
  echo "(SKIP_REBUILD=1 — using existing dist-static/)"
else
  bun run build:static
fi
find dist-static -name "._*" -delete 2>/dev/null || true

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
    SRC_SHA=$(cd "$REPO_DIR" && git rev-parse --short HEAD)
    git commit -m "Static build from HEAD@$SRC_SHA

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
echo "  Live: https://github.com/RizwanZafaris/rizwan-pay-architect/tree/$BRANCH"
