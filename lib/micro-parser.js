var events = require('events'),
	cheerio = require('cheerio'),
	util = require('util');


function MicroParser(options) {
	var _self = this;
	events.EventEmitter.call(this);

	this.schema = options.schema;

	this.loadData = function (data) {
		this.data = data;
	};

	this.parseIngredients = function () {
		var ingredients = [];
		var $ = cheerio.load(this.data);
		$('#' + _self.schema.ingredients.id).each(function (idx, elem) {
			var ingredient = {};
			$(this).children().find('span').each(function (idx2, elem2) {
				if ($(this).hasClass(_self.schema.ingredients.name.class)) {
					ingredient['ingredient'] = $(this).text();
				}
				if ($(this).hasClass(_self.schema.ingredients.amount.class)) {
					ingredient['amount'] = $(this).text();
				}
			});
			ingredients.push(ingredient);
		});
		console.log(ingredients);
	};
}

// Inherit the EventEmitter prototype
util.inherits(MicroParser, events.EventEmitter);
module.exports = MicroParser;
