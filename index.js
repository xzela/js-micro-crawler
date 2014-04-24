var Crawler = require('./lib/crawler');

var options = {

};

crawler = new Crawler(options);
console.dir(crawler);
crawler.init();
crawler.setUrl("http://allrecipes.com/Recipe/Almond-Lemon-Chicken/Detail.aspx");
console.log(crawler.url);

crawler.on("fetch:success", function (res) {
	console.log(res);
});

crawler.on("fetch:error", function (error) {
	console.log(error);
});

crawler.fetch();
