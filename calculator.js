// The Tax exempt items are located in a seperate file.
var Products = require('./products');

var Calculator = function(){
	this.itemList = [];
};

// The clear function clears the itemList.
Calculator.prototype.clear = function(){
	this.itemList =[];
};


// The parseInput function takes the input of a string and returns an object
// with the properties of itemName, price, and quantity.  It converts quantity to a number
// and it converts price to an integer to avoid floating point nastiness.  It also
// deleted the word 'at'.
Calculator.prototype.parseInput = function(str){
	var splitInput = str.split(' ');
	var price = splitInput.pop()*100;
	var quantity = splitInput.shift();
	splitInput.splice(splitInput.indexOf('at'), 1);
	var itemName = splitInput.join(' ');
	if (this.isInvalidInput(quantity, itemName, price)){
		return 'Invalid Input';
	}
	return {
		itemName: itemName,
		quantity: parseInt(quantity),
		price: price,
		salesTax: 0,
	};
};

// isInvalidInput: Tests the price and quantity to verify they are integers.
// If they are valid, it returns false, if invalid, it returns true.
Calculator.prototype.isInvalidInput = function(quantity, item, price){
	if (quantity+1>1 && price>0 && Products.list[item]){
		return false;
	} else {
		return true;
	}
};

// The inputItem function takes the input of a string, converts it to an object
// and pushes it into the itemList array.  It also tests for valid input first.
// If input is invalid, it returns message.
Calculator.prototype.inputItem = function(str){
	if (this.parseInput(str) === 'Invalid Input'){
		return 'Invalid Input: Must have format of quantity, item, and then price without dollar sign.  Example: 1 book at 4.33.';
	}
	this.itemList.push(this.parseInput(str));
};

// The checkout function should take the itemList array and add the sales tax
// and multiply that by the quantity and format it back into a string and print it out.
Calculator.prototype.printLine = function(index){
	var price = (this.itemList[index].price * this.itemList[index].quantity) + this.itemList[index].salesTax;
	price /= 100;
	return this.itemList[index].quantity + ' ' + this.itemList[index].itemName + ': ' + price.toFixed(2);
};

// The printTotalTax function iterates through the itemList and totals up the salesTax 
// for each item and returns a formatted string with the Sales Tax total.
Calculator.prototype.printTotalTax = function(){
	var total = 0;
	this.itemList.forEach(function(item){
		total += item.salesTax;
	});
	total /= 100;
	return "Sales Tax: " + total.toFixed(2);
};

// The printTotal function takes the price from each item in itemList and adds them together.
// It then converts the money back to a decimal and prints it in a string of "Total: amount"
Calculator.prototype.printTotal = function(){
	var total = 0;
	this.itemList.forEach(function(item){
		total += (item.price * item.quantity) + item.salesTax;
	});
	total /= 100;
	return "Total: " + total.toFixed(2);
};

// The calculateSalesTax function checks if the item is on the list of items exempt from sales tax. 
// If the item is not exempt, it takes the price of each item in itemList and divides it by
// 10, thus calculating a sales tax of 10%, it then rounds up by 5 cents.
Calculator.prototype.calculateSalesTax = function(){
	this.itemList.forEach(function(item){
		if (Products.list[item.itemName].exempt){
			return;
		} else {
			item.salesTax += Math.ceil((item.price * item.quantity / 10) / 5)*5;
			}
	});
};
	
// The isImported function receives an input of the item name and returns true if it has the word
// "imported" in it and false if it does not.
Calculator.prototype.isImported = function(str){
	var nameArray = str.split(' ');
	var result = false;
	nameArray.forEach(function(item){
		if (item === 'imported'){
			result = true;
		}
	});
	return result;
};

// The calculateImportTax function iterates through the itemList and calculates the 5% import sales tax
// and adds it to the sales tax property.
Calculator.prototype.calculateImportTax = function(){
	var isImported = this.isImported;
	this.itemList.forEach(function(item){
		if (!isImported(item.itemName)){
			return;
		} else {
			var literalTax = (5/100)*(item.price*item.quantity);
			item.salesTax += Math.ceil(literalTax/5)*5;
			}
	});
};

// printReceipt: console logs the output.  It first loops through the itemList and prints each line out
// using printLine, then prints the total tax and then the net total.
Calculator.prototype.printReceipt = function(){
	var printLine = this.printLine;
	for (var i = 0; i < this.itemList.length; i++){
		console.log(printLine(i));
	}
	console.log(this.printTotalTax());
	console.log(this.printTotal());
};


module.exports = new Calculator();