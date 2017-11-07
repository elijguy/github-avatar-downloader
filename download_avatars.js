var request = require('request');
var token = require('./secrets');
var fs = require('fs');
console.log('Welcome to the GitHub Avatar Downloader!');


function getRepoContributors(repoOwner, repoName, cb) {

   var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': token,

    },
  }

  request(options, function(err, res, body) {
    var json = JSON.parse(body);
    cb(err, json);

  })


}


getRepoContributors("jquery", "jquery", function(err, result) {

  console.log("Errors:", err);
  console.log("Result:", result);
  for (var i in result){
    console.log(result[i].avatar_url);
  }

});

function downloadImageByURL(url, filePath){

var request = require('request');
var fs = require('fs');

request.get(url)
       .on('error', function (err) {
         throw err;
       })
       .on('response', function (response) {

         console.log('Response Status Code: ', response.statusCode);
         console.log('Response message:', response.statusMessage);
         console.log('Content type:', response.headers['content-type']);

       })
       .on('end', function(){

        console.log('download complete!');
       })
       .pipe(fs.createWriteStream(filePath));


}
