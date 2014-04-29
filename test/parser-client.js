var should = require('should'),
	MicroParser = require('../lib/micro-parser');

describe('Parser Client Unit Tests - Client', function () {

	describe('Initializing the Parser', function () {
		it('should fail if no options are supplied', function (done) {
			(function () {
				new MicroParser();
			}).should.throw();
			done();
		});
	});

});
