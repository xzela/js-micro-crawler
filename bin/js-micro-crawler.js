#!/usr/bin/env node

var program = require('commander'),
	pkg = require('../package.json'),
	Crawler = require('../lib/crawler');

crawler = new Crawler();

program
	.version(pkg.version);

program
	.command('*')
	.action(function (env) {
		console.log('yo!');
	});

program
	.command('init')
	.action(function (env) {
		crawler.init();
	});

program.parse(process.argv);
console.log("sadfasdfasd");
