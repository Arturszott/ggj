var MultilineText = require('./MultilineText');

function Option(params) {
	this.game = params.game;
	this.optionObj = new (Function.prototype.bind.apply(MultilineText, params.textParams));

	this.optionObj.textObj.inputEnabled = true;
	this.optionObj.textObj.events.onInputDown.add(params.onClick, this.optionObj);
}

Option.prototype = {
	destroy: function(){
		this.optionObj.destroy();
	}
};

module.exports = Option;