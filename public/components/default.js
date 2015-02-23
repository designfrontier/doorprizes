(function (win, doc) {
	'use strict';

	doc.addEventListener('DOMContentLoaded', function () {
		var button = doc.querySelector('#submit');

		button.onclick = function (event) {
				var token = doc.querySelector('#token').value
					, eventId = doc.querySelector('#event').value;

			event.preventDefault();

			win.location.pathname = '/random/' + eventId + '/' + token;
		};

		doc.removeEventListener('DOMContentLoaded');
	});

})(window, document);