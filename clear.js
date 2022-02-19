const fs = require('fs');
const path = require('path');
var readline = require('readline');
var copydir = require('copy-dir');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Clear project ? [y/n]", function(answer) {
  if(answer == 'y'){
    clearProject();
  }
  rl.close();
});
clearProject = () =>{
    let destDir = path.join(__dirname, 'gateway');
    copydir.sync(path.join(__dirname, 'clear_gateway'), destDir, {
        filter: function (stat, filepath, filename) {
          if (stat === 'file' && path.extname(filepath) === '.html') {
            return false;
          }
          if (stat === 'directory' && filename === '.svn') {
            return false;
          }
          if (stat === 'symbolicLink') {
            return false;
          }
          return true;
        }
      });
}