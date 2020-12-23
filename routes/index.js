var express = require('express');
var router = express.Router();
var global_args = require('../global_args.js');
var getRenderer = require('../renderer_factory.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render(
    'index', 
    { 
      title: 'Twinkly Lights',
      components: req.components
    }
  );
});

router.get('/component/:component/arguments', function(req, res, next) {
  var component = req.components[req.params.component];
  var result = {
    default: Object.assign({}, global_args.default),
    alias: Object.assign({}, global_args.alias)
  };
  Object.assign(
    result.alias, 
    component.module.aliasArgs ? component.module.aliasArgs() : {}
  );
  Object.assign(
    result.default,
    component.module.defaultArgs ? component.module.defaultArgs() : {}
  );
  res.json(result);
});

router.get('/component/:component/render', function(req, res, next) {
  var component = req.components[req.params.component];
  var options = req.query;
  Object.keys(options).forEach(function(option, idx) {
    if (options[option] == "true" || options[option] == "false") {
      options[option] = options[option] == "true";
    }
  });
  var comp_aliases = component.module.aliasArgs ? component.module.aliasArgs() : null;
  if (comp_aliases) {
    var option_aliases = {};
    Object.keys(options).forEach(function(option, idx) {
      option_aliases[comp_aliases[option]] = options[option];
    });
    Object.assign(options, option_aliases);
  }
  var renderer = getRenderer(options.renderer, options);
  var animation = component.module.animate(renderer, null, options);
  var output = animation.render(options.speed);
  if (output) {
    res.set('Content-type', 'text/html');
    res.send(output);
  } else {
    res.render('render_success', { at: new Date() });
  }
});

module.exports = router;
