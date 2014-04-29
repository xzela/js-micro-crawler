var events = require('events'),
	util = require('util'),
	requests = require('request'),
	htmlparser = require('htmlparser2');

function Crawler(options) {
	var _self = this;
	events.EventEmitter.call(this);

	this.init = function () {
		console.log("init was run!");
	};

	this.on("set:url", function (url) {
		console.log("I have set a url: " + url);
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

	function _parse(body) {
		var parser = new htmlparser.Parser({
			onattribute: function (name, value) {
				if (name === 'itemprop' && value === 'ingredients') {
					console.log(name, value);
					_self.emit('parse:success');
				}
			}
		});
		parser.write(body);
		parser.end();
		// self.emit('fetch:success', body);
	}

	this.on("fetch:fetched", _parse);
}

// Inherit the EventEmitter prototype
util.inherits(Crawler, events.EventEmitter);

Crawler.prototype.setUrl = function (url) {
	this.url = url;
	this.emit("set:url", url);
};


module.exports = Crawler;
