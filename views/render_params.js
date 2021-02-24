function populate_params(param_defaults) {
  var tbody = $('#component_params');
  tbody.empty();
  Object.keys(param_defaults).forEach(function(param, index) {
    if (param == "renderer") {
      return;
    }
    var default_value = param_defaults[param];
    tbody.append("<tr><td>" + 
                  param + 
                  "</td><td><input name='" + 
                  param + 
                   "' type='text' value='" +
                  default_value +
                  "'></input>");
  });
}

function get_params(component) {
  populate_params(getComponentDefaultOptions(component));
}
 
function populate_components() {
  var sel = $('#component-select');
  Object.keys(getComponents()).forEach(function(name) {
    sel.append("<option value='" + name + "'>" + name + "</option>");
  });
  sel.on('change', function() {
    get_params($(this).val());
  });
}
