var MultilineText = require('./MultilineText');

function createText(game, x, y, text, options) {
  options.maxWidth -= 10;
  var text = new MultilineText(game, x + 10, y + 15, text, options);

  return text;
}

function createButton(game, x, y, text, options) {
  var btn = game.add.sprite(x, y, 'btn');
  btn.inputEnabled = true;
  btn.events.onInputDown.add(options.onClick, this);

  return btn;
}

var Option = function(game, x, y, text, options) {
  Phaser.Group.call(this, game);

  this.btn = createButton(game, x, y, text, options);
  this.text = createText(game, x, y, text, options);

  this.add(this.btn);
  this.add(this.text);
}

Option.prototype = Object.create(Phaser.Group.prototype);
Option.prototype.constructor = Option;

module.exports = Option;
