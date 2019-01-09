#!/bin/bash
docker-compose down
docker build -t innovationlab/composerrestserver .
docker-compose up -d
