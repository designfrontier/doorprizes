var events = require('monument').events;


events.on('route:/random/:eventid:get', function (connection) {
	'use strict';
	
	connection.res.end('route /random/:eventid now responding to get requests');
});