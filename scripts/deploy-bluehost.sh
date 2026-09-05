#!/usr/bin/env bash
#
# Deploy to Bluehost from your machine, using the same sync engine as CI
# (@samkirkland/ftp-deploy, which the GitHub Action wraps).
#
#   ./scripts/deploy-bluehost.sh          dry run — connects, diffs, changes nothing
#   ./scripts/deploy-bluehost.sh --live   actually uploads
#
# Reads credentials from .env.deploy (gitignored). See .env.deploy.example.

set -euo pipefail

cd "$(dirname "$0")/.."

ENV_FILE=".env.deploy"
LIVE=false
[[ "${1:-}" == "--live" ]] && LIVE=true

if [[ ! -f "$ENV_FILE" ]]; then
	echo "error: $ENV_FILE not found."
	echo "       cp .env.deploy.example $ENV_FILE   then fill it in."
	exit 1
fi

# shellcheck disable=SC1090
set -a; source "$ENV_FILE"; set +a

missing=()
for var in FTP_SERVER FTP_USERNAME FTP_PASSWORD FTP_REMOTE_DIR SITE_URL; do
	[[ -z "${!var:-}" ]] && missing+=("$var")
done
if (( ${#missing[@]} )); then
	echo "error: missing in $ENV_FILE: ${missing[*]}"
	exit 1
fi

echo "==> Building for ${SITE_URL} at the domain root"
SITE="$SITE_URL" BASE_PATH=/ npm run build

echo
echo "==> Verifying the build"
BASE_PATH=/ npx vitest run tests/build

echo
if $LIVE; then
	echo "==> UPLOADING to ${FTP_SERVER}${FTP_REMOTE_DIR}"
else
	echo "==> DRY RUN against ${FTP_SERVER}${FTP_REMOTE_DIR} (nothing will change)"
	echo "    re-run with --live to upload"
fi
echo

args=(
	--server "${FTP_PROTOCOL:-ftps}://${FTP_SERVER}"
	--username "$FTP_USERNAME"
	--password "$FTP_PASSWORD"
	--port "${FTP_PORT:-21}"
	--local-dir ./dist/
	--server-dir "$FTP_REMOTE_DIR"
	--log-level "${FTP_LOG_LEVEL:-standard}"
	--exclude "**/.git*" "**/.git*/**" "**/node_modules/**"
)
$LIVE || args+=(--dry-run)

npx --yes @samkirkland/ftp-deploy@1.2.5 "${args[@]}"

echo
if $LIVE; then
	echo "==> Done. Checking ${SITE_URL} ..."
	code=$(curl -s -o /dev/null -w '%{http_code}' "$SITE_URL" || echo "000")
	echo "    GET ${SITE_URL} -> ${code}"
else
	echo "==> Dry run complete. Nothing was uploaded."
fi
