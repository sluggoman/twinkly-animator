var renderer = require('./renderer_factory.js');

var Frame = require('./frame.js');
var Point = require('./point.js');
var Animation = require('./animation.js');

var animation = new Animation(renderer);
for (var i = 0; i < 8; i++) {
  for (var j = 0; j < 25; j++) {
     var frame = new Frame(25, 8);
     var point1 = new Point(j, i);
     var point2 = new Point(24-j, (i+4)%8);
     frame.drawLine(point1, point2, { r: i*20, g: j*4, b: 50 });
     animation.addFrame(frame)
  }
}

animation.render(500);
