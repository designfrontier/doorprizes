var events = require('monument').events
	, eventBrite = require('node-eventbrite')
	, cache = require('../utils/cache')

	, sendData = function (eventid, checkedIn) {
		'use strict';

		events.emit('data:set:attendees:' + eventid, checkedIn);
		cache.add('attendees:' + eventid, checkedIn, 7200000);
	}

	, attendeeError = function (eventid) {
		'use strict';

		events.emit('data:set:attendees:' + eventid, 'error');
	};

events.on('data:get:attendees', function (eventObj) {
	'use strict';
	var api = eventBrite({
		token: eventObj.token
		, version: 'v3'
	});

	if(cache.get('attendees:' + eventObj.eventid)){
		events.emit('data:set:attendees:' + eventObj.eventid, cache.get('attendees:' + eventObj.eventid));
	} else {
		api.event_attendees({'event_id': eventObj.eventid}, function (error, data) {
			var i = 0
				, checkedIn;

			if(error) {
				attendeeError(eventObj.eventid);
			} else {
				checkedIn = data.attendees;

				if(data.pagination.page_count > 1){
					//we need to request the rest of these people

					for (i = 0; i < data.pagination.page_count; i++) {
						api.event_attendees({'event_id': eventObj.eventid, }, function (error, dataIn) {
							checkedIn = [].concat(checkedIn, dataIn.attendees);

							if(i === data.pagination.page_count){
								//we are done here...
								sendData(eventObj.eventid, checkedIn);
							}
						});
					}
				} else {
					sendData(eventObj.eventid, checkedIn);
				}
			}
		});
	}

	cache.prune(0);
});