var path = require('path');
var http = require('http');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
// require more modules/folders here!

var return404 = function(res) {
  res.writeHead(404, {
    'Content-Type': 'text/plain'
  });
  res.end('404 Not Found\n');
};

var handleGetRequest = function(req, res) {
  // find the url being requested
  if (req.url !== '/') {
    return404(res);
  } else {
    var url = archive.paths.siteAssets + '/index.html';


    fs.readFile(url, 'utf8', (err, data) => {
      if (err) {
        console.error('ERROR: ', err);
      }
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      res.end(data);
    });
  }
};


var handlePostRequest = function(req, res) {

  var body = "";
  req.on('data', function(chunk) {
    body += chunk;
  });
  req.on('end', function() {
    console.log('POSTed: ' + body);
    res.writeHead(200);
    res.end();
  });



  console.log("-------------->", body);
  // take user's request and see if it in site.txt file
  var listOfUrls = archive.readListOfUrls();
  var isUrlInList = archive.isUrlInList(req.url);

  // if not in the file, add url to the file
  if (!isUrlInList) {
    archive.addUrlToList(req.url);
    archive.downloadUrls(req.url);
  }

  // else DO LOTS MORE!!!


};

exports.handleRequest = function(req, res) {
  if (req.method === 'GET') {
    handleGetRequest(req, res);
  } else if (req.method === 'POST') {
    handlePostRequest(req, res);
  }
};
