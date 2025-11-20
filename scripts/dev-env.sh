#!/usr/bin/env bash
# Source this script to prime PATH + DeepEval env while keeping secrets out of git
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
  echo "Please source this script: source scripts/dev-env.sh" >&2
  exit 1
fi

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
export PATH="$HOME/Library/Python/3.9/bin:$PATH"
export ENV_DIR_PATH="$ROOT_DIR"
export APP_ENV=${APP_ENV:-development}
cat <<MSG
Dev environment primed.
- Added ~/Library/Python/3.9/bin to PATH
- ENV_DIR_PATH -> $ROOT_DIR (deepeval reads .env.* from repo)
Set APP_ENV=deepeval before running scripts/run-deepeval-local.sh if you want offline evaluation.
MSG
