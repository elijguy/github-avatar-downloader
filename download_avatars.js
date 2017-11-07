
//this program will take the API of a git repository and use it to download
//the avatars of everyone who contributed to that specific repository.


var request = require('request');
var fs = require('fs');
var token = require('./secrets');
//this token variable, is an authorization key being imported/exported from a different hidden file.
//it is used (line) to provide authorization to some of githubs private repositries
//and to avoid githubs API rate-limits

var name = process.argv[3];
var owner = process.argv[2];
//these two variables which intake value from the command line
//specify the repoOwner and repoName variables used in getRepoContributors()
//they are inserted into the API link (line)
//to specify which repository on github we want to download avatars from.


var x = "ERROR: expected repoOwner and repoName definition after execution of download_avatars\nexample: node download_avatars.js jquery jquery";
//this will be our error message if the owner and name variables are left empty

console.log('Welcome to the GitHub Avatar Downloader!');


if((name!== undefined)&&(owner !== undefined)){

  function getRepoContributors(repoOwner, repoName, cb) {
    //this function uses the request library to
    //fetch the list of contributors via HTTPS for the given repo.
    //the repo is specified by the repo owner and repo name(entered on command line)

    var options = {

      url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",

      headers: {

        'User-Agent': token,

      },

    }
    //object options(line) provides our concatenated API link to request, and authenticates our request(line)

    request(options, function(err, res, body) {
    var json = JSON.parse(body);
    cb(err, json);
    })
    //request is made, JSON string which is returned in body, is then parsed into an object,
    //which is passed to callback function cb(line)

  }


  getRepoContributors(owner, name, function(err, result) {
    //getRepoContributors is invoked, the callback function is used to handle the results


    console.log("Errors:", err);
    console.log("Result:", result);
    for (var i in result){

      downloadImageByURL(result[i].avatar_url,("avatars/" + result[i].login + ".jpg"));
      //downloadImageByURL is put in a loop, which invokes the function(line)
      //for each contributors avatar.


    }

  });

  function downloadImageByURL(url, filePath){
    //downloadImageByURL uses the url of the image to download the image
    //and stores it in a certain local filepath(using fs.createWriteStream(line))
    request.get(url)
      .on('error', function (err) {
        throw err;
      })
      .on('response', function (response) {

        console.log("downloading");

      })
      .on('end', function(){

        console.log('download complete!');
      })
      .pipe(fs.createWriteStream(filePath));


  }
} else{
  console.log(x);}

//if no values are assigned to name or owner,
//else statement will be executed presenting and error message