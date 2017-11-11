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
	var quantity = parseInt(splitInput.shift());
	splitInput.splice(splitInput.indexOf('at'), 1);
	var itemName = splitInput.join(' ');
	return {
		itemName: itemName,
		quantity: quantity,
		price: price,
	};
};

// The inputItem function takes the input of a string, converts it to an object
// and pushes it into the itemList array.
Calculator.prototype.inputItem = function(str){
	this.itemList.push(this.parseInput(str));
}

module.exports = new Calculator();