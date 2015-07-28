var MultilineText = require('../c/MultilineText');

function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.sprite = this.game.add.sprite(this.game.world.centerX, 138, 'yeoman');
    this.sprite.anchor.setTo(0.5, 0.5);

    var testText = "You\'re a gamedev wannabe star. The greatest adventure awaits you in Poznan, Poland, where the Game Jam starts in a DAY."

    this.mText = new MultilineText(this.game, 30, 300, testText, {
      maxWidth: this.game.width - 60
    });

    this.sprite.angle = -20;
    this.game.add.tween(this.sprite).to({angle: 20}, 1000, Phaser.Easing.Linear.NONE, true, 0, 1000, true);
  },
  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};

module.exports = Menu;
