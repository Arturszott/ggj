var MultilineText = require('../c/MultilineText');
var Option = require('../c/Option');

var findStoryByKey = require('./findStoryByKey');

function clearStory(game) {
  var story = game.renderedStory;

  story.opts.forEach(function (opt) {
    opt.destroy();
  });

  story.title.destroy();
}

function goToNextStory(key) {
  console.log(key);
  clearStory(this);
  renderStory(this, findStoryByKey(this.scenario.stories, key));
}

function getStoryKey(optionKey, storyData) {
  if (storyData.type === 'direct') {
    return optionKey;
  } else {
    return storyData.key + optionKey;
  }
}

function getOptionProps(opt) {
  var optParts = opt.split(': ');

  return {
    key: optParts[0],
    text: optParts[1]
  }
}

var renderStory = function (game, data) {
  if(typeof data.text !== 'string') {
    throw new Error( 'story text is not a string');
  }

  var STORY_HEIGHT = 120;

  var story = {
    title: new MultilineText(game, 10, 20, data.text, {
      maxWidth: game.width - 10 * 2
    }),
    opts: data.opts.reverse().map(function(opt, i) {
      var optionProps = getOptionProps(opt);

      return new Option(game, 4, game.height - (STORY_HEIGHT + i * game.height / 5), optionProps.text, {
        maxWidth: game.width - 3 * 2,
        onClick: goToNextStory.bind(game, getStoryKey(optionProps.key, data))
      });
    }, this)
  };

  console.log(story);

  game.world.add(story.title);

  story.opts.forEach(function(opt){
    game.world.add(opt);
  });
  game.renderedStory = story;

  story.title.draw();

  return story;
}

module.exports = renderStory;
