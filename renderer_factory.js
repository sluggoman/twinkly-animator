var renderer;

if (process.env.SIM) {
  ConsoleRenderer = require('./console_renderer.js');
  renderer = new ConsoleRenderer();
} else {
  TwinklyRenderer = require('./twinkly_renderer.js');
  renderer = new TwinklyRenderer(process.argv[2]);
}

module.exports = renderer;
