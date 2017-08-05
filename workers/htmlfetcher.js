// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require('../helpers/archive-helpers');
var siteList = archive.readListOfUrls((siteList)=> {
  archive.downloadUrls(siteList);
});


// get the sites.txt file and read into an array called siteList
//



//  if it is not archived
//
//    then downloadUrls(url)

