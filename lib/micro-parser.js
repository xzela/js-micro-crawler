var events = require('events'),
	cheerio = require('cheerio'),
	util = require('util');


function MicroParser(schema, options) {
	var _self = this;
	events.EventEmitter.call(this);
	// test for schema and true object
	if (schema === undefined || Object.prototype.toString.call(schema) !== "[object Object]" || Object.keys(schema).length <= 0) {
		throw new Error("A schema Object is required!");
	}
	this.schema = schema;

	this.loadData = function (data) {
		if (data === undefined || data === '') {
			throw new Error("Data was empty or undefined");
		}
		this.data = data;
		this.$ = cheerio.load(this.data);
	};

	this.parseName = function () {
		var $ = this.$,
			nodes,
			name;
		if (_self.schema.name.id !== undefined) {
			name = $('#' + _self.schema.name.id).text();
		} else {
			$('.' + _self.schema.name.class).children().each(function (idx, elm) {
				if ($(this).attr('itemprop') === _self.schema.name.itemprop) {
					name = $(this).text();
				}
			});
		}
		return name;
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
		var $ = this.$,
			description,
			elm;
		if (_self.schema.description.id !== undefined) {
			description = $('#' + _self.schema.description.id).text();
		} else {
			elm = $('.' + _self.schema.description.class);
			if (elm.attr('itemprop') === _self.schema.description.itemprop) {

			}
		}

		return description;
	};

	this.parseDirections = function () {
		var $ = this.$,
			directions = [],
			elm;
		if (_self.schema.directions.id !== undefined) {
			elm = $('#' + _self.schema.directions.id);
		} else {
			elm = $('.' + _self.schema.directions.class);
		}

		elm.find(_self.schema.directions.elm).children().each(function (idx, elm2) {
			directions.push($(this).text());
		});
		return directions;
	};
}

// Inherit the EventEmitter prototype
util.inherits(MicroParser, events.EventEmitter);
module.exports = MicroParser;
