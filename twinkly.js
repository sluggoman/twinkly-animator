var path = require('path');
var parseArgs = require('minimist');
var getRenderer = require('./renderer_factory.js');
var component = require(path.join(process.cwd(), process.argv[2]));

var rendererDefaults = {
  r: 'console',
  d: false,
  f: 'basic',
  s: 500
};

var rendererAlias = {
  renderer: 'r',
  twinkly_ip: 't',
  debug: 'd',
  speed: 's',
  font: 'f'
}

var defaultArgs = Object.assign(
  rendererDefaults, 
  component.defaultArgs ? component.defaultArgs() : {}
);
var aliasArgs = Object.assign(
  rendererAlias, 
  component.aliasArgs ? component.aliasArgs() : {}
);
var options = parseArgs(
  process.argv.slice(3), 
  { default: defaultArgs, alias: aliasArgs }
);

var renderer = getRenderer(options.renderer, options);
var animation = component.animate(renderer, null, options);
animation.render(options.speed);
