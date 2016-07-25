var fs = require('fs');
var path = require('path');

var files =
  fs.readdirSync(path.join(__dirname, '..', 'src'))
  .filter(function (file) {
    return file.indexOf('.') === -1;
  });

fs.writeFileSync(path.join(__dirname, '..', 'lib', 'WorkfloComponents.json'), JSON.stringify(files, null, '  '));
