var Products = function(){
	this.list = {
		'book': {'exempt': true},
		'chocolate bar': {'exempt': true},
		'imported box of chocolates': {'exempt': true},
		'box of imported chocolates': {'exempt': true},
		'packet of headache pills': {'exempt': true},
		'music CD': {'exempt': false},
		'imported bottle of perfume': {'exempt': false},
		'bottle of perfume': {'exempt': false}
	};
};

module.exports = new Products();