var _ = require('underscore');

module.exports = function(stories, key) {
  return _.find(stories, function (story) {
    return story.key === key;
  })
}
