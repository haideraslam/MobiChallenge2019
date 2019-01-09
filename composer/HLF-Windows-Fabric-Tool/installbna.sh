#!/bin/bash
STARTTIME=$(date +%s)
composer network install -a aar.bna -c PeerAdmin@hlfv1
ENDTIME=$(date +%s)
echo "It took $(($ENDTIME - $STARTTIME)) seconds to complete network install..."