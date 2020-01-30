const request = require('request');
const cheerio = require('cheerio');

const fs = require('fs');
function spotify(artistID, insertrecord){




request('https://open.spotify.com/artist/' + artistID + '/about', (error, response, html) => {
    if (!error && response.statusCode == 200) {

        // Loads html page into cheerio
        const $ = cheerio.load(html);

        // creates accessable variables
        let rawSpotifyData;
        let artistName;
        let artistGenres = [];
        let cityData = [];
        let relatedArtistIDs = [];

        // Function to convert scrapeD html <script> tag string into json object
        const pullObject = new Promise(function (resolve, reject) {
            // Loads Spotify data from <script> tag using cheerio
            rawSpotifyData = $('script')[7].children[0].data;
            resolve(rawSpotifyData);
        });



        // Loads rawSpotifyData with Cheerio
        pullObject
            .then
            // String slice function using rawSpotifyData
            (function (rawSpotifyData) {

                // Slices string to convert into object containing Spotify data
                var spotifyDataString = rawSpotifyData.slice(48, -6);

                // Returns spotifyDataString
                return (spotifyDataString);
            })
            .then
            // Parses Spotify data into object function
            (function (spotifyDataString) {

                // Parses Spotify data string into object
                spotifyObject = JSON.parse(spotifyDataString);
                // Returns spotify object
                return (spotifyObject);
            })
            .then
            // Function to display object Spotify genre, city, and related artist data in console
            (function (spotifyObject) {

                console.log('\n~~~~~~~~~~~~~~~~~~~~ Spotify Web Scraping Using Cheerio ~~~~~~~~~~~~~~~~~~~~');

                // Assigns spotifyObject.name to 'artistName' variable
                artistName = spotifyObject.name

                // Displays Spotify artist name of specified artist id
                // artistGenres is an object of current Spotify artist genres
                // console.log('\nArtist Name: ' + artistName);

                // // Display Spotify artist ID
                // console.log('\nArtist ID: ' + arstistID);


                // Assigns spotifyObject.genres to 'artistGenres' object
                artistGenres = spotifyObject.genres;

                // // Displays Spotify genres of specified artist
                // console.log('\nArtist Genres:');

                // // artistGenres is an object of current Spotify artist genres
                // console.log(artistGenres);

                // // Assigns spotifyObject.insights.cities to 'cityData' object
                cityData = spotifyObject.insights.cities;

                // // Displays Spotify city listener data of specified artist
                // console.log('\nArtist Cities With Listener Data:')

                // // cityData is an object of current Spotify artist city listener data
                // console.log(cityData);

            

                // Scrapes list of Spotify related artists with cheerio
                const relatedArtists = $('.cover.artist');
                $('.cover.artist').each(function () {
                    var link = $(this).attr('href');
                    // Slices to push only Spotify artist ID
                    relatedArtistIDs.push({ "id": link.slice(8) });
                });

                //     // Displays Spotify related artist IDs to console.
                //     console.log('\nRelated artist Ids:');

                //     // relatedArtistIDs is an object of related artists to the current Spotify artist
                //     console.log(relatedArtistIDs);

                //     console.log('\n ~~~~~~~~~~~~~~~~~~~~ Scraping Complete ~~~~~~~~~~~~~~~~~~~~');
                // },


                let scrapedata = {
                    artist_ID: artistID,
                    artist_name: artistName,
                    artist_genres: artistGenres,
                    cityData: cityData

                }

                console.log(scrapedata);

                // return scrapedata;
                insertrecord(scrapedata);

            }).catch(

                function (error) {
                    // Common error handling
                    console.log('There was an error:\n\n' + error);
                }
            );
    }
});

};

module.exports = spotify;