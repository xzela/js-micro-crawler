#!/usr/bin/env node

var program = require('commander'),
	pkg = require('../package.json'),
	Crawler = require('../lib/crawler');

crawler = new Crawler();

program
	.version(pkg.version);

program
	.command('init')
	.action(function (env) {
		crawler.init();
	});

program
	.command('*').command('')
	.action(function (env) {
		console.log('yo!');
	});

program.parse(process.argv);
console.log("sadfasdfasd");
