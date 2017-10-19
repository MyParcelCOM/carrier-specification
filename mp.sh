#!/usr/bin/env bash
set -eo pipefail

# init environment variables
set -o allexport
{
  ROOT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
  ${ROOT_DIR}/mp/helpers/check-env
  source ${ROOT_DIR}/.env
  COMPOSE="docker-compose --project-name ${PROJECT_NAME}"
  RUNNING=$(${COMPOSE} ps -q)
}
set +o allexport

# run commands
if [ $# -gt 0 ]; then
  if [ -f "mp/$1" ]; then
    SCRIPT="$1"
    shift 1
    ${ROOT_DIR}/mp/${SCRIPT} "$@"
  else
    ${COMPOSE} "$@"
  fi
else
  ${COMPOSE} ps
fi
