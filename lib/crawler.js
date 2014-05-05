var events = require('events'),
	util = require('util'),
	requests = require('request');

function Crawler(options) {
	var _self = this;
	events.EventEmitter.call(this);

	this.init = function () {
		// console.log("init was run!");
	};

	this.on("set:url", function (url) {
		// console.log("I have set a url: " + url);
	});

	this.fetch = function () {
		var _options = {
			url: this.url
		};
		var r = requests.get(_options, function (err, response, body) {
			if (err) {
				_self.emit("fetch:error", err);
			} else {
				_self.emit("fetch:success", body);
			}
		});
	};
}

// Inherit the EventEmitter prototype
util.inherits(Crawler, events.EventEmitter);

Crawler.prototype.setUrl = function (url) {
	this.url = url;
	this.emit("set:url", url);
};


module.exports = Crawler;
