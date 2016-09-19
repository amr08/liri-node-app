//globals
  var fs = require("fs");
  var keys = require('./keys.js');
  var userInput = process.argv[2];
  var userSpotify = process.argv[3];

  var Twitter = require('twitter');
  var spotify = require('spotify');
  var request = require("request");


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


//SPOTIFY

  if (userInput == "spotify-this-song" && userSpotify) {
      spotify.search({ type: 'track', query: userSpotify }, function(err, data) {
          if ( err ) {
                console.log('Error occurred: ' + err);
                return;
             }

          else {
                console.log("Artist: " + data.tracks.items[0].artists[0].name);
                console.log("Song Title: " + data.tracks.items[0].name);
                console.log("Link to Song: " + data.tracks.items[0].href);
                console.log("Album: " + data.tracks.items[0].album.name);
             }
      });
    }

    else if (userInput == "spotify-this-song" && "undefined") {
        var userSpotify = "the sign";
        spotify.search({ type: 'track', query: userSpotify }, function(err, data) {
            if ( err ) {
                console.log('Error occurred: ' + err);
                return;
              }

            else {
                console.log("Artist: " + data.tracks.items[6].artists[0].name)
                console.log("Song Title: " + data.tracks.items[6].name);
                console.log("Link to Song: " + data.tracks.items[6].href);
                console.log("Album: " + data.tracks.items[6].album.name);
              }

        });
    };

//IMDB

    var queryUrl = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&r=json";

      request(queryUrl, function(error, response, body) {

	         if(!error && response.statusCode == 200) {


	            console.log("Title: " + JSON.parse(body)["Title"]);
              console.log("Year: " + JSON.parse(body)["Year"]);
              console.log("Country: " + JSON.parse(body)["Country"]);
              console.log("Language: " + JSON.parse(body)["Language"]);
              console.log("Plot: " + JSON.parse(body)["Plot"]);
              console.log("Actors: " + JSON.parse(body)["Actors"])

              //  		* Rotten Tomatoes Rating.
              //  		* Rotten Tomatoes URL.
              }

          });
