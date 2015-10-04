var MultilineText = require('../c/MultilineText');
var Option = require('../c/Option');
var storykey = 'start';

function clearStory(game) {
  var story = game.renderedStory;
  story.opts.forEach(function (opt) {
    opt.destroy();
  });
  story.title.destroy();
}
function goToNextStory(key) {
  clearStory(this);
  renderStory(this, findStoryByKey(this.scenario.stories, key));
}

function renderStory(game, story) {
  console.log(story);
  var title = new MultilineText(game, 30, 30, story.text, {
    maxWidth: game.width - 60
  });

  var opts = story.opts.map(function(opt, i) {
    var optParts = opt.split(': ');
    var optText = optParts[1];

    return new Option({
      game: game,
      textParams: [null, game, 30, 120 + i * game.height / 5, optText, {
        maxWidth: game.width - 60
      }],
      onClick: goToNextStory.bind(game, story.key + optParts[0])
    });
  }, this);

  var story = {
    title: title,
    opts: opts
  };

  game.renderedStory = story;

  return story;

}

function findStoryByKey(stories, key) {
  for (var i = stories.length - 1; i >= 0; i--) {
    if (stories[i].key === key) {
      return stories[i];
    }
  };
}

function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {
    var testText = "You\'re a gamedev wannabe star. The greatest adventure awaits you in Poznan, Poland, where the Game Jam starts in a DAY."

    this.game.scenario = this.game.cache.getJSON(this.game.storyName);
    renderStory(this.game, findStoryByKey(this.game.scenario.stories, ''));
  },
  update: function() {

  }
};

module.exports = Menu;