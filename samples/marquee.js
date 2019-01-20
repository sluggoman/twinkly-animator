var argv = require('minimist')(process.argv.slice(2));
var renderer = require('../renderer_factory.js');

var Frame = require('../frame.js');
var Point = require('../point.js');
var Animation = require('../animation.js');

var text = argv._[0];
var animation = new Animation(renderer);
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

animation.render(100);
