// Require available modules here, before anything else
define(function () {

	exports = {}

	exports.extinguishFireplace = function (interface, options, callback) {

		interface.objects.setDescription('fireplace', 'A lovely warming hearth with a recently extinguished small fire.');
		interface.objects.setAttributes('fireplace', false);
		callback('You stomp on the fire, putting the flames out.'); // Perhaps add custom text section to the templates and call it based on rendered text from this?

	}

	return exports;

});

define(function () {

	exports = {}

	exports.takeFromDisplay = function (interface, options, callback) {

		interface.players.addObject('plate', 1);
		interface.objects.setDescription('displaycase', 'A glass and wooden display case, recently raided.');
		interface.objects.setAttributes('displaycase', false);
		callback('You carefully open the case and take it\'s contents.'); // Perhaps add custom text section to the templates and call it based on rendered text from this?

	}

	return exports;

});

