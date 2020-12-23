var path = require('path');
var parseArgs = require('minimist');
var getRenderer = require('./renderer_factory.js');
var component = require(path.join(process.cwd(), process.argv[2]));
var globalArgs = require('./global_args.js');

var defaultArgs = Object.assign(
  globalArgs.default, 
  component.defaultArgs ? component.defaultArgs() : {}
);
var aliasArgs = Object.assign(
  globalArgs.alias, 
  component.aliasArgs ? component.aliasArgs() : {}
);
var options = parseArgs(
  process.argv.slice(3), 
  { default: defaultArgs, alias: aliasArgs }
);

var renderer = getRenderer(options.renderer, options);
var animation = component.animate(renderer, null, options);
var output = animation.render(options.speed);
if (output) {
  console.log(output);
}
