/////////////////////////////////////////////////////////////////////
// Auto scrapes Spotify artist data with user determined time interval
/////////////////////////////////////////////////////////////////////

// const inquirer = require('inquirer');
const { Sequelize } = require('sequelize');
const db = require("../models");
const spotify = require("../cheerio-test/scrape.js");


/////////////////////////////////////////////
/// Put your sql database password below! ///
/////////////////////////////////////////////

const sequelize = new Sequelize('spotify_db', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

// Initial Spotify artist ID determined to begin the auto scraping with related artists

let initialArtistID = '3yY2gUcIsjMr8hjo51PoJ8'

// Array idsToDo[] for every spotify artist id you wish to scrape
// these will be used if a scraped artist has no genre tags
// or if all related artists of a scraped artist are already in the database.
// Important: the final location of the array should contain 'done', this location
// will not be used as a scraped Spotify id.

let idsToDo = [
    '4MlLVFHiA4e7BU7vQ4r5Lh',
    '0LZac5VicY19QLaIUvIB0G',
    '2wOqMjp9TyABvtHdOSOTUS',
    '1Mxqyy3pSjf8kZZL4QVxS0'
]

console.log(`
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        | « « |   Spotify Artist Auto Web Scraper - Using node.js, cheerio, and sequelize  | » » |
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);

spotify(initialArtistID, insertrecord);

async function insertrecord(scrapedata) {

    console.log(`Next Spotify Artist (id: ${scrapedata.artist_ID}) scrapedata:`);

    // Checks if Spotify artist id is empty/undefined

    if (!Array.isArray(scrapedata.artist_genres) || !scrapedata.artist_genres.length) {
        console.log(`Spotify Artist (id: ${scrapedata.artist_ID}) artist_genres is empty. Moving to next id in idsToDo[] object. --> ${nextID}`);
        var nextID = idsToDo[0];
        spotify(nextID, insertrecord);
        idsToDo.shift();
    }

    // Will populate sql table if genres are defined

    else {

        // First for loop runs # of times depending on length of Spotify Artist's genre tags


        if (typeof scrapedata.cityData === "undefined" || typeof scrapedata.artist_genres === "undefined") {

            if (!Array.isArray(idsToDo) || !idsToDo.length) { // pre-populated id list array is empty

                console.log(`idsToDo[] list is now empty. Scraping is now complete.`);

            }
            else { // pre-populated id list array is not empty

                console.log(`Artist genre or city data is "undefined", Moving to next id in idsToDo[] object. --> ${idsToDo[0]}`);
                let nextID = idsToDo[0];
                spotify(idsToDo[0], insertrecord);
                idsToDo.shift();

            }

        }
        else {
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
                    }

                    await db.Spotify.create(record)
                        .then(function (results) {
                            // `results` here would be the newly created table with unique artist and location information
                            // res.json(results);
                        });
                }
            }
            
            findRelatedArtistID(scrapedata.relatedArtistIDs);

        }
    }
}



// function to return related artist ID that has not a duplicate of current artist id's
function findRelatedArtistID(relatedArtistIDs) {
    // Querys the database to find all of the current artist id's we have scraped
    // will be used to avoid duplicates
    sequelize.query('SELECT distinct artist_ID FROM spotify_db.spotifies;', { type: sequelize.QueryTypes.SELECT })
        .then(function (currentArtistIDs) {

            console.log(`Current Spotify artist id's in db`);

            console.log(currentArtistIDs);

            console.log(`New related Spotify artist id's in db`);

            console.log(relatedArtistIDs);

            let match = false;

            let idsToCheck = relatedArtistIDs;

            console.log(idsToCheck);

            for (let i = 0; i < currentArtistIDs.length; i++) { // runs n+1 times

                for (let j = 0; j < relatedArtistIDs.length; j++) { // runs n times

                    // checks if dup
                    if (relatedArtistIDs[j].id === currentArtistIDs[i].artist_ID) {

                        idsToCheck.splice(j, 1);

                        console.log(`Remaining unused id's`);
                        console.log(idsToCheck);

                    }

                }

            }

            // exit for loop
            if (!Array.isArray(idsToCheck) || !idsToCheck.length) { // if idsToCheck is empty

                if (!Array.isArray(idsToDo) || !idsToDo.length) { // pre-populated id list array is empty

                    console.log(`idsToDo[] list is now empty. Scraping is now complete.`);

                }
                else { // pre-populated id list array is not empty

                    console.log(`idsToCheck is empty. Moving to next id in idsToDo[] object. --> ${idsToDo[0]}`);
                    let nextID = idsToDo[0];
                    spotify(idsToDo[0], insertrecord);
                    idsToDo.shift();

                }

            }
            else { // if idsToCheck is not empty
                let nextID = idsToCheck[0].id;
                console.log(`remaining ids, choosing location 0: ${nextID}`);
                spotify(nextID, insertrecord);

            }

        });

}
