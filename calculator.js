var Calculator = function(){
	this.itemList = [];
};

Calculator.prototype.clear = function(){
	this.itemList =[];
};

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



module.exports = new Calculator();