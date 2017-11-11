const expect = require('chai').expect;

describe('Sales Tax Calculator', ()=>{
	it('Should have a valid module', ()=>{
		const Calculator = require('./calculator');

		describe('Tests for List of Items', ()=>{
			it('Should have an array named itemList', ()=>{
				expect(Calculator.itemList).to.be.an('array');
			});

			it('Function parseInput() should turn input string into an object', ()=>{
				Calculator.clear();
				expect(Calculator.parseInput('1 book at 12.49')).to.deep.equal({'itemName': 'book', 'quantity': 1, 'price': 1249});
			});

		});
	});

});