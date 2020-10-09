const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const puppeteerScrapeScriptTag = require("./puppeteerScrapeScriptTag.js");
const puppeteerScrapeHTML = require("./puppeteerScrapeHTML.js");

async function spotify(artistID, RecursiveInsertRecord) {
  const $ = await puppeteerScrapeHTML(artistID);
  // creates accessable variables
  let rawSpotifyData;
  let artistName;
  let artistGenres = [];
  let cityData = [];
  let relatedArtistIDs = [];

  // Function to convert scrapeD html <script> tag string into json object
  const pullObject = new Promise(async function(resolve, reject) {
    // Loads Spotify data from <script> tag using cheerio
    rawSpotifyData = await puppeteerScrapeScriptTag(artistID);
    resolve(rawSpotifyData);
  });

  // Loads rawSpotifyData with Cheerio
  pullObject
    .then(
      // String slice function using rawSpotifyData
      function(rawSpotifyData) {
        // Slices string to convert into object containing Spotify data
        var spotifyDataString = rawSpotifyData.slice(36, -5);
        // console.log(spotifyDataString);

        // Returns spotifyDataString
        return spotifyDataString;
      }
    )
    .then(
      // Parses Spotify data into object function
      function(spotifyDataString) {
        // Parses Spotify data string into object
        spotifyObject = JSON.parse(spotifyDataString);

        // Returns spotify object

        return spotifyObject;
      }
    )
    .then(
      // Function to display object Spotify genre, city, and related artist data in console
      function(spotifyObject) {
        // Assigns spotifyObject.name to 'artistName' variable
        artistName = spotifyObject.name;

        // Assigns spotifyObject.genres to 'artistGenres' object
        artistGenres = spotifyObject.genres;

        // // Assigns spotifyObject.insights.cities to 'cityData' object
        cityData = spotifyObject.insights.cities;

        // Scrapes list of Spotify related artists with cheerio
        const relatedArtists = $(".cover.artist");
        $(".cover.artist").each(function() {
          var link = $(this).attr("href");
          // Slices to push only Spotify artist ID
          relatedArtistIDs.push({ id: link.slice(8) });
        });

        let scrapedata = {
          artist_ID: artistID,
          artist_name: artistName,
          artist_genres: artistGenres,
          cityData: cityData,
          relatedArtistIDs: relatedArtistIDs
        };
        // return scrapedata;
        RecursiveInsertRecord(scrapedata);
      }
    )
    .catch(function(error) {
      // Common error handling
      console.log("There was an error:\n\n" + error);
    });
}

module.exports = spotify;
