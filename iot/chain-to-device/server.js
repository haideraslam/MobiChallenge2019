
const WebSocket = require('ws');
var Client = require('azure-iothub').Client;
var Message = require('azure-iot-common').Message;

var connectionString = process.env.IOT_HUB_CONN_STR || 'HostName=iot-hub-mobi.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=lI0xifljYwrDBQnlC3fJshGS/buNxdOTsSDFdjJ5R24=';
var serviceClient = Client.fromConnectionString(connectionString);

// Connect to the service-side endpoint on your IoT hub.
var client = Client.fromConnectionString(connectionString);

// Websocket client for monitoring Blockchain events
var wsServerUrl = process.env.WS_SERVER_URL || 'ws://localhost:3000';
var connection = new WebSocket(wsServerUrl);

connection.onopen = function () {
  console.log("Listening for blockchain events: " + wsServerUrl);
};

// Log errors
connection.onerror = function (error) {
  console.error('WebSocket Error ' + JSON.stringify(error));
};


connection.onmessage = function (e) {
  var eventData = JSON.parse(e.data);
  if(eventData.$class.endsWith('.CarLock') || eventData.$class.endsWith('.CarUnlock'))
  {
    sendMessageToDeviceAsync(eventData.vin, eventData.$class, eventData.contractId);
  }
};

sendMessageToDeviceAsync = function (vin, eventType, contractId) {

   var remoteMethod = eventType.endsWith('.CarUnlock') ? 'Unlock' : 'Lock';

  // Set the direct method name, payload, and timeout values
  var methodParams = {
    methodName: remoteMethod,
    payload: contractId, // Number of seconds.
    responseTimeoutInSeconds: 30
  };
    
  // Call the direct method on vehicle using the defined parameters.
  client.invokeDeviceMethod(vin, methodParams, function (err, result) {
    if (err) {
        console.error('Failed to invoke method \'' + methodParams.methodName + '\': ' + err.message);
    } else {
      //console.log('Response from ' + methodParams.methodName + ' on ' + vin + ':');
      if(result.payload && result.payload.result)
      {
        var color = result.status == 200 ? '\x1b[32m' : '\x1b[31m';
        console.log(color, vin + ': ' + methodParams.methodName + ': ' + result.payload.result);
      }
      else
      {
        console.log('Response from ' + methodParams.methodName + ' on ' + vin + ':');
        console.log(JSON.stringify(result, null, 2));
      }
    }
  });
}