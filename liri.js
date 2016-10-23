//globals
  var fs = require("fs");
  var keys = require('./keys.js');
  var userCommand = process.argv[2];
  var userSearch = process.argv[3];

  var Twitter = require('twitter');
  var spotify = require('spotify');
  var request = require("request");
  var computerSearch =[];

//FUNCTION to add text to log.txt
  console.log(computerSearch);
  function append(info) {

      var pretty = JSON.stringify(info, null, 2);

        fs.appendFile("log.txt", pretty, function(err) {
           if(err) {
              return console.log(err);
            }
        });
      }

//function to console movie-this
  function consoleMovies(body) {
    console.log("Title: " + JSON.parse(body)["Title"]);
    console.log("Year: " + JSON.parse(body)["Year"]);
    console.log("Country: " + JSON.parse(body)["Country"]);
    console.log("Language: " + JSON.parse(body)["Language"]);
    console.log("Plot: " + JSON.parse(body)["Plot"]);
    console.log("Actors: " + JSON.parse(body)["Actors"]);
    console.log("Rotten Tomatoes Rating: " + JSON.parse(body)["tomatoRating"]);
    console.log("Rotten Tomatoes URL: " + JSON.parse(body)["tomatoURL"]);
  }

//function to spotify-this-song
  function consoleSongs(data) {
    console.log("Artist: " + data.tracks.items[0].artists[0].name);
    console.log("Song Title: " + data.tracks.items[0].name);
    console.log("Link to Song: " + data.tracks.items[0].href);
    console.log("Album: " + data.tracks.items[0].album.name);
  }

//TWITTER/////////////

  var twits = keys.twitterKeys;
  var client = new Twitter(twits);
  var params = {screen_name: 'nodejs'};

  function twitterFunction(){
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
      }
    
      function tweet(a) {
        console.log("----TWEETS!------------");
        console.log("Tweet Created on: " + tweets[a].created_at)
        append("Tweet Created on: " + tweets[a].created_at)
        console.log("Tweet: " + tweets[a].text)
        append("Tweet: " + tweets[a].text)
      }

//loops through to retrieve tweets
      for(var i = 0; i < 8; i++) {
        tweet([i])
      }
    });
  };

  if (userCommand == "my-tweets") {
    twitterFunction();
  };

//SPOTIFY////////////

  if (userCommand == "spotify-this-song" && userSearch) {
    spotify.search({ type: 'track', query: userSearch}, function(err, data) {
      if (err) {
        console.log('Error occurred: ' + err);
        return;
      } else {
          consoleSongs(data);
      }

      //printing to log.txt
      append("Artist: " + data.tracks.items[0].artists[0].name
        + " Song Title: " + data.tracks.items[0].name
        + " Link to Song: " + data.tracks.items[0].href
        + " Album: " + data.tracks.items[0].album.name)
    });
  }

  else if (userCommand == "spotify-this-song" && "undefined") {
    var userSearch = "the sign";
    console.log(userSearch)

    spotify.search({ type: 'track', query: userSearch }, function(err, data) {
      if (err) {
        console.log('Error occurred: ' + err);
        return;
      } else {
          console.log("Artist: " + data.tracks.items[8].artists[0].name)
          console.log("Song Title: " + data.tracks.items[8].name);
          console.log("Link to Song: " + data.tracks.items[8].href);
          console.log("Album: " + data.tracks.items[8].album.name);
      }
  //printing to log.txt
      append("Artist: " + data.tracks.items[8].artists[0].name +
        " Song Title: " + data.tracks.items[8].name +
        " Link to Song: " + data.tracks.items[8].href +
        " Album: " + data.tracks.items[8].album.name)
    });
  };


