var renderer = require('../renderer_factory.js');

var Frame = require('../frame.js');
var Point = require('../point.js');
var Animation = require('../animation.js');

var argv = 
  require('minimist')(
    process.argv.slice(2),
    { 
      default: {
        fr: 90,
        fg: 90,
        fb: 90,
        br: 0,
        bg: 0,
        bb: 0,
        rev: false
      },
      alias: {
        foreground_red: "fr",
        foreground_green: "fg",
        foreground_blue: "fb",
        background_red: "br",
        background_green: "bg",
        background_blue: "bb",
        reverse: "rev"
      }	    
    }
  );

var text = !argv.rev ? argv._[0] : argv._[0].split("").reverse().join("");
var animation = new Animation(renderer);
var frameWidth = 50 + 8 * text.length;
var frame = new Frame(
  frameWidth, 
  8, 
  { viewPort: { x: 0, y: 0, width: 25, height: 8 } }
);

var bgColour = null;
if (argv.br || argv.bg || argv.bb) {
   bgColour = { r: argv.br, g: argv.bg, b: argv.bb };
}

for (var i = 0; i < text.length; i++) {
  var point = new Point(25+i*8,0);
  frame.drawChar(text[i], 
                 point, 
                 { r: argv.fr, g: argv.fg, b: argv.fb },
                 { bgColour: bgColour, reverse: argv.rev }
                );
}

if (argv.rev) {
  while(true) {
    if (!frame.scrollRight()) {
      break;
    }
  }
}

while(true) {
  var viewFrame = new Frame(25, 8, { frameData: frame.getViewPortData() });
  animation.addFrame(viewFrame);
  if (!argv.rev && !frame.scrollRight()) {
    break;
  }
  if (argv.rev && !frame.scrollLeft()) {
    break;
  }
}

animation.render(100);
