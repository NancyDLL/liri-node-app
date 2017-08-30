//Create all the variables that pull in the node commands
var command = process.argv[2];
var thing = process.argv[3];
var Twitter = require('twitter');
var params = {
    screen_name: 'ndll_ku',
    count: 20
    };
var keys = require('./keys');
var client = new Twitter(keys.twitterKeys);
var Spotify = require('node-spotify-api');
var spotify = new Spotify({
    id: 'c1c1927486ea45999cfe4f25ea20951b',
    secret: 'a0fdeda5c3664887bd192b8ac9871b79'
    });
var request = require('request');
var fs = require("fs");

//Switch break statement to direct to the next function the user wanted
switch (command) {
    case 'my-tweets':
        myTweets();
        break;
    case 'spotify-this-song':
        spotifyThis(thing);
        break;
    case 'movie-this':
        movieThis(thing);
        break;
    case 'do-what-it-says':
        random();
        break;
}

//Tweet function START
function myTweets() {
    //console.log("Tweet function called.");
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (i = 0; i < tweets.length; i++) {
                var number = i + 1;
                console.log('--------------------');
                console.log([i + 1] + '. ' + tweets[i].text);
                console.log('Tweeted on: ' + tweets[i].created_at);
                console.log('--------------------');
            }
        }
    });
}
//Tweet function END

//Spotify function START
function spotifyThis(thing) {
    //console.log("Spotify function called.");
     if (thing == null) {
        thing = 'The Sign';
    }
    spotify.search({
    	type: 'track',
    	query: thing 
    }, function(error, data) {
        if (error) {
        	console.log('Error occurred: ' + error);
        	return;
			}
            console.log('--------------------');
            console.log('Artist: ' + data.tracks.items[0].artists[0].name);
            console.log('Song: ' + data.tracks.items[0].name);
            console.log('Preview Link: ' + data.tracks.items[0].preview_url);
            console.log('Album: ' + data.tracks.items[0].album.name);
            console.log('--------------------');
    });
}
//Spotify function END

//OMDB function START
function movieThis(thing) {
    //console.log("OMDB function called.");
    request("http://www.omdbapi.com/?t="+thing+"&y=&plot=short&apikey=40e9cece", function(error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log('--------------------');
            console.log('Title: ' + JSON.parse(body).Title);
            console.log('Year: ' + JSON.parse(body).Year);
            console.log('IMDb Rating: ' + JSON.parse(body).imdbRating);
            console.log('Country: ' + JSON.parse(body).Country);
            console.log('Language: ' + JSON.parse(body).Language);
            console.log('Plot: ' + JSON.parse(body).Plot);
            console.log('Actors: ' + JSON.parse(body).Actors);
            console.log('--------------------');
        }
    });
}
//OMDB function END

function random() {
    //console.log("Read text function called.");
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }
    console.log(data);
    });
}