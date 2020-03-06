/////////////////////////////////////////////////////////////////////
// Auto scrapes Spotify artist data with user determined time interval
/////////////////////////////////////////////////////////////////////

// const inquirer = require('inquirer');
const { Sequelize } = require("sequelize");
const db = require("../models");
const spotify = require("./scrape.js");

/////////////////////////////////////////////
/// Put your sql database password below! ///
/////////////////////////////////////////////

const sequelize = new Sequelize(
  "spotify_db",
  "root",
  "logmein1440",
  {
    host: "localhost",
    dialect: "mysql"
  }
);

// Initial Spotify artist ID determined to begin the auto scraping with related artists

let initialArtistID = "2xvtxDNInKDV4AvGmjw6d1";

// Array idsToDo[] for every spotify artist id you wish to scrape
// these will be used if a scraped artist has no genre tags
// or if all related artists of a scraped artist are already in the database.
// Important: the final location of the array should contain 'done', this location

// will not be used as a scraped Spotify id.

//define idsToDo
let idsToDo = [];

sequelize
  .query("SELECT distinct artistID FROM spotify_db.idstoscrape;", {
    type: sequelize.QueryTypes.SELECT
  })
  .then(function(currentArtistIDs) {
    idsToDo = currentArtistIDs;
  });

console.log(`
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        | « « |   Spotify Artist Auto Web Scraper - Using node.js, puppeteer, cheerio, and sequelize  | » » |
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);

async function insertrecord(scrapedata) {
  console.log(`Next Spotify Artist (id: ${scrapedata.artist_ID}) scrapedata:`);

  // Checks if Spotify artist id is empty/undefined

  if (
    !Array.isArray(scrapedata.artist_genres) ||
    !scrapedata.artist_genres.length
  ) {
    console.log(
      `artist_genres of (${scrapedata.artist_name}: ${scrapedata.artist_ID}) is empty.`
    );
    if (!Array.isArray(idsToDo) || !idsToDo.length) {
      // pre-populated id list array is empty

      console.log(`idsToDo[] list is now empty. Scraping is now complete.`);
    } else {
      // pre-populated id list array is not empty

      console.log(
        `Artist genre or city data is "undefined", Moving to next id in idsToDo[] object. --> ${idsToDo[0]}`
      );
      let nextID = idsToDo[0].artistID;
      spotify(idsToDo[0].artistID, insertrecord);
      idsToDo.shift();
    }
  }

  // Will populate sql table if genres are defined
  else {
    // First for loop runs # of times depending on length of Spotify Artist's genre tags

    if (
      typeof scrapedata.cityData === "undefined" ||
      typeof scrapedata.artist_genres === "undefined"
    ) {
      if (!Array.isArray(idsToDo) || !idsToDo.length) {
        // pre-populated id list array is empty

        console.log(`idsToDo[] list is now empty. Scraping is now complete.`);
      } else {
        // pre-populated id list array is not empty

        console.log(
          `Artist genre or city data is "undefined", Moving to next id in idsToDo[] object. --> ${idsToDo[0].artistID}`
        );
        let nextID = idsToDo[0].artistID;
        spotify(idsToDo[0].artistID, insertrecord);
        idsToDo.shift();
      }
    } else {
      for (let j = 0; j < scrapedata.artist_genres.length; j++) {
        // Second for loop runs # of times depending on length of Spotify cityData length

        for (let i = 0; i < scrapedata.cityData.length; i++) {
          let record = {
            artist_ID: scrapedata.artist_ID,
            artist_name: scrapedata.artist_name,
            artist_genres: scrapedata.artist_genres[j],
            country: scrapedata.cityData[i].country,
            city: scrapedata.cityData[i].city,
            listeners: scrapedata.cityData[i].listeners
          };

          await db.Spotify.create(record).then(function(results) {
            // `results` here would be the newly created table with unique artist and location information
            // res.json(results);
          });
        }
      }

      findRelatedArtistID(scrapedata.relatedArtistIDs);
    }
  }
}

spotify(initialArtistID, insertrecord);

// function to return related artist ID that has not a duplicate of current artist id's
function findRelatedArtistID(relatedArtistIDs) {
  // Querys the database to find all of the current artist id's we have scraped
  // will be used to avoid duplicates
  sequelize
    .query("SELECT distinct artist_ID FROM spotify_db.spotifies;", {
      type: sequelize.QueryTypes.SELECT
    })
    .then(function(currentArtistIDs) {
      console.log(`Current Spotify artist id's in db`);

      console.log(currentArtistIDs);

      let idsToCheck = relatedArtistIDs;

      for (let i = 0; i < currentArtistIDs.length; i++) {
        // runs n+1 times

        for (let j = 0; j < relatedArtistIDs.length; j++) {
          // runs n times

          // checks if dup
          if (relatedArtistIDs[j].id === currentArtistIDs[i].artist_ID) {
            idsToCheck.splice(j, 1);

            console.log(`Remaining unused id's from Spotify related artist`);
            console.log(idsToCheck);
          }
        }
      }

      // exit for loop
      if (!Array.isArray(idsToCheck) || !idsToCheck.length) {
        // if idsToCheck is empty

        if (!Array.isArray(idsToDo) || !idsToDo.length) {
          // pre-populated id list array is empty

          console.log(`idsToDo[] list is now empty. Scraping is now complete.`);
        } else {
          // pre-populated id list array is not empty

          console.log(
            `idsToCheck is empty. Moving to next id in idsToDo[] object. --> ${idsToDo[0].artistID}`
          );
          console.log(`idsToDo length: ${idsToDo.length}`);
          spotify(idsToDo[0].artistID, insertrecord);
          idsToDo.shift();
        }
      } else {
        // if idsToCheck is not empty

        console.log(
          `Id's remaining are non-duplicates, choosing location 0: ${idsToCheck[0].id}`
        );
        console.log(`idsToDo length: ${idsToDo.length}`);
        spotify(idsToCheck[0].id, insertrecord);
      }
    });
}
