var components = require('./components.js');
var getRenderer = require('./renderer_factory.js');
var global_args = require('./global_args.js');

function getComponentDefaultOptions(name) {
  var component = components[name];
  var result = {};
  Object.keys(global_args.alias).forEach(function(option, idx) {
    result[option] = global_args.default[global_args.alias[option]];
  });
  var comp_aliases = component.aliasArgs ? component.aliasArgs() : {};
  var default_args = component.defaultArgs();
  Object.keys(comp_aliases).forEach(function(option, idx) {
    result[option] = default_args[comp_aliases[option]];
  });
  Object.keys(global_args.alias).forEach(function(option, idx) {
    if (global_args.alias[option] in default_args) {
      result[option] = default_args[global_args.alias[option]];
    }
  });
  return result;
}

function renderComponent(name, options) {
  var component = components[name];
  Object.keys(options).forEach(function(option, idx) {
    if (options[option] == "true" || options[option] == "false") {
      options[option] = options[option] == "true";
    }
  });
  var comp_aliases = component.aliasArgs ? component.aliasArgs() : null;
  if (comp_aliases) {
    var option_aliases = {};
    Object.keys(options).forEach(function(option, idx) {
      option_aliases[comp_aliases[option]] = options[option];
    });
    Object.assign(options, option_aliases);
  }
  var renderer = getRenderer(options.renderer, options);
  var animation = component.animate(renderer, null, options);
  var output = animation.render(options.speed);
  output = output || 'render_success at ' + new Date();
  return output;
}

global.getComponentDefaultOptions = getComponentDefaultOptions;
global.renderComponent = renderComponent;
global.getComponents = function() { return components; };
