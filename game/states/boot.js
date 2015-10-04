
'use strict';

function Boot() {
}

Boot.prototype = {
  preload: function() {
    this.load.image('preloader', 'assets/preloader.gif');
    this.load.bitmapFont('pxl', 'assets/font/pxl/pxl.png', 'assets/font/pxl/pxl.xml');
    this.game.load.json('ggj', 'assets/data/ggj.json');

    this.game.storyName = 'ggj';
  },
  create: function() {
    this.game.input.maxPointers = 1;
    this.game.state.start('preload');
  }
};

module.exports = Boot;
