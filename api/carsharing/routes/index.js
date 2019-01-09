var path = require('path');
var util = require('util');
var os = require('os');
var fs = require('fs');
const config = require('../config');


module.exports = function(app) {

	app.get('/', function (req, res) {
		res.send('Hello from REST Server for car sharing API~~');
	 });
};    