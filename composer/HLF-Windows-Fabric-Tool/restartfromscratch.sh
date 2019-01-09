#!/bin/bash
docker kill `docker ps -a -q`
docker rm `docker ps -a -q`
docker rmi $(docker images *peer*aar*)
echo "======================================"
echo "======================================"
PACKAGE_VER=$(node -p -e "require('../Network/aar/package.json').version")
echo $PACKAGE_VER
./startFabric.sh
./createbna.sh
./installbna.sh
./startbna.sh $PACKAGE_VER
./startbna.sh $PACKAGE_VER
./admincardbna.sh
./createParticipants.sh
node ../Network/aar/startup/bulkupload.js true 10