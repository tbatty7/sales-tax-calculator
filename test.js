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
			it('should calculate 10% sales tax and hold it as a separate variable', ()=>{
				Calculator.inputItem('1 music CD at 14.99');
				Calculator.calculateSalesTax();
				expect(Calculator.itemList).to.deep.include({'itemName': 'music CD', 'quantity': 1, 'price': 1499, 'salesTax': 150});
			});

			it('should add sales tax to each item price when printing out', ()=>{
				Calculator.inputItem('1 music CD at 14.99');
				Calculator.calculateSalesTax();
				expect(Calculator.printLine(0)).to.equal('1 music CD: 16.49');
			});

			it('should check if an item is imported and if so, return true', ()=>{
				expect(Calculator.isImported('imported bottle of perfume')).to.equal(true);
				expect(Calculator.isImported('box of imported chocolates')).to.equal(true);
				expect(Calculator.isImported('box of chocolates')).to.equal(false);
			});
			
			it('should calculate the 5% import sales tax if an item is imported', ()=>{
				Calculator.inputItem('1 imported box of chocolates at 11.25');
				Calculator.calculateImportTax();
				Calculator.calculateSalesTax();
				expect(Calculator.itemList).to.deep.include({'itemName': 'imported box of chocolates', 'quantity': 1, 'price': 1125, 'salesTax': 60});
				expect(Calculator.printLine(0)).to.equal('1 imported box of chocolates: 11.85');
			});



			it('should print the total of the sales tax', ()=>{
				Calculator.inputItem('1 imported box of chocolates at 11.25');
				Calculator.inputItem('1 music CD at 14.99');
				Calculator.inputItem('1 book at 12.49');
				Calculator.calculateImportTax();
				Calculator.calculateSalesTax();

				expect(Calculator.itemList).to.deep.include({'itemName': 'imported box of chocolates', 'quantity': 1, 'price': 1125, 'salesTax': 60});
				expect(Calculator.printLine(0)).to.equal('1 imported box of chocolates: 11.85');
				expect(Calculator.printLine(1)).to.equal('1 music CD: 16.49');
				expect(Calculator.printLine(2)).to.equal('1 book: 12.49');
				expect(Calculator.printTotalTax()).to.equal('Sales Tax: 2.10');
				expect(Calculator.printTotal()).to.equal('Total: 40.83');
			});

		});

		describe('Final Tests', ()=>{
			it('should takes inputs of 1 book, 1 music CD, and 1 chocolate bar and output the calculated price for each and the sales tax and the total price', ()=>{
				Calculator.inputItem('1 book at 12.49');
				Calculator.inputItem('1 music CD at 14.99');
				Calculator.inputItem('1 chocolate bar at 0.85');
				Calculator.calculateImportTax();
				Calculator.calculateSalesTax();
				
				expect(Calculator.printLine(0)).to.equal('1 book: 12.49');
				expect(Calculator.printLine(1)).to.equal('1 music CD: 16.49');
				expect(Calculator.printLine(2)).to.equal('1 chocolate bar: 0.85');
				expect(Calculator.printTotalTax()).to.equal('Sales Tax: 1.50');
				expect(Calculator.printTotal()).to.equal('Total: 29.83');
			});

			it('should takes inputs of 1 imported box of chocolates, and 1 imported bottle of perfume and output the calculated price for each and the sales tax and the total price', ()=>{
				Calculator.inputItem('1 imported box of chocolates at 10.00');
				Calculator.inputItem('1 imported bottle of perfume at 47.50');
				Calculator.calculateImportTax();
				Calculator.calculateSalesTax();
				
				expect(Calculator.printLine(0)).to.equal('1 imported box of chocolates: 10.50');
				expect(Calculator.printLine(1)).to.equal('1 imported bottle of perfume: 54.65');
				expect(Calculator.printTotalTax()).to.equal('Sales Tax: 7.65');
				expect(Calculator.printTotal()).to.equal('Total: 65.15');
			});

			it('should takes inputs of 1 imported bottle of perfume, 1 bottle of perfume, 1 packet of headache pills, and 1 box of importted chocolates and output the calculated price for each and the sales tax and the total price', ()=>{
				Calculator.inputItem('1 imported bottle of perfume at 27.99');
				Calculator.inputItem('1 bottle of perfume at 18.99');
				Calculator.inputItem('1 packet of headache pills at 9.75');
				Calculator.inputItem('1 imported box of chocolates at 11.25');
				Calculator.calculateImportTax();
				Calculator.calculateSalesTax();
				
				expect(Calculator.printLine(0)).to.equal('1 imported bottle of perfume: 32.19');
				expect(Calculator.printLine(1)).to.equal('1 bottle of perfume: 20.89');
				expect(Calculator.printLine(2)).to.equal('1 packet of headache pills: 9.75');
				expect(Calculator.printLine(3)).to.equal('1 imported box of chocolates: 11.85');
				expect(Calculator.printTotalTax()).to.equal('Sales Tax: 6.70');
				expect(Calculator.printTotal()).to.equal('Total: 74.68');

			});
		});
	});

});