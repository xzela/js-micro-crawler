var Crawler = require('./lib/crawler'),
	MicroParser = require('./lib/micro-parser'),
	allrecipes = require('./schemas/allrecipes.json'),
	foodnetwork = require('./schemas/foodnetwork.json'),
	htmlparser = require('htmlparser2'),
	cheerio = require('cheerio'),
	fs = require('fs');

var options = {

};


fs.readFile('./data/foodnetwork.html', {encoding: 'utf8'}, function (err, data) {
	if (err) {
		throw err;
	}
	// var mp = new MicroParser(allrecipes, {});
	var mp = new MicroParser(foodnetwork, {});
	// console.dir(mp);
	mp.loadData(data);
	console.log(mp.parseName());
	// console.log(mp.parseIngredients());
	// console.log(mp.parseDescription());
	// console.log(mp.parseDirections());
	// var ingredients = [];
	// var $ = cheerio.load(data);
	// $('#' + allrecipes.ingredients.id).each(function (idx, elem) {
	// 	var ingredient = {};
	// 	$(this).children().find('span').each(function (idx2, elem2) {
	// 		if ($(this).hasClass(allrecipes.ingredients.name.class)) {
	// 			ingredient['name'] = $(this).text();
	// 		}
	// 		if ($(this).hasClass(allrecipes.ingredients.amount.class)) {
	// 			ingredient['amount'] = $(this).text();
	// 		}
	// 	});
	// 	ingredients.push(ingredient);
	// });
	// console.log(ingredients);

});

crawler = new Crawler(options);
// console.dir(crawler);
crawler.init();
crawler.setUrl("http://allrecipes.com/Recipe/Brooklyn-Girls-Penne-Arrabiata/Detail.aspx");
// console.log(crawler.url);

crawler.on("fetch:success", function (res) {
	// console.log(res);
	var mp = new MicroParser(allrecipes, {});
	// console.dir(mp);
	mp.loadData(res);
	console.log(mp.parseIngredients());
	console.log(mp.parseDescription());
	console.log(mp.parseDirections());

});

// crawler.on("fetch:error", function (error) {
// 	console.log(error);
// });

// crwaler.on('parse:success', function (data) {

// });

// crawler.fetch();
