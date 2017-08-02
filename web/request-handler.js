var path = require('path');
var http = require('http');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
// require more modules/folders here!


exports.handleRequest = function(req, res) {

  // test the req.method to see if it is a GET or POST

  // if a GET, then call handleGetRequest

  // if a POST, then call handlePostRequest





  fs.readFile(archive.paths.siteAssets + '/index.html', 'utf8', (err, data) => {
    var index = archive.paths.siteAssets + '/index.html';
    if (err) {
      console.error('ERROR: ', err);
    }
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    res.end(data);

  });


};


var handleGetRequest = function(req, res) {
  // find the url being requested

  // test url to see if it is root '/'

  // if it is root, then give it 'index.html'

  // else return 404
};

var handlePostRequest = function(req, res) {

};
