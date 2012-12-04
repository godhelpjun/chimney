var ansiHelper = require('./ansiHelper'),
	fire = require('./fire'),

	// Color chart:
	// http://upload.wikimedia.org/wikipedia/commons/9/95/Xterm_color_chart.png
	FIRE_COLORS = [124, 196, 202, 208, 214, 220, 226],
	MAXIMUM_INTENSITY = 10,
	remainingLogs;

fire.init({
	width: 40,
	height: 15,
	maxIntensity: MAXIMUM_INTENSITY,
	iterationInterval: 100,
	consumeInterval: 1000,
	ascii: [' ', '.', ':', '*', 's', 'S', '#', '$'].map(function(char, index) {
		if (!index) return char;
		return ansiHelper.bgColor(FIRE_COLORS[index-1], char);
	})
});

var consumeLog = function consumeLog() {
	if (remainingLogs > 0) {
		remainingLogs -= 1;
		console.log("consume log");

		if (remainingLogs <= MAXIMUM_INTENSITY) {
			fire.setIntensity(remainingLogs);
		}
	}
}

// Starts the fireplace by placing the logs gently in the
// niche.
//
// Use something that burns well first, like paper,
// to create a good looking flame. You don't want to add
// all the logs at once; this would likely prevent the fire
// to start.
//
// Once this is done, start putting the first log.
// Wait until the fire has taken before adding the next one.
//
// Or more easily, call this function passing it the number of
// logs to consume.
//
// logs			- The number of logs to consume.
//
// renderer - The rendering callback. Called with the ANSI escaped
//						String representing the current fire animation.
//
// Returns nothing.
var burnLogs = function burnLogs(logs, renderer) {
	remainingLogs = logs

	fire.startFire({
		consume:	consumeLog,
		renderer: renderer
	});
};

module.exports = {
	// setRenderer: setRenderer,
	burnLogs:		 burnLogs
}
