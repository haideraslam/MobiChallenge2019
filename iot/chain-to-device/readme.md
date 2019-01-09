# Local run
`npm start`
This will open a websocket client  and listen to events from composer-rest-server

# production run
This application is containerized to support easy production configuration

## Build container image
`docker build -t innovationlab/chaintodevice .`


## Run container image
Set the value to WS_SERVER_URL to websocket path of your multiuser-rest-server
When running the rest-server on your local machine WS_SERVER_URL='ws://host.docker.internal:3000'. This will ensure the container accesses the application running on your host(docker demon host is bypassed for for windows - which is good)

So, here are sample runs:
### With rest server on local machine:
`docker run --env WS_SERVER_URL='ws://localhost:3000' innovationlab/chaintodevice`

### With rest server on dev server
`docker run --env WS_SERVER_URL='ws://aarvm-dev.westeurope.cloudapp.azure.com:3000' innovationlab/chaintodevice`

Also make sure that your composer rest server was started with -w switch so its websocket server is running.