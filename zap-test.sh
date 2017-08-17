#!/bin/bash
set -x
echo
echo ===========================================================
echo Building containers
echo ===========================================================
echo

docker-compose up -d --build testapp

docker ps -a

curl http://127.0.0.1:3000/private/ping

echo
echo ===========================================================
echo Executing dynamic code analysis
echo ===========================================================
echo

docker run owasp/zap2docker-stable zap-cli active-scan --api-key=false -r http://127.0.0.1:3000/

error() {

  echo ">>>>>> Test Failures Found, exiting test run <<<<<<<<<"

  exit 1
}

cleanup() {

  echo
  echo ===========================================================
  echo Printing logs from APP container
  echo ===========================================================
  echo

  docker logs testapp

  echo
  echo ===========================================================
  echo End of logs from APP container
  echo ===========================================================
  echo

  echo "....Cleaning up"

  docker stop $(docker ps -a -q)
  docker rm $(docker ps -a -q)
}
trap error ERR
trap cleanup EXIT

ifne () {
  read line || return 1
  (echo "$line"; cat) | eval "$@"
}
