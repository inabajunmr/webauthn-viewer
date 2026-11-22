#!/usr/bin/env bash
set -euo pipefail

if [[ "$(git rev-parse HEAD)" != "$DRAFT_COMMIT" ]]; then
  echo "::error::Expected the original specification draft commit."
  exit 1
fi

pr=$(gh api "repos/$GITHUB_REPOSITORY/pulls/$PR_NUMBER")
branch=$(jq -er '.head.ref' <<< "$pr")
if [[ ! "$branch" =~ ^automation/webauthn-spec/[0-9a-f]{16}$ ]] ||
  ! jq -e --arg commit "$DRAFT_COMMIT" --arg repo "$GITHUB_REPOSITORY" \
    '.draft and .state == "open" and .head.sha == $commit and .head.repo.full_name == $repo' \
    <<< "$pr" > /dev/null; then
  echo "::error::The specification draft changed while Codex was running."
  exit 1
fi

git apply --index -- "$1"
index_diff="$RUNNER_TEMP/webauthn-codex-index"
git diff --cached --raw -z --no-renames > "$index_diff"
while IFS= read -r -d '' metadata && IFS= read -r -d '' path; do
  if [[ "$path" == src/webauthnSpecSuggestions.js ||
    ! "$path" =~ ^(src|tests|docs)/ ||
    ! "$metadata" =~ ^:(000000|100644)\ (000000|100644)\  ]]; then
    echo "::error::The Codex patch contains a path or file mode outside the viewer source, tests, and build output."
    exit 1
  fi
done < "$index_diff"

gh auth setup-git --hostname github.com
git -c user.name="WebAuthn spec sync" -c user.email="webauthn-spec-sync@users.noreply.github.com" \
  commit -m "Propose WebAuthn viewer changes with Codex [skip ci]" \
  -m "CI run: $GITHUB_SERVER_URL/$GITHUB_REPOSITORY/actions/runs/$GITHUB_RUN_ID"
git push origin "HEAD:refs/heads/$branch"
echo "commit=$(git rev-parse HEAD)" >> "$GITHUB_OUTPUT"
