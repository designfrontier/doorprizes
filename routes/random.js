var events = require('monument').events
	, pkg = require('../package.json')
	, getRandomInt = function (min, max) {
		'use strict';

		return Math.floor(Math.random() * (max - min)) + min;
	}
	, template = require('../templates/random');


events.on('route:/random/:eventid:get', function (connection) {
	'use strict';

	var filteredAttendees = []
		, randomAttendee;

	events.once('data:set:attendees:' + connection.params.eventid, function (attendees) {
		if(typeof attendees === 'string' && attendees === 'false'){
			events.emit('error:500', {connection: connection, message: 'There was a problem with eventbrite'});
		} else {
			filteredAttendees = attendees.filter(function (attendee) {
				return attendee.checked_in === true;
			});

			randomAttendee = filteredAttendees[getRandomInt(0, filteredAttendees.length)];

			connection.res.end(template(randomAttendee.profile));
		}

	});

	events.emit('data:get:attendees', {eventid: connection.params.eventid, token: pkg.config['oauth-token']});
});