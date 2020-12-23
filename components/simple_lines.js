var Frame = require('../frame.js');
var Point = require('../point.js');
var Animation = require('../animation.js');

module.exports = function() { return({
  animate: function(renderer, frames = null, options = {}) {
    var animation = new Animation(renderer, frames);
    for (var i = 0; i < 8; i++) {
      var frame = new Frame(25, 8);
      for (var j = 0; j < 25; j++) {
         for (var ii = 0; ii < 2; ii++) {
           var point1 = new Point(j, (i+ii)%8);
           var point2 = new Point(24-j, (i+ii+4)%8);
           frame.setLight(point1, { r: j*10, g: 0, b: ((i+ii)*(255/8))%255});
           frame.setLight(point2, { r: j*10, g: 0, b: 255-((i+ii)*(255/8))%255});
         }
      }
      animation.addFrame(frame)
    }
    return animation;
  }
})}();
