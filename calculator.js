var Calculator = function(){
	this.itemList = [];
	this.exempt = {
		'book': true,
		'chocolate bar': true,
		'imported box of chocolates': true,
		'box of imported chocolates': true,
		'packet of headache pills': true,
	};
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
	var quantity = parseInt(splitInput.shift());
	splitInput.splice(splitInput.indexOf('at'), 1);
	var itemName = splitInput.join(' ');
	return {
		itemName: itemName,
		quantity: quantity,
		price: price,
		salesTax: 0,
	};
};

// The inputItem function takes the input of a string, converts it to an object
// and pushes it into the itemList array.
Calculator.prototype.inputItem = function(str){
	this.itemList.push(this.parseInput(str));
};

// The checkout function should take the itemList array and format it back into
// a string and print it out.
Calculator.prototype.printLine = function(index){
	return this.itemList[index].quantity + ' ' + this.itemList[index].itemName + ': ' + this.itemList[index].price / 100;
};

// The printTotal function takes the price from each item in itemList and adds them together.
// It then converts the money back to a decimal and prints it in a string of "Total: amount"
Calculator.prototype.printTotal = function(){
	var total = 0;
	this.itemList.forEach(function(item){
		total += item.price;
	});
	return "Total: " + total/100;
};

Calculator.prototype.calculateSalesTax = function(){
	var exemptList = this.exempt;
	this.itemList.forEach(function(item){
		if (exemptList[item.itemName]){
			return;
		} else {
			item.salesTax += Math.ceil((item.price / 10) / 5)*5;
			}
	});
};
	

module.exports = new Calculator();