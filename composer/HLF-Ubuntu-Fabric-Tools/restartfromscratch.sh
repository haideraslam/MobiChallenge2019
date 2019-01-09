#!/bin/bash
docker kill `docker ps -a -q`
docker rm `docker ps -a -q`
docker rmi $(docker images *peer0*aar*)
echo "======================================"
echo "======================================"
./startFabric.sh
./createbna.sh
./installbna.sh
./startbna.sh $1
./admincardbna.sh
./createParticipants.sh