var express = require('express');
const config = require('./config');

var app = express();

var server = app.listen(config.port, function () {
   var port = server.address().port

   require('./routes')(app);
   
   console.log("OTOZ asset registry listening at %s", port)
})
