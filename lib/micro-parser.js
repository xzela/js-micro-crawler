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
		if (_self.schema.ingredients.name !== undefined) {
			$(_self.schema.ingredients.name.xpath).each(function () {
				var ingredient = {};
				ingredient['ingredient'] = $(this).text();
				if (_self.schema.ingredients.amount !== undefined) {
					ingredient['amount'] = $(this).siblings(_self.schema.ingredients.amount.xpath).text();
				}
				ingredients.push(ingredient);
			});
		}
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

	/**
	 * [parseDirections description]
	 *
	 * @return {[type]} [description]
	 */
	this.parseDirections = function () {
		var $ = this.$,
			directions = [],
			elm;
		$(_self.schema.directions.direction.xpath).each(function () {
			directions.push($(this).text());
		});
		return directions;
	};
}

// Inherit the EventEmitter prototype
util.inherits(MicroParser, events.EventEmitter);
module.exports = MicroParser;
