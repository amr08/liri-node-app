//globals
  var fs = require("fs");
  var keys = require('./keys.js');
  var Twitter = require('twitter');
  var userInput = process.argv[2];


//TWITTER
  var twits = keys.twitterKeys;
  var client = new Twitter(twits);

  var params = {screen_name: 'amrdev08'};

      client.get('statuses/user_timeline', params, function(error, tweets, response) {
          if (!error) {
            }

          if (userInput == "my-tweets") {
               console.log(tweets)
             }
});



  // var request = require("request");


//SPOTIFY
