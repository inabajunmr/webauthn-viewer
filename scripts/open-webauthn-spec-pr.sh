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

gh auth setup-git --hostname github.com
git add -A -- spec/webauthn-4.json src/webauthnSpecSuggestions.js docs
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
    commit -m "Sync WebAuthn Level 4 specification"
  git push origin "HEAD:refs/heads/$branch"
  head_sha=$(git rev-parse HEAD)
fi

if [[ -z $(jq -r '.number // ""' <<< "$pr") ]]; then
  draft=true
  [[ "$AUTO_MERGE" != true ]] || draft=false
  pr=$(gh api --method POST "$pulls" \
    -f base="$BASE_BRANCH" -f head="$branch" -F draft="$draft" \
    -f title="Sync WebAuthn Level 4 specification" \
    -F body=@"$RUNNER_TEMP/webauthn-spec.md")
fi
url=$(jq -er .html_url <<< "$pr")
number=$(jq -er .number <<< "$pr")
echo "$url" | tee -a "$GITHUB_STEP_SUMMARY"

{
  echo "number=$number"
  echo "commit=$head_sha"
} >> "$GITHUB_OUTPUT"
