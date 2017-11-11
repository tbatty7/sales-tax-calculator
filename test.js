const expect = require('chai').expect;

describe('Sales Tax Calculator', ()=>{
	it('Should have a valid module', ()=>{
		const Calculator = require('./calculator');

		describe('Tests for List of Items', ()=>{
			it('Should have an array named itemList', ()=>{
				expect(Calculator.itemList).to.be.an('array');
			});

		});
	});

});