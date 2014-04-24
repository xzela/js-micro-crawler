var Crawler = require('./lib/crawler');

var options = {

};

crawler = new Crawler(options);
console.dir(crawler);
crawler.init();
console.log(crawler.url);
crawler.setUrl("asdf");
console.log(crawler.url);
