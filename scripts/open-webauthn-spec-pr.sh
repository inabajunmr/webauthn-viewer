#!/usr/bin/env bash
set -euo pipefail

branch="automation/webauthn-spec/$SPEC_DIGEST"
pulls="repos/$GITHUB_REPOSITORY/pulls"
pr=$(gh api --method GET "$pulls" -f head="$GITHUB_REPOSITORY_OWNER:$branch" \
  -f base="$BASE_BRANCH" -f state=all --jq '.[0]')
if [[ $(jq -r '.state // ""' <<< "$pr") == closed ]]; then
  echo "There is already a closed PR for this spec snapshot."
  exit 0
fi

git apply --index -- "$1"
index_diff="$RUNNER_TEMP/webauthn-codex-index"
git diff --cached --raw -z --no-renames > "$index_diff"
while IFS= read -r -d '' metadata && IFS= read -r -d '' path; do
  if [[ ( "$path" != spec/webauthn-4.json && ! "$path" =~ ^(src|tests|docs)/ ) ||
    ! "$metadata" =~ ^:(000000|100644)\ (000000|100644)\  ]]; then
    echo "::error::The Codex patch contains a path or file mode outside the viewer source, tests, specification snapshot, and build output."
    exit 1
  fi
done < "$index_diff"

if git diff --cached --quiet -- src; then
  echo "The patch contains no viewer changes."
  exit 0
fi

draft=true
if [[ "$CANDIDATE_ADDITIONS" == true ]] &&
  git diff --cached --quiet -- src tests ':!src/webauthnSpecSuggestions.js'; then
  draft=false
fi

gh auth setup-git --hostname github.com
if git ls-remote --exit-code --heads origin "refs/heads/$branch" > /dev/null; then
  git fetch --no-tags origin "refs/heads/$branch"
  if ! git diff --cached --quiet FETCH_HEAD --; then
    echo "The existing update branch has different content. Leaving it for review."
    exit 0
  fi
  head_sha=$(git rev-parse FETCH_HEAD)
else
  result=$?
  if [[ "$result" != 2 ]]; then
    exit "$result"
  fi
  git -c user.name="WebAuthn spec sync" -c user.email="webauthn-spec-sync@users.noreply.github.com" \
    commit -m "Update WebAuthn Level 4 viewer with Codex [skip ci]"
  git push origin "HEAD:refs/heads/$branch"
  head_sha=$(git rev-parse HEAD)
fi

if [[ -z $(jq -r '.number // ""' <<< "$pr") ]]; then
  body="Reviewed the [W3C WebAuthn Level 4 publication]($SPEC_PUBLICATION) with Codex.

The implementation, tests, and public build are in the diff. See the [workflow run]($GITHUB_SERVER_URL/$GITHUB_REPOSITORY/actions/runs/$GITHUB_RUN_ID) for the Codex assessment and CI results."
  pr=$(gh api --method POST "$pulls" \
    -f base="$BASE_BRANCH" -f head="$branch" -F draft="$draft" \
    -f title="Update WebAuthn Level 4 viewer with Codex" \
    -f body="$body")
fi
url=$(jq -er .html_url <<< "$pr")
number=$(jq -er .number <<< "$pr")
auto_merge=false
if [[ "$draft" == false ]] && jq -e '.draft == false' <<< "$pr" > /dev/null; then
  auto_merge=true
fi
echo "$url" | tee -a "$GITHUB_STEP_SUMMARY"

{
  echo "number=$number"
  echo "commit=$head_sha"
  echo "auto_merge=$auto_merge"
} >> "$GITHUB_OUTPUT"
