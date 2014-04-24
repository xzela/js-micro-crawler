var events = require('events'),
	util = require('util');

function Crawler(options) {
	var self = this;
	events.EventEmitter.call(this);

	this.init = function () {
		console.log("init was run!");
	};

	this.on("set:url", function (url) {
		console.log("I have set a url: " + url);
	});
}
// Inherit the EventEmitter prototype
util.inherits(Crawler, events.EventEmitter);

Crawler.prototype.setUrl = function (url) {
	this.url = url;
	this.emit("set:url", url);
};


module.exports = Crawler;
