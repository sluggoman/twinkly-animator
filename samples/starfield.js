var argv = 
  require('minimist')(
    process.argv.slice(2),
    { 
      default: {
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
      },
      alias: {
        fixed_count: "fc",
	fixed_red: "fr",
	fixed_green: "fg",
	fixed_blue: "fb",
	variable_count: "vc",
	variable_brightness: "vb",
	variable_frame_count: "vfc",
        number_fixed: "nf"
      }	    
    }
  );
var renderer = require('../renderer_factory.js')

var Frame = require('../frame.js');
var Point = require('../point.js');
var Animation = require('../animation.js');

var twinkle = require('../effects/twinkle.js');

var animation = new Animation(renderer);
for (var i = 0; i < 200; i++) {
  var frame = new Frame(25, 8);
  var start = Math.floor(Math.random()*200);
  animation.addFrame(frame);	
}

for (var j = 0; j < argv.nf; j++) {
  for (var i = 0; i < argv.fc / argv.nf; i++) {
    var fr = (argv.fr + (argv.nf/2 - j) * argv.frm) % 255;
    var fg = (argv.fg + (argv.nf/2 - j) * argv.fgm) % 255;
    var fb = (argv.fb + (argv.nf/2 - j) * argv.fbm) % 255;
    var p = new Point(Math.floor(Math.random()*25), Math.floor(Math.random()*8))
    animation.fixedLight(p, { r: fr, g: fg, b: fb });
  }	
}

var vfc = argv.vfc;
for (var i = 0; i < argv.vc / 2; i++) {
  var p = new Point(Math.floor(Math.random()*25), Math.floor(Math.random()*8))
  var start = Math.floor(Math.random()*200);
  twinkle(
    animation, 
    p, 
    start, 
    start + vfc,
    { r: 0, g: 0, b: 0 }, 
    { r: argv.vr, g: argv.vg, b: argv.vb }
  );
}
for (var i = 0; i < argv.vc / 2; i++) {
  var p = new Point(Math.floor(Math.random()*25), Math.floor(Math.random()*8))
  var start = Math.floor(Math.random()*200);
  twinkle(
    animation, 
    p, 
    start, 
    start + vfc / 2,
    { r: 0, g: 0, b: 0 }, 
    { r: argv.vr, g: argv.vg, b: argv.vb }
  );
}
animation.render(50);
