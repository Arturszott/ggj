
function Text(game, x, y, text, options) {

	this.game = game;
	this.text = text;
	this.maxLetterWidth = 11;

	this.textObj = game.add.bitmapText(x, y, 'pxl', text, 8);
	
	options = options || {};

	if (options.maxWidth) {
		this.applyMaxWidth(options.maxWidth);
	}
}

Text.prototype = {
	checkMaxLetterWidth: function () {
		var letters = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';
		var max = 0;
		var letter = '';

		letters.split('').forEach(function (l) {
			var obj = this.game.add.bitmapText(0, 0, 'pxl', l, 14);
			if( obj.width > max ) {
				max = obj.width;
				letter = l;
			}
			obj.destroy();
		}, this);

		return {
			letter: letter,
			max: max
		}
	},
	applyMaxWidth: function (max, rest, steps) {
		steps = steps || 0;
		steps++;

		if(this.textObj.width > max) {
			var matches = this.text.match(/\s[a-zA-Z]*[^\s]*$/);

			if (matches !== null) {
				this.text = this.text.substr(0, matches.index);
				this.update();

				rest = matches[0] + (rest || '');
			}
			this.applyMaxWidth(max, rest, steps);
		} else if(rest){
			this.text = this.text + '\n' + rest.trim();
			this.update();
			this.applyMaxWidth(max, '', steps);
		}
	},
	applyMaxWidthSize: function (max, text, steps) {
        this.set(text);

        if(this.textObj.width < max) {
            return text;
        }

        steps = steps || 0;
        steps++;

		var matches = this.text.substring(0, max / this.maxLetterWidth).match(/\s[a-zA-Z]*[^\s]*$/);

		if (matches !== null) {
            return this.text.substr(0, matches.index) + '\n' + this.applyMaxWidthSize(max, text.substring(matches.index), steps);
		}
	},
	update: function () {
		this.textObj.setText(this.text);
	},
	set: function (text) {
		this.text = text;
		this.update();
	},
	destroy: function(){
		this.textObj.destroy();
	}
}

module.exports = Text;