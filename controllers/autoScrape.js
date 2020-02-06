/////////////////////////////////////////////////////////////////////
// Auto scrapes Spotify artist data with user determined time interval
/////////////////////////////////////////////////////////////////////

// const inquirer = require('inquirer');
const { Sequelize } = require('sequelize');
const db = require("../models");
const spotify = require("../cheerio-test/scrape.js");

// Put your sql database password below
const sequelize = new Sequelize('spotify_db', 'root', "8901alool", {
    host: 'localhost',
    dialect: 'mysql'
});

// Initial Spotify artist ID determined to begin the auto scraping with related artists

let initialArtistID = '4x1nvY2FN8jxqAFA0DA02H'


console.log(`
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        | « « |   Spotify Artist Auto Web Scraper - Using cheerio, sequelize, and node.js   | » » |
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);

spotify(initialArtistID, insertrecord);

let newArtistID;

async function insertrecord(scrapedata) {

    // console.log(returnRelatedArtistID(scrapedata.relatedArtistIDs))

    // setTimeout(function () { console.log("Hello"); }, 1000);

    // First for loop runs # of times depending on length of Spotify Artist's genre tags

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

    returnNextRelatedArtistID(scrapedata.relatedArtistIDs);
    console.log(`new artist id= ${newArtistID}`);
}



// function to return related artist ID that has not a duplicate of current artist id's
function returnNextRelatedArtistID(relatedArtistIDs) {
    // Querys the database to find all of the current artist id's we have scraped
    // will be used to avoid duplicates
    sequelize.query('SELECT distinct artist_ID FROM spotify_db.spotifies;', { type: sequelize.QueryTypes.SELECT })
        .then(function (currentArtistIDs) {

            console.log(`current artist id's in db`);

            console.log(currentArtistIDs);

            console.log(`related artist id's in db - always will be 4`);

            console.log(relatedArtistIDs);


            let match = false;

            let nonDuplicate = 0;

            for (let i = 0; i < currentArtistIDs.length; i++) { // runs n+1 times

                for (let j = 0; j < relatedArtistIDs.length; j++) { // runs n times

                    // checks if dup
                    if (relatedArtistIDs[j].id === currentArtistIDs[i].artist_ID) {

                        console.log(`there was a duplicate at current artist ${i}: ${currentArtistIDs[i].artist_ID} and related artist ${j} ${relatedArtistIDs[j].id}`);

                        match = true;

                        if (nonDuplicate !== relatedArtistIDs.length) {
                            nonDuplicate++;
                        }

                        console.log(`duplicate found at location ${j}, nonDup location now ${nonDuplicate}, artist id: ${relatedArtistIDs[j].id}`);

                    }


                }


            }

            // exit for loop
            if (nonDuplicate !== relatedArtistIDs.length) {
                console.log(`final non dup location = ${nonDuplicate}, artist id to return: ${relatedArtistIDs[nonDuplicate].id}`);
                newArtistID = relatedArtistIDs[nonDuplicate].id;
                spotify(newArtistID, insertrecord);
            }
            else {
                console.log(`All related artist id's are duplicates. stopping.`);
            }
        });


    // let nextArtistID = 'RETURN - next id is: 0fgYKF9Avljex0L9Wt5b8Z';

    // return nextArtistID;
}

function returnRelatedArtists(artist_ID) {
    console.log(artist_ID);

    return artist_ID;

}

