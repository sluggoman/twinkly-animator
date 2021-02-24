var path = require('path');
var fs = require('fs');

console.log('var components = {};\n');

async function getComponents() {
  return new Promise(function(resolve, reject) {
    fs.readdir('./components', function(err, files) {
      if (err) {
        console.error("Error reading components: " + err);
        return;
      }
      files.forEach(function(file, index) {
        if (file == "sample.js") {
          return;
        }
        var name = path.parse(file).name;
        console.log("components['" + 
                    name +
                    "'] = require('./components/" + 
                    name +
                    ".js');\n");
        if (index == files.length - 1) {
          resolve();
        }
      });
    });
  })
}

async function outputComponents() {
  await getComponents();
  console.log('module.exports = components;');
}

outputComponents();
