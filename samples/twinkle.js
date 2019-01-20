var renderer = require('../renderer_factory.js')

var Frame = require('../frame.js');
var Point = require('../point.js');
var Animation = require('../animation.js');

var twinkle = require('../effects/twinkle.js');

var animation = new Animation(renderer);
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
animation.render(50);
