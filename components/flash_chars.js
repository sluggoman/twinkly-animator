var Frame = require('../frame.js');
var Point = require('../point.js');
var Animation = require('../animation.js');

module.exports = function() { return ({
  defaultArgs: function() { return({
    s: 500,
    text: "SOMETHING TO FLASH"
  })},

  animate: function(renderer, frames = null, options = {}) {
    animation = new Animation(renderer, frames);
    var text = options.text;
    var point = new Point(10,0);
    for (var i = 0; i < text.length; i++) {
      var frame = new Frame(25, 8);
      frame.drawChar(text[i], point, { r: 200, g: 15, b: 50 });
      animation.addFrame(frame)
    }
    return animation;
  }
})}();
