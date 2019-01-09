#!/bin/bash
STARTTIME=$(date +%s)
composer archive create -t dir -n ../Network/aar -a aar.bna
ENDTIME=$(date +%s)
echo "It took $(($ENDTIME - $STARTTIME)) seconds to complete archive create..."