#!/bin/bash
# wait-for-it.sh

TIMEOUT=15
QUIET=0

WAITFORIT_HOST="${1}"
WAITFORIT_PORT="${2}"
shift 2

while :; do
  case "$1" in
    -q | --quiet)
      QUIET=1
      shift 1
      ;;
    *) break ;;
  esac
done

WAITFORIT_TIMEOUT=${TIMEOUT}
WAITFORIT_BUSYTIMEFLAG=""

if ! command -v nc >/dev/null; then
  yum install -y nc
fi

WAITFORIT_START_TS=$(date +%s)
while :; do
  if [[ $(($(date +%s) - $WAITFORIT_START_TS)) -gt $WAITFORIT_TIMEOUT ]]; then
    echo "timeout occurred after waiting $WAITFORIT_TIMEOUT seconds for $WAITFORIT_HOST:$WAITFORIT_PORT"
    exit 1
  fi
  
  nc -z "$WAITFORIT_HOST" "$WAITFORIT_PORT" > /dev/null 2>&1
  
  result=$?
  if [[ $result -eq 0 ]]; then
    if [[ $# -gt 0 ]]; then
      exec "$@"
    fi
    exit 0
  fi
  sleep 1
done 