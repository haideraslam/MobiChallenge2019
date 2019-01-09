This is the REST API for OTOZ car sharing

Its built on node.js using the express.js library
For a quick tutorial, referer to node.js official documents: https://www.tutorialspoint.com/nodejs/nodejs_restful_api.htm
For a guideline on how this is containerized: https://nodejs.org/en/docs/guides/nodejs-docker-webapp/


##Run
For the first time on your machine run npm install to downlaod required packages
`npm start`
to start the server

##Configuration
You can set configuration settings in config.js and use them in your node app.

THe  REST server is exposed on port 4010. This can be configured in the config file.

##Containerization

The dockerFile defines a docker image. THe docker image uses base nodejs image and installs your node package dependencies on it by default. If your mode pacakge dependencies have changed, use
`docker build -t innovationlab/carsharingapi .`
to build the docker image with updated dependencies

TO run the REST API in a container, ensure you have built the image, then run:
`docker run -p 4010:4010 -d -v ${pwd}:/usr/src/app --env PEER_ADDRESS=grpc://localhost:7051 --env ORDERER_ADDRESS=grpc://localhost:7050 innovationlab/carsharingapi`

This will launch the container that exposes rest api on 3010 on host machine. 
Ensure you run this from api/carsharing folder.


