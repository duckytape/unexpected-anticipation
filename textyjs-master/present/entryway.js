//Entryway objects

//hatrack
define(function () {

	exports = {}

	exports.addhat = function (interface, options, callback) {

		interface.players.removeObject('hat', 1);
		interface.object.setAttribute('hatrack', true);
		interface.objects.setDescription('hatrack', 'A wooden hat rack, with four ornately carved hat arms to place hats; one of which is occupied by a hat.');
		callback('You add the hat to the rack. There, now it looks like a much more useful hatrack.'); 
		// Perhaps add custom text section to the templates and call it based on rendered text from this?

	}


	return exports;

});

define(function () {

	exports = {}

	exports.takehat = function (interface, options, callback) {

		interface.object.setAttribute('hat', false);
		interface.players.addObject('hat', 1);
		interface.objects.setDescription('hatrack', 'A wooden hat rack, with four ornately carved hat arms to place hats. It looks a bit naked.');
		callback('You take the dashing hat, leaving the hatrack naked.'); // Perhaps add custom text section to the templates and call it based on rendered text from this?

	}

	return exports;

});