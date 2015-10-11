var renderStory = require('../lib/renderStory');
var findStoryByKey = require('../lib/findStoryByKey');

function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {
    this.game.scenario = this.game.cache.getJSON(this.game.storyName);

    renderStory(this.game, findStoryByKey(this.game.scenario.stories, ''));
  }
};

module.exports = Menu;
