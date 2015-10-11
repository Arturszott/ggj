var _ = require('underscore');
var FONT_SIZE = 24;

var Text = function(game, x, y, text, options) {
    Phaser.BitmapText.call(this, game, x, y, 'pxl', text, FONT_SIZE);

    this.originalText = text;

    options = options || {};

    this.maxWidth = options.maxWidth;
}

Text.prototype = Object.create(Phaser.BitmapText.prototype);
Text.prototype.constructor = Text;

Text.prototype = _.extend(Text.prototype, {
  draw: function(i) {
    var delay = 30;

    i = i || 0;

    this.setText(this.originalText.substring(0, i + 1));
    //
    //if(this.originalText[i + 1] === ' ') {
    //  delay+= 50;
    //}

    if(this.originalText[i + 1] === '.') {
      delay+= 400;
    }

    if(i < this.originalText.length) {
      setTimeout(this.draw.bind(this, i + 1), delay);
    }
  }
});

module.exports = Text;
