var argv = require('minimist')(process.argv.slice(2));
var renderer = require('../renderer_factory.js')

var Frame = require('../frame.js');
var Point = require('../point.js');
var Animation = require('../animation.js');

var twinkle = require('../effects/twinkle.js');

var animation = new Animation(renderer);
var text = argv._[0];
var frameWidth = 50 + 8 * text.length;
var frame = new Frame(
  frameWidth, 
  8, 
  { viewPort: { x: 0, y: 0, width: 25, height: 8 } }
);

for (var i = 0; i < text.length; i++) {
  var point = new Point(25+i*8,0);
  frame.drawChar(text[i], point, { r: 200, g: 15, b: 50 });
}

while(true) {
  var viewFrame = new Frame(25, 8, { frameData: frame.getViewPortData() });
  animation.addFrame(viewFrame);
  if (!frame.scrollRight({ horizontal: 8 })) {
    break;
  }
}

for (var i = 0; i < 150; i++) {
  var p = new Point(Math.floor(Math.random()*25), Math.floor(Math.random()*8))
  var start = Math.floor(Math.random()*animation.numFrames());
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
  var start = Math.floor(Math.random()*animation.numFrames());
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
  var start = Math.floor(Math.random()*animation.numFrames());
  twinkle(
    animation, 
    p, 
    start, 
    start + 10, 
    { r: 0, g: 0, b: 0 }, 
    { r: 50, g: 50, b: 50 }
  );
}

animation.render(100);
