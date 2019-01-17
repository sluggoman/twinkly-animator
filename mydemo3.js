var renderer = require('./renderer_factory.js');

var Frame = require('./frame.js');
var Point = require('./point.js');
var Animation = require('./animation.js');

var animation = new Animation(renderer);
var text = process.argv[3];
var point = new Point(10,0);
for (var i = 0; i < text.length; i++) {
  var frame = new Frame(25, 8);
  frame.drawChar(text[i], point, { r: 200, g: 15, b: 50 });
  animation.addFrame(frame)
}

animation.render(500);
