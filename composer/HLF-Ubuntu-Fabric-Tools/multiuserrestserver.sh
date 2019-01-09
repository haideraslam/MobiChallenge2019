#!/bin/bash
source envvars.txt
composer-rest-server -c admin@aar -m true -a true -w
