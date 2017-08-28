//Create all the variables that pull in the node commands
var command = process.argv[2];
var thing = process.argv[3];
var Twitter = require('twitter');
var params = {
    screen_name: 'ndll_ku',
    count: 20
    };
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

function myTweets() {
    //console.log("Tweet function called.");
    var client = new Twitter({
        consumer_key: 'ez4jmXe5MI1p1yAvasfBDrB8D',
        consumer_secret: 'PuG0vOQE0Xq8KTD6DjM8P7aEg2zIq7QF8PqoE6LvPFZnXUzUT8',
        access_token_key: '902203472954748929-F1pxjNwTMR4e5aUnUGpBH5gjKPQD8pm',
        access_token_secret: 'np9mElj3wcgGir8FpIZm7haM60r66ZzsDq243m8dpRwLT'
    });
 
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

function spotifyThis(thing) {
    //console.log("Spotify function called.");
}

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

function random() {
    //console.log("Read text function called.");
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }
    console.log(data);
    });
}