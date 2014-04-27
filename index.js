var Crawler = require('./lib/crawler'),
	htmlparser = require('htmlparser2'),
	cheerio = require('cheerio'),
	fs = require('fs');

var options = {

};


fs.readFile('./data/test.html', {encoding: 'utf8'}, function (err, data) {
	if (err) {
		throw err;
	}
	var $ = cheerio.load(data);
	var junk = $('#liIngredient').each(function (idx, elem) {
		console.log($(this).children().find('p').find('span').text());
	});

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
