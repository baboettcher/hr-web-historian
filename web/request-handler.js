var path = require('path');
var http = require('http');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
// require more modules/folders here!


exports.handleRequest = function (req, res) {

  fs.readFile(archive.paths.siteAssets + '/index.html', 'utf8', (err, data) => {
    var index = archive.paths.siteAssets + '/index.html';
    if (err) {
      console.error('ERROR: ', err);
    }
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(data);

  });


};



