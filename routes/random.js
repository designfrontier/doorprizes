var events = require('monument').events
	, getRandomInt = function (min, max) {
		'use strict';

		return Math.floor(Math.random() * (max - min)) + min;
	}
	, template = require('../templates/random');


events.on('route:/random/:eventid/:tokenid:get', function (connection) {
	'use strict';

	var filteredAttendees = []
		, randomAttendee;

	events.once('data:set:attendees:' + connection.params.eventid, function (attendees) {
		if(typeof attendees !== 'object' || !Array.isArray(attendees)){
			events.emit('error:500', {connection: connection, message: 'There was a problem with eventbrite'});
		} else {
			filteredAttendees = attendees.filter(function (attendee) {
				return attendee.checked_in === true;
			});

			randomAttendee = filteredAttendees[getRandomInt(0, filteredAttendees.length)];

			connection.res.end(template(randomAttendee.profile));
		}

	});

	events.emit('data:get:attendees', {eventid: connection.params.eventid, token: connection.params.tokenid});
});