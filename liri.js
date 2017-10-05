var twitterKeys = require("./keys.js");
var twitter = require("twitter");
var client = new twitter(twitterKeys);

var request = require("request");

var Spotify = require('node-spotify-api');
var spotifyClientId = "582d9818c07f4826a1ce74a5d2a495cc";
var spotifyClientSecret = "9405bd40066e4b3cb0e1f6b90f0209cd";
 
var spotify = new Spotify({
  id: spotifyClientId,
  secret: spotifyClientSecret
});

var omdbQueryUrl = "http://www.omdbapi.com/?t=" + query + "&y=&plot=short&apikey=40e9cece";

var nodeArgs = process.argv;
var action = process.argv[2];
var query = "";

for (var i = 3; i < nodeArgs.length; i++) {
  if (i > 3 && i < nodeArgs.length) {
    query = query + "+" + nodeArgs[i];
  }
  else {
    query += nodeArgs[i];
  }
}

function myTweets() {

	var params = {screen_name: 'sircoppertron'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error) {
			for (var i = 0; i < 20; i++) {
				console.log("SirCopperSays: " + tweets[i].text);
				console.log("Tweeted on: " + tweets[i].created_at);
				console.log("-----------------------------------------");
			}
		}
	});
}

function spotifyThisSong(query) {
	spotify.search({ type: 'track', query: query }, function(error, data) {
		if (error) {
			return console.log('Error occurred: ' + err);
		}

		console.log("Artist: " + data.tracks.items[0].artists[0].name);
		console.log("Song Name: " + data.tracks.items[0].name) 
		console.log("Preview Link: " + data.tracks.items[0].album.external_urls.spotify)
		console.log("Album: " + data.tracks.items[0].album.name) 
	});
}

function movieThis(query) {

	request(omdbQueryUrl, function(error, response, body) {

		if (!error && response.statusCode === 200) {
	    console.log("Title: " + JSON.parse(body).Title);
	    console.log("Release Year: " + JSON.parse(body).Year);
	    console.log("IMDB Rating: " + JSON.parse(body).Ratings);
	    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings);
	    console.log("Country: " + JSON.parse(body).Country);
	    console.log("Language: " + JSON.parse(body).Language);
	    console.log("Plot: " + JSON.parse(body).Plot);
	    console.log("Actors: " + JSON.parse(body).Actors);
		}
	});
}

switch (action) {
	case "my-tweets":
	myTweets();
	break;

	case "spotify-this-song":
	spotifyThisSong(query);
	break;
	
	case "movie-this":
	movieThis(query);
	break;
}



// if no song is provided, program defaults to "The Sign" by Ace of Base

// check JSON.parse

// fix ratings search for omdb... one array with objects inside

// if user doesn't type in a movie, the program will default to Mr. Nobody

// command "do-what-it-says" uses fs node package to take text inside of random.txt and then use it to call one of Liri's commands