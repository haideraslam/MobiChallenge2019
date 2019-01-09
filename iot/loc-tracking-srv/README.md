# Local run
`npm start`
This will open a websocket server on localhost:3005 and listen to events from mobi-iot-hub on azure and raise them on websocket

# production run
This application is containerized to support easy production configuration

## Build container image
`docker build -t innovationlab/loctracsrv .`

## Run container image
`docker run -p 3005:3005 --env IOT_HUB_OWNER='iothubowner' --env IOT_HUB_CONN_STR='HostName=iot-hub-mobi.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=lI0xifljYwrDBQnlC3fJshGS/buNxdOTsSDFdjJ5R24=' innovationlab/loctracsrv`

Note the intenal container port is exposed at 3005 for this sample. So the websocket client should listen to 3005 of the host machine this container is running on