var argv =
  require('minimist')(
    process.argv.slice(2),
    { alias: { renderer: "r", twinkly: "t" }}
  );

function getRenderer(renderer_name, renderer_options) {
  if (renderer_name == "console") {
    ConsoleRenderer = require('./console_renderer.js');
    renderer = new ConsoleRenderer();
  } else if (renderer_name == "html") {
    HTMLRenderer = require('./html_renderer.js');
    renderer = new HTMLRenderer();
  } else {
    TwinklyRenderer = require('./twinkly_renderer.js');
    if (!renderer_options.twinkly_ip) {
      console.error(
       "You need to specify an IP address of the device. eg -t 192.168.1.15"
      );
      process.exit();
    }
    renderer = new TwinklyRenderer(renderer_options.twinkly_ip);
  }
  return renderer;
}

module.exports = getRenderer(argv.renderer, { twinkly_ip: argv.twinkly })
