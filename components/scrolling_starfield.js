var Frame = require('../frame.js');
var Point = require('../point.js');
var Animation = require('../animation.js');

var twinkle = require('../effects/twinkle.js');

module.exports = function() { return({
  defaultArgs: function() { return({
    fc: 20,
    fr: 90,
    fg: 90,
    fb: 90,
  	frm: 30,
    fgm: 30,
    fbm: 30,
    vc: 200,
    vr: 100,
    vg: 100,
    vb: 100,
    vfc: 40,
    nf: 4,
    s: 200    // to override global default speed
  })},

  aliasArgs: function() { return({
    fixed_count: "fc",
    fixed_red: "fr",
    fixed_green: "fg",
    fixed_blue: "fb",
    fixed_red_multiplier: "frm",
    fixed_green_multiplier: "fgm",
    fixed_blue_multiplier: "fbm",
    variable_count: "vc",
    variable_red: "vr",
    variable_green: "vg",
    variable_blue: "vb",
    variable_frame_count: "vfc",
    number_fixed: "nf"
  })},

  animate: function(renderer, frames = null, options = {}) {
    var animation = new Animation(renderer, frames);
    for (var i = 0; i < 200; i++) {
      var frame = new Frame(
        100, 
        8,
        { viewPort: { x: 0, y: 0, width: 25, height: 8 } }
      );
      animation.addFrame(frame);	
    }
    
    var vfc = options.vfc;
    for (var i = 0; i < options.vc / 2; i++) {
      var p = new Point(Math.floor(Math.random()*100), Math.floor(Math.random()*8))
      var start = Math.floor(Math.random()*200);
      twinkle(
        animation, 
        p, 
        start, 
        start + vfc,
        { r: 0, g: 0, b: 0 }, 
        { r: options.vr, g: options.vg, b: options.vb }
      );
    }
    for (var i = 0; i < options.vc / 2; i++) {
      var p = new Point(Math.floor(Math.random()*100), Math.floor(Math.random()*8))
      var start = Math.floor(Math.random()*200);
      twinkle(
        animation, 
        p, 
        start, 
        start + vfc / 2,
        { r: 0, g: 0, b: 0 }, 
        { r: options.vr, g: options.vg, b: options.vb }
      );
    }
    
    var viewAnimation = new Animation(renderer);
    var idx = 0;
    while(true) {
      var frame = animation.getFrame(idx);
      idx++;
      if (frame.scrollRight(idx)) {
        var viewFrame = new Frame(25, 8, { frameData: frame.getViewPortData() });
        viewAnimation.addFrame(viewFrame);
      } else {
        break;
      }
    }
     
    var scrollRight = idx - 1;
    while(true) {
      var frame = animation.getFrame(idx);
      idx++;
      if (frame.scrollRight(scrollRight)) {
        scrollRight--;
        var viewFrame = new Frame(25, 8, { frameData: frame.getViewPortData() });
        viewAnimation.addFrame(viewFrame);
      } else {
        break;
      }
    }
     
    for (var j = 0; j < options.nf; j++) {
      for (var i = 0; i < options.fc / options.nf; i++) {
        var fr = (options.fr + (options.nf/2 - j) * options.frm) % 255;
        var fg = (options.fg + (options.nf/2 - j) * options.fgm) % 255;
        var fb = (options.fb + (options.nf/2 - j) * options.fbm) % 255;
        var p = new Point(Math.floor(Math.random()*25), Math.floor(Math.random()*8))
        viewAnimation.fixedLight(p, { r: fr, g: fg, b: fb });
      }	
    }
    
    return viewAnimation;
  }
})}();
