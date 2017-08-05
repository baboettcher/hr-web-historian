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

  var url = '';
  req.on('data', function(chunk) {
    url += chunk;
  });


  req.on('end', function() {
    res.writeHead(200);
    // console.log('POSTed URL: ' + url);



    archive.readListOfUrls( (siteList) => {

      console.log('siteList: ', siteList);
      archive.isUrlInList(url, siteList, (siteExists) => {
        console.log("siteExists", siteExists);

        if (!siteExists) {
          archive.addUrlToList(url, (siteWritten) => {
            console.log("successfully wrote file", siteWritten)

          });
        }

      });     // return T or

      // var siteExists = siteList.includes(url);
      // console.log(siteExists);


        // take url from above and see if it is in siteList
          //
    });



    // archive.isUrlInList(url, (err, data) => {
    //   if (err) {
    //     return (err, null);
    //   }
    //   return (data);
    // });

  // // if not in the file, add url to the file
  //   if (!isUrlInList) {
  //     archive.addUrlToList(req.url);
  //     archive.downloadUrls(req.url);
  //   }


    res.end();
  });

  // take user's request and see if it in site.txt file



  // else DO LOTS MORE!!!


};

exports.handleRequest = function(req, res) {
  if (req.method === 'GET') {
    handleGetRequest(req, res);
  } else if (req.method === 'POST') {
    handlePostRequest(req, res);
  }
};
