var should = require('should'),
	MicroParser = require('../lib/micro-parser');

describe('Parser Client Unit Tests - Client Tests: ', function () {

	describe('Initializing the Parser:', function () {
		it('should fail if no schema is supplied', function (done) {
			(function () {
				new MicroParser();
			}).should.throw();
			done();
		});
		it('should fail if the schema is not an Object', function (done) {
			(function () {
				new MicroParser('');
			}).should.throw();
			(function () {
				new MicroParser(1);
			}).should.throw();
			(function () {
				new MicroParser([]);
			}).should.throw();
			(function () {
				new MicroParser(false);
			}).should.throw();
			done();
		});
		it('should fail if the schema is Object is empty', function (done) {
			(function () {
				new MicroParser({});
			}).should.throw();
			done();
		});
	});

	describe('Loading Data:', function () {
		it('should fail if loadData receives nothing', function (done) {
			var schema = {name: 'foo'};
			var mp = new MicroParser(schema);
			(function () {
				mp.loadData();
			}).should.throw();
			done();
		});
		it('should fail if loadData receives an empty string', function (done) {
			var schema = {name: 'foo'};
			var mp = new MicroParser(schema);
			(function () {
				mp.loadData('');
			}).should.throw();
			done();
		});

	});

});
