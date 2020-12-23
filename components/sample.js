var Frame = require('../frame.js');
var Point = require('../point.js');
var Animation = require('../animation.js');

module.exports = function() { return({
  defaultArgs: function() { return({
    s: 100    // to override global default speed
  })},

  animate: function(renderer, frames = null, options = {}) {
    var animation = new Animation(renderer, frames);
    return animation;
  }
})}();