//IMDB//////////
  var queryUrl = "http://www.omdbapi.com/?t=" + userSearch + "&y=&tomatoes=true&plot=short&r=json";
    if (userCommand == "movie-this" && userSearch) {
      request(queryUrl, function(error, response, body) {

        if (!error && response.statusCode == 200) {
          consoleMovies(body);
        }
        
        append("Title: " + JSON.parse(body)["Title"]
          + "Year: " + JSON.parse(body)["Year"]
          + "Country: " + JSON.parse(body)["Country"]
          + "Language: " + JSON.parse(body)["Language"]
          + "Plot: " + JSON.parse(body)["Plot"]
          + "Actors: " + JSON.parse(body)["Actors"]
          + "Rotten Tomatoes Rating: " + JSON.parse(body)["tomatoRating"]
          + "Rotten Tomatoes URL: " + JSON.parse(body)["tomatoURL"]);
      });
    }

    else if (userCommand == "movie-this" && "undefined") {
      var userSearch = "Mr. Nobody";
      var queryUrl = "http://www.omdbapi.com/?t=" + userSearch + "&y=&tomatoes=true&plot=short&r=json";

        request(queryUrl, function(error, response, body) {

          if(!error && response.statusCode == 200) {
            consoleMovies(body);
          }
      //printing to log.txt
          append("Title: " + JSON.parse(body)["Title"]
            + "Year: " + JSON.parse(body)["Year"]
            + "Country: " + JSON.parse(body)["Country"]
            + "Language: " + JSON.parse(body)["Language"]
            + "Plot: " + JSON.parse(body)["Plot"]
            + "Actors: " + JSON.parse(body)["Actors"]
            + "Rotten Tomatoes Rating: " + JSON.parse(body)["tomatoRating"]
            + "Rotten Tomatoes URL: " + JSON.parse(body)["tomatoURL"]);
        });
    };


//DO WHAT IT SAYS
  if (userCommand == "do-what-it-says") {

      fs.readFile("random.txt", "utf8", function(error, data) {
        var dataArr = data.split(",");
        var computerCommand = dataArr[0];
        computerSearch.push(dataArr[1])
        console.log(computerSearch)

//twitter trigger
  if (computerCommand == "my-tweets") {
    twitterFunction();
  };

//ComputerSpotify
  if (computerCommand == "spotify-this-song") {
    spotify.search({ type: 'track', query: computerSearch}, function(err, data) {

      if (err) {
        console.log('Error occurred: ' + err);
        return;
      } else {
        console.log("-----------------------reading from file random.txt");
        consoleSongs(data);
        console.log("-----------------------end reading from random.txt//////////////");
      }

      append("Artist: " + data.tracks.items[0].artists[0].name
        + " Song Title: " + data.tracks.items[0].name
        + " Link to Song: " + data.tracks.items[0].href
        + " Album: " + data.tracks.items[0].album.name)
    });
  };

//Computer Movie
  if (computerCommand == "movie-this") {
    // var computerSearch = computerSearch.replace(/'/g,"");
    //Type in no quotations and it works
    console.log(computerSearch);
    var queryUrl = "http://www.omdbapi.com/?t=" + computerSearch + "&y=&tomatoes=true&plot=short&r=json";

      request(queryUrl, function(error, response, body) {
        console.log(queryUrl)

        if (!error && response.statusCode == 200) {
          console.log("-----------------------reading from file random.txt");
          consoleMovies(body);
          console.log("-----------------------end reading from random.txt//////////////");
        }

        append("Title: " + JSON.parse(body)["Title"]
          + "Year: " + JSON.parse(body)["Year"]
          + "Country: " + JSON.parse(body)["Country"]
          + "Language: " + JSON.parse(body)["Language"]
          + "Plot: " + JSON.parse(body)["Plot"]
          + "Actors: " + JSON.parse(body)["Actors"]
          + "Rotten Tomatoes Rating: " + JSON.parse(body)["tomatoRating"]
          + "Rotten Tomatoes URL: " + JSON.parse(body)["tomatoURL"])
      });
  };

//ends readfile
});

//ends do-what-it-says
};
