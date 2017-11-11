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

			it('Function inputItem() should add item to itemList', ()=>{
				Calculator.clear();
				Calculator.inputItem('1 book at 12.49');
				expect(Calculator.itemList).to.deep.include({'itemName': 'book', 'quantity': 1, 'price': 1249});
			});

		});

		describe('Tests for output', ()=>{
			it('Function printLine() should return at least 1 item formatted with price and quantity', ()=>{
				Calculator.clear();
				Calculator.inputItem('1 book at 12.49');
				expect(Calculator.printLine(0)).to.equal('1 book: 12.49');
			});
			
			it('Function printTotal() should return the total of the cost of the items', ()=>{
				Calculator.clear();
				Calculator.inputItem('1 book at 12.49');
				Calculator.inputItem('1 chocolate bar at 0.85');
				expect(Calculator.printTotal()).to.equal('Total: 13.34');
			});

		});
	});

});