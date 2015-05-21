var events = require('monument').events
	, getRandomInt = function (min, max) {
		'use strict';

		return Math.floor(Math.random() * (max - min)) + min;
	}
	, template = require('../templates/random')
    , doorPrized = []

    , Random = require('random-js');


events.on('route:/random/:eventid/:tokenid:get', function (connection) {
	'use strict';

	var filteredAttendees = []
		, randomAttendee
        , attendeeIds = [];

	events.once('data:set:attendees:' + connection.params.eventid, function (attendees) {
        // create a Mersenne Twister-19937 that is auto-seeded based on time and other random values
        var engine = Random.engines.mt19937().autoSeed()
            , distribution
            ,  generateNatural = function () {
              return distribution(engine);
            };

		if(typeof attendees !== 'object' || !Array.isArray(attendees)){
			events.emit('error:500', {connection: connection, message: 'There was a problem with eventbrite'});
		} else {
			filteredAttendees = attendees.filter(function (attendee) {
                if(attendeeIds.indexOf(attendee.id) === -1){
                    attendeeIds.push(attendee.id);

				    return attendee.checked_in === true && doorPrized.indexOf(attendee.id) === -1;
                } else {
                    return false;
                }
			});

            distribution = Random.integer(0, filteredAttendees.length -1);

			randomAttendee = filteredAttendees[generateNatural()];

            if(typeof randomAttendee !== 'undefined'){
                doorPrized.push(randomAttendee.id);

    			connection.res.end(template(randomAttendee.profile));
            } else {
                doorPrized = [];
                connection.res.end(template({name: 'No More Random Attendees. Resetting...'}));
            }
		}

	});

	events.emit('data:get:attendees', {eventid: connection.params.eventid, token: connection.params.tokenid});
});
