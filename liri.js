var twitterKeys = require("./keys.js");
var twitter = require("twitter");
var request = require("request");

var action = process.argv[2];
var query = process.argv[3];

var client = new twitter(twitterKeys);

var spotifyClientId = "582d9818c07f4826a1ce74a5d2a495cc";
var spotifyClientSecret = "9405bd40066e4b3cb0e1f6b90f0209cd";

var omdbKey = "40e9cece";

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

}

function movieThis(query) {

}

switch (action) {
	case "my-tweets":
	myTweets();
	break;

	// case "spotify-this-song":
	// spotifyThisSong(query);
	// break;

	// case "movie-this":
	// movieThis(query);
	// break;

}


// command "my-tweets" shows last 20 tweets and when they were created

// command "spotify-this-song <song name here>" will show artist(s), song's name, preview link, albums it's from
// if no song is provided, program defaults to "The Sign" by Ace of Base
// use node-spotify-api package to retrieve song info

// command "movie-this <movie name here>" will output title, year, IMDB rating, Rotten Tomatoes rating, country, language, plot, actors
// if user doesn't type in a movie, the program will default to Mr. Nobody

// command "do-what-it-says" uses fs node package to take text inside of random.txt and then use it to call one of Liri's commands