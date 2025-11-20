#!/usr/bin/env bash
set -euo pipefail
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
export ENV_DIR_PATH="$ROOT_DIR"
export APP_ENV=deepeval
export PATH="$HOME/Library/Python/3.9/bin:$PATH"

DEEPEVAL_BIN="$HOME/Library/Python/3.9/bin/deepeval"
if [ ! -x "$DEEPEVAL_BIN" ]; then
  if command -v deepeval >/dev/null 2>&1; then
    DEEPEVAL_BIN="$(command -v deepeval)"
  else
    echo "deepeval CLI not found in PATH" >&2
    exit 1
  fi
fi

if [ "${1:-}" = "" ]; then
  set -- --help
fi

exec "$DEEPEVAL_BIN" "$@"
