#!/bin/bash
source envvarsprod.txt
composer-rest-server -c admin@aar -m true -a true -n always -w
