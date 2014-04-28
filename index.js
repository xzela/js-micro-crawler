var Crawler = require('./lib/crawler'),
	MicroParser = require('./lib/micro-parser'),
	allrecipes = require('./schemas/allrecipes.json'),
	htmlparser = require('htmlparser2'),
	cheerio = require('cheerio'),
	fs = require('fs');

var options = {

};


fs.readFile('./data/test.html', {encoding: 'utf8'}, function (err, data) {
	if (err) {
		throw err;
	}
	var mp = new MicroParser({schema: allrecipes});
	// console.dir(mp);
	mp.loadData(data);
	mp.parseIngredients();
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

// crawler = new Crawler(options);
// console.dir(crawler);
// crawler.init();
// crawler.setUrl("http://allrecipes.com/Recipe/Almond-Lemon-Chicken/Detail.aspx");
// console.log(crawler.url);

// crawler.on("fetch:success", function (res) {
// 	console.log(res);
// });

// crawler.on("fetch:error", function (error) {
// 	console.log(error);
// });

// crwaler.on('parse:success', function (data) {

// });

// crawler.fetch();
