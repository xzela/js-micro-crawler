var events = require('events'),
	cheerio = require('cheerio'),
	util = require('util');


function MicroParser(schema, options) {
	var _self = this;
	events.EventEmitter.call(this);
	if (schema === undefined) {
		throw new Error("schema option is required!");
	}
	this.schema = schema;

	this.loadData = function (data) {
		this.data = data;
		this.$ = cheerio.load(this.data);
	};

	this.parseIngredients = function () {
		var $ = this.$;
		var ingredients = [];
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
		return ingredients;
	};

	this.parseDescription = function () {
		var $ = this.$;
		var description = '';
		description = $('#' + _self.schema.description.id).text();

		return description;
	};

	this.parseDirections = function () {
		var $ = this.$;
		var directions = [];
		var elm = $('.' + _self.schema.directions.class);
		elm.find(_self.schema.directions.elm).children().each(function (idx, elm2) {
			directions.push($(this).text());
		});
		return directions;
	};
}

// Inherit the EventEmitter prototype
util.inherits(MicroParser, events.EventEmitter);
module.exports = MicroParser;
