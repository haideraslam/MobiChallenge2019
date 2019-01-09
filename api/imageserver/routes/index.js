var express = require('express');
var path = require('path');
var router = express.Router();

router.get('/', function (request, response) {
  response.send('Image Server up!');
});

router.get('/pick-up', function (request, response) {
  response.sendFile('pickup.html', {root: path.join(__dirname, '../public/html')});
});

router.get('/drop-off', function (request, response) {
  response.sendFile('dorpoff.html', {root: path.join(__dirname, '../public/html')});
});

router.get('/dashboard', function (request, response) {
  response.sendFile('dashboard.html', {root: path.join(__dirname, '../public/html')});
});

module.exports = router;