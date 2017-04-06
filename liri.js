// At the top of the liri.js file, write the code you need to grab the data from keys.js. 
//Then store the keys in a variable.

var keys = require("./keys.js");
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require("request");
var fs = ('fs');




// Make it so liri.js can take in one of the following commands:
// my-tweets
// spotify-this-song
// movie-this
// do-what-it-says


var command = (process.argv[2])
if (command === "my-tweets") {

    var client = new Twitter({
        //use our keys stored in keys.js
        consumer_key: keys.twitterKeys.consumer_key,
        consumer_secret: keys.twitterKeys.consumer_secret,
        access_token_key: keys.twitterKeys.access_token_key,
        access_token_secret: keys.twitterKeys.access_token_secret
    });
    //set the parameters for the twitter person and number of tweets
    var params = ({
        screen_name: 'POTUS',
        count: '20'
    });
    //make the call to twitter to get the tweet texts
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            //if no errors start a loop
            for (var i = 0; i < tweets.length; i++) {
                //console the tweet text and date, time created
                console.log('%s \n %s', tweets[i].created_at, tweets[i].text);
            }
        }
    });
} else if (command === "spotify-this-song") {

    var song = (process.argv[3])

    spotify.search({
        type: 'track',
        query: song
    }, function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }
        // for (var i = 0; i < data.length; i++) {
            console.log(JSON.stringify(data.tracks.items[0].name));
            console.log(JSON.stringify(data.album.items[0].name));
        
    });




    //Artist(s)
    // The song's name
    // A preview link of the song from Spotify
    // The album that the song is from


    // if no song is provided then your program will default to
    // "The Sign" by Ace of Base



} else if (command === "movie-this") {
    var movie = (process.argv[3])

    // We then run the request module on a URL with a JSON
    request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&r=json", function(error, response, body) {

        // If there were no errors and the response code was 200 (i.e. the request was successful)...
        if (!error && response.statusCode === 200) {

            // * Title of the movie.
            console.log("The movie's title is: " + JSON.parse(body).Title);
            // * Year the movie came out.
            console.log("The movie came out in : " + JSON.parse(body).Released);
            // * IMDB Rating of the movie.
            console.log("The movie's IMDB rating is: " + JSON.parse(body).imdbRating);
            // * Country where the movie was produced.
            console.log("The movie was produced in: " + JSON.parse(body).Country);
            // * Language of the movie.
            console.log("The movie's language is: " + JSON.parse(body).Language);
            // * Plot of the movie.
            console.log("The movie's plot is: " + JSON.parse(body).Plot);
            // * Actors in the movie.
            console.log("The movie's actors are: " + JSON.parse(body).Actors);
            // * Rotten Tomatoes Rating.
            console.log("The movie's Rotten Tomatoes rating is: " + JSON.parse(body).Ratings.Value);


        }
    });

} else if (command === "do-what-it-says") {

    console.log();
}