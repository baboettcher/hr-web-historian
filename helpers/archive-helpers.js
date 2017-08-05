var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!


exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, 'utf8', (err, data) => {
    if (err) {
      return callback(err, null);
    }
    return callback(data.split('\n'));
  });
};


// exports.readListOfUrls = function(callback) {
//   fs.readFile(exports.paths.list, (err, sites) => {
//     sites = sites.toString().split('\n');
//     if (callback) {
//       // console.error('ERROR: ', err);
//       callback(sites);
//     }
//   });
// };


exports.isUrlInList = function(url, siteList, callback) {
  var siteExists = siteList.includes(url);
  console.log('url: ', url);
/*    if (err) {
      return callback(err, null);
    }*/
  // return callback(siteList.includes(url))
  callback(siteExists);

};


exports.addUrlToList = function(url, callback) {
  fs.appendFile(exports.paths.list, url+"\n", (err, data) => {
    if (err) {
      return callback(err, null);
    }
    // return callback(data);
  });
};


exports.isUrlArchived = function(url, callback) {

};

exports.downloadUrls = function(urls) {
  // for each here
  //   siteList.forEach(url => isUrlArchived(url, cb)
  console.log(urls);
  urls.forEach(url => {
    if (url){
      request("http://" + url).pipe(fs.createWriteStream(exports.paths.archivedSites + "/" + url))
    }

  })


  //request(urls).pipe(fs.createWriteStream(exports.paths.archivedSites))

};






