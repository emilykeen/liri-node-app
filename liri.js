// At the top of the liri.js file, write the code you need to grab the data from keys.js. 
//Then store the keys in a variable.

var keys = require("./keys.js");
var Twitter = require('twitter');
var request = require("request");
var fs = require('fs');




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
    if ((process.argv[3]) === undefined) {
        song = ("The Sign");
        console.log('false');
    }
    request("https://api.spotify.com/v1/search?q=" + song + "&type=track&limit=1", function(error, response, body) {

        // If there were no errors and the response code was 200 (i.e. the request was successful)...
        if (!error && response.statusCode === 200) {

            //Artist(s)

            console.log("The artist is: " + JSON.parse(body).tracks.items[0].artists[0].name);
            // The song's name
            console.log("The song name is: " + JSON.parse(body).tracks.items[0].name);
            // A preview link of the song from Spotify
            console.log("A preview link of song: " + JSON.parse(body).tracks.items[0].preview_url);
            // The album that the song is from
            console.log("The album is: " + JSON.parse(body).tracks.items[0].album.name);


        }
    });








    //Artist(s)
    // The song's name
    // A preview link of the song from Spotify
    // The album that the song is from


    // if no song is provided then your program will default to
    // "The Sign" by Ace of Base



} else if (command === "movie-this") {
    var movie = (process.argv[3])

    if ((process.argv[3]) === undefined) {
        //if no user input for song, assign a song
        movie = ("Mr.Nobody");
        console.log('false');
        console.log("If you haven't watched 'Mr. Nobody,'then you should: http://www.imdb.com/title/tt0485947/")
        console.log("It's on Netflix!");
    }

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
            console.log("The movie's Rotten Tomatoes Rating is: " + JSON.parse(body).Ratings[1].Value)

        }
    });

} else if (command === "do-what-it-says") {

    fs.readFile("random.txt", "utf8", function(error, data) {
        //split data from random.txt using comma and store in an Array for use as parameters for function call
        var dataArr = data.split(",");
        console.log(dataArr);
        console.log(dataArr[0], dataArr[1]);
        song = (dataArr[1]);
        console.log(song);

        request("https://api.spotify.com/v1/search?q=" + song + "&type=track&limit=1", function(error, response, body) {

            // If there were no errors and the response code was 200 (i.e. the request was successful)...
            if (!error && response.statusCode === 200) {

                //Artist(s)

                console.log("The artist is: " + JSON.parse(body).tracks.items[0].artists[0].name);
                // The song's name
                console.log("The song name is: " + JSON.parse(body).tracks.items[0].name);
                // A preview link of the song from Spotify
                console.log("A preview link of song: " + JSON.parse(body).tracks.items[0].preview_url);
                // The album that the song is from
                console.log("The album is: " + JSON.parse(body).tracks.items[0].album.name);


            }
        });




    });
}