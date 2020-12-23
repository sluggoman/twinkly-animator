var Frame = require('../frame.js');
var Point = require('../point.js');
var Animation = require('../animation.js');

module.exports = function() { return({
  defaultArgs: function() { return({
    fr: 90,
    fg: 90,
    fb: 90,
    br: 0,
    bg: 0,
    bb: 0,
    rev: false,
    text: "MARQUEE SAMPLE",
    s: 100
  })},

  aliasArgs: function() { return({
    foreground_red: "fr",
    foreground_green: "fg",
    foreground_blue: "fb",
    background_red: "br",
    background_green: "bg",
    background_blue: "bb",
    reverse: "rev",
  })},

  animate: function(renderer, frames = null, options = {}) {
    var text = !options.rev ? options.text : options.text.split("").reverse().join("");
    var animation = new Animation(renderer);
    var frameWidth = 50 + 8 * text.length;
    var frame = new Frame(
      frameWidth, 
      8, 
      { viewPort: { x: 0, y: 0, width: 25, height: 8 } }
    );
    
    var bgColour = null;
    if (options.br || options.bg || options.bb) {
       bgColour = { r: options.br, g: options.bg, b: options.bb };
    }
    
    for (var i = 0; i < text.length; i++) {
      var point = new Point(25+i*8,0);
      frame.drawChar(text[i], 
                     point, 
                     { r: options.fr, g: options.fg, b: options.fb },
                     { bgColour: bgColour, reverse: options.rev }
                    );
    }
    
    if (options.rev) {
      while(true) {
        if (!frame.scrollRight()) {
          break;
        }
      }
    }
    
    while(true) {
      var viewFrame = new Frame(25, 8, { frameData: frame.getViewPortData() });
      animation.addFrame(viewFrame);
      if (!options.rev && !frame.scrollRight()) {
        break;
      }
      if (options.rev && !frame.scrollLeft()) {
        break;
      }
    }
    return animation;
  }	    
})}();
