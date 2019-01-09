#!/bin/bash
docker-compose down
docker build -t innovationlab/loctracsrv loc-tracking-srv
docker build -t innovationlab/simulateddevice vehicle-simulator
docker build -t innovationlab/chaintodevice chain-to-device
docker-compose up -d
