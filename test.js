const expect = require('chai').expect;

describe('Sales Tax Calculator', ()=>{
	it('Should have a valid module', ()=>{
		const Calculator = require('./calculator');

		beforeEach(()=>{
			return Calculator.clear();
		});

		describe('Tests for List of Items', ()=>{
			it('Should have an array named itemList', ()=>{
				expect(Calculator.itemList).to.be.an('array');
			});

			it('should turn input string into an object', ()=>{
				expect(Calculator.parseInput('1 book at 12.49')).to.deep.equal({'itemName': 'book', 'quantity': 1, 'price': 1249, 'salesTax': 0});
			});

			it('should add item to itemList', ()=>{
				Calculator.inputItem('1 book at 12.49');
				expect(Calculator.itemList).to.deep.include({'itemName': 'book', 'quantity': 1, 'price': 1249, 'salesTax': 0});
			});

		});

		describe('Tests for output', ()=>{
			it('should return at least 1 item formatted with price and quantity', ()=>{
				Calculator.inputItem('1 book at 12.49');
				expect(Calculator.printLine(0)).to.equal('1 book: 12.49');
			});
			
			it('should return the total of the cost of the items', ()=>{
				Calculator.inputItem('1 book at 12.49');
				Calculator.inputItem('1 chocolate bar at 0.85');
				expect(Calculator.printTotal()).to.equal('Total: 13.34');
			});

		});

		describe('Tests for calculating sales tax', ()=>{
			it('Function calculateSalesTax() should add sales tax and hold it as a separate variable', ()=>{
				Calculator.inputItem('1 music CD at 14.99');
				Calculator.calculateSalesTax();
				expect(Calculator.itemList).to.deep.include({'itemName': 'music CD', 'quantity': 1, 'price': 1499, 'salesTax': 150});
			})
		})
	});

});