function getRenderer(renderer_name, renderer_options) {
  if (renderer_name == "console") {
    ConsoleRenderer = require('./console_renderer.js');
    renderer = new ConsoleRenderer();
  } else if (renderer_name == "html") {
    HTMLRenderer = require('./html_renderer.js');
    renderer = new HTMLRenderer(renderer_options.debug);
  } else if (renderer_name == "twinkly" ) {
    TwinklyRenderer = require('./twinkly_renderer.js');
    if (!renderer_options.twinkly_ip) {
      throw "No device IP address specified";
    }
    renderer = new TwinklyRenderer(renderer_options.twinkly_ip);
  } else {
    throw "No renderer";
  }
  return renderer;
}

module.exports = getRenderer;
