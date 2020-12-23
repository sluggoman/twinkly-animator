var Frame = require('../frame.js');
var Point = require('../point.js');
var Animation = require('../animation.js');

var twinkle = require('../effects/twinkle.js');

module.exports = function() { return({
  defaultArgs: function() { return({
    s: 50    // to override global default speed
  })},

  animate: function(renderer, frames = null, options = {}) {
    var animation = new Animation(renderer, frames);

    for (var i = 0; i < 200; i++) {
      var frame = new Frame(25, 8);
      animation.addFrame(frame);	
    }
    for (var i = 0; i < 150; i++) {
      var p = new Point(Math.floor(Math.random()*25), Math.floor(Math.random()*8))
      var start = Math.floor(Math.random()*200);
      twinkle(
        animation, 
        p, 
        start, 
        start + 40, 
        { r: 0, g: 0, b: 0 }, 
        { r: 0, g: 0, b: 160 }
      );
    }
    for (var i = 0; i < 70; i++) {
      var p = new Point(Math.floor(Math.random()*25), Math.floor(Math.random()*8))
      var start = Math.floor(Math.random()*200);
      twinkle(
        animation, 
        p, 
        start, 
        start + 80, 
        { r: 0, g: 0, b: 20 }, 
        { r: 0, g: 100, b: 20 }
      );
    }
    for (var i = 0; i < 200; i++) {
      var p = new Point(Math.floor(Math.random()*25), Math.floor(Math.random()*8))
      var start = Math.floor(Math.random()*200);
      twinkle(
        animation, 
        p, 
        start, 
        start + 10, 
        { r: 0, g: 0, b: 0 }, 
        { r: 50, g: 50, b: 50 }
      );
    }
    return animation;
  }
})}();
