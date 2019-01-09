#!/bin/bash
source envvarsaar.txt
composer-rest-server -c admin@aar -m true -a true -n always -w -p 3002
