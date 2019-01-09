#!/bin/bash
STARTTIME=$(date +%s)
composer network start -c PeerAdmin@hlfv1 -n aar -V $1 -A admin -S adminpw
ENDTIME=$(date +%s)
echo "It took $(($ENDTIME - $STARTTIME)) seconds to complete network start..."