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

const sequelize = new Sequelize('spotify_db', 'root', 'logmein1440', {
    host: 'localhost',
    dialect: 'mysql'
});

// Initial Spotify artist ID determined to begin the auto scraping with related artists

let initialArtistID = '2ZT8ZdbkPMp2NR6pj4KBTA'

// Array idsToDo[] for every spotify artist id you wish to scrape
// these will be used if a scraped artist has no genre tags
// or if all related artists of a scraped artist are already in the database.
// Important: the final location of the array should contain 'done', this location
// will not be used as a scraped Spotify id.

let idsToDo = [
    '7290H8m1Dwt8G7jm1y9CQx',
    '4gZRt9wlRx1IsxT9glJdrc',
    '2s4tjL6W3qrblOe0raIzwJ',
    '08j69Ndyx1P7RLO3Janb5P',
    '7gPBpCNPTXfU4B6GJ17CwL',
    '3LTXHU3DhiYzGIgF2PP8Q8',
    '3CYSRCHfilgR8DSbkCMp5j',
    '3sGAu5R982Tf4ZuU2JfV55',
    '0PFtn5NtBbbUNbU9EAmIWF',
    '2tQ6tsfdwvkyaxc5Lgenve',
    '55AfCsXWthqoG9dDIGqVrD',
    '1TUV4aQaccFqDVf0ZTMjdd',
    '4xoV3kh3rwrWaPc17zyDyY',
    '3TScZ6zJkavDy0tqoGqiCf',
    '0Mk6GS1Xr5tqlQyPNkMZzx',
    '3g2kUQ6tHLLbmkV7T4GPtL',
    '5CdQg6KJxqQhivrp6h56yu',
    '4nMMOojbg03LrgAN3uOjZF',
    '4mQTeNHQBqoPMzBJ7CtXk1',
    '7HeVXdOdMhLslVputGTZFQ',
    '6LaSaTrnIFBfXIf2wPcPh7',
    '6LaSaTrnIFBfXIf2wPcPh7',
    '2jCjj3atiDT70VeEshQbOr',
    '2jCjj3atiDT70VeEshQbOr',
    '7x83XhcMbOTl1UdYsPTuZM',
    '4DbBi3EWMhdHMnX8WqRIev',
    '49Jb7NSMLFMM3n8M7BNRxN',
    '08j69Ndyx1P7RLO3Janb5P',
    '4Sw0SFu1fFdYXdAEVdrqnO',
    '0LVrQUinPUBFvVD5pLqmWY',
    '1t2nIJhGNaRYl1fzg5YdnZ',
    '6RQYBkLRRorffqf3eZXrqi',
    '1fVuAu44fmm57gZh10lbDZ',
    '7HeVXdOdMhLslVputGTZFQ',
    '38u18VoGaIwVeSyVoA0eU5',
    '3r6Sk3pYxdJk7MekhBGgMR',
    '5T7u5bYO62WTYOk5RBZwjo',
    '5v15e125hR9WhmRg4HCwM7',
    '0LVrQUinPUBFvVD5pLqmWY',
    '6DdzNsmghFtH7toJKhQfF6',
    '3LTXHU3DhiYzGIgF2PP8Q8',
    '5rlSHZmlVWsbIX8mNHGhSf',
    '4wQ4PEx8pDp2f0wpsvaSDF',
    '7HeVXdOdMhLslVputGTZFQ',
    '5pcEHWCNZTvpZ2Ap1WmvDi',
    '6oBm8HB0yfrIc9IHbxs6in',
    '2ueoLVCXQ948OfhVvAy3Nn',
    '2aVHDjRHRM7dcFkGwahXLG',
    '7290H8m1Dwt8G7jm1y9CQx',
    '4EYVgfZJ8wKXWmIvCx3gOY',
    '6EVeEkSL6F5Ro2EO4f9Qtn',
    '2lP3Fx1aGCbQvH1F6i5Qeg',
    '756Li3sKcK4EdDiniLPqRl',
    '3jZdaJw0Pl47jwJ1kHQCOD',
    '4Pt1HZtuJwrQB8l0ES5iTX',
    '6R8OZtD9TL5Wki7Shzm8fb',
    '00FQb4jTyendYWaN8pK0wa',
    '69VgCcXFV59QuQWEXSTxfK',
    '1fVuAu44fmm57gZh10lbDZ',
    '22sut8GkPEtijBsEAiyqMq',
    '1rKrEdI6GKirxWHxIUPYms',
    '5zjaF8JUdylMWrA7AVo3hJ',
    '4ACplpEqD6JIVgKrafauzs',
    '64RBScSzzcUegqlm1nqZgK',
    '6VspxFnjlxsiVajgzAlczT',
    'a1EYf40EekcYRrcOSJTjz,',
    '4beH3iHMIGpMVDMenRuhBU',
    '22sut8GkPEtijBsEAiyqMq',
    '4ZKIf1mbtchoPebHfyt3Wf',
    '5Ur5zIW1k5I35ZkIHJ7m4m',
    '5LduSqZcuqh7KzCly7B4w4',
    '5ZW7HlSuZz8ng2X21cXbdP',
    '5PpBa5lqZ9ppWbtqoo6ZNM',
    '0xbwBKuWBNWfDBFsrRJEJG',
    '7qyiNRqee4a5CwVQssFs1e',
    '0u2oBlJ2j7FktRI3RFJh3F',
    '1b2U0VT1Z4ACqOihBL1fgw',
    '4Q82S0VzF8qlCb4PnSDurj',
    '1OA8GRrm0ob37nqS7eti3g',
    '37f9cjf8Ic4t7vYNRYAzI7',
    '37f9cjf8Ic4t7vYNRYAzI7',
    '4DWnSG0RYPAds8EIKY26q3',
    '72X6FHxaShda0XeQw3vbeF',
    '3Oim8XBPbznAa8Jj8QzNc8',
    '37vyuuwsFgOYcj0DJ8HvH5',
    '17iHuatto9jeTHy6ieERbQ',
    '4ZKIf1mbtchoPebHfyt3Wf',
    '5Ur5zIW1k5I35ZkIHJ7m4m',
    '1BQtFnxZvAvTCZgTMlED0Q',
    '12VaqyEhgwDRuFfEqbnrpz',
    '5EP020iZcwBqHRnJftibXX',
    '50sSN9E5i4DJzYDclAXlSo',
    '7JRs0G0kHZTBs0Lo7qOjL8',
    '3p09Xo74wvIzRnutSuFefd',
    '4mw86zm4QZIL8SksdyE6OU',
    '4xoV3kh3rwrWaPc17zyDyY',
    '5C0gCCG8N5Dh5dZytIgzLX',
    '67L6zwXACth47hcQuZUDQd',
    '7JRs0G0kHZTBs0Lo7qOjL8',
    '0vMRs6rEURwcW2W0ryXPvw',
    '5tJkFhZAak0gv7wjR2m7tC',
    '1I5Cu7bqjkRg85idwYsD91',
    '2YgOXjE34QUTy7FqAg535R',
    '34iihyClpQuFyH0vpe2yqF',
    '5V0MlUE1Bft0mbLlND7FJz',
    '5aj3LEYRbuaabjjHkj5oE1',
    '44ejFPE33H5aOInxNV2BFP',
    '5EP020iZcwBqHRnJftibXX',
    '7IEGL467O1wnwmOPR880mQ',
    '4VpWzXVUAR2YyQuWQpNGAf',
    '2wOqMjp9TyABvtHdOSOTUS',
    '1Mxqyy3pSjf8kZZL4QVxS0',
    '4l8xPGtl6DHR2uvunqrl8r',
    '1C1x4MVkql8AiABuTw6DgE',
    '69lxxQvsfAIoQbB20bEPFC',
    '4MlLVFHiA4e7BU7vQ4r5Lh',
    '0LZac5VicY19QLaIUvIB0G',
    '3apLA4vM37l7KbHOvpyPIc',
    '0tQ2Q4y9iUkKszxXyB14ZH',
    '4ypou4nriO8G6UiKe570cz',
    '0fgYKF9Avljex0L9Wt5b8Z',
    '4O03DeUfk2RJLH1Kogz6TV',
    '0g15pJOpHp0RMVScdAXzLH',
    '4HCubdy7diarb4KZo8etrq',
    '5jevkWdPouBhKNpJu1DOyO',
    '5VGTPoHhpTdztKCnGJy6ZE',
    '78Ozb71IkZIlRDzyK9YNXx',
    '1nJvji2KIlWSseXRSlNYsC',
    '5MWBg16f5UYiaSlyVhzlIW',
    '4UETUdF77BfyJ7fEFVztr3',
    '63MQldklfxkjYDoUE4Tppz',
    '0amkRUGmrpprSUUMlSuISB',
    '5kyTqxwLNQk50dJZIzFQuq',
    '0hrb5WRiNlj8vh3WnCgXFq',
    '3D9J9nPNW1cBktx5apJq4V',
    '3REqunOj76TSpw9f6eKON2',
    '2JSjCHK79gdaiPWdKiNUNp',
    '5CG9X521RDFWCuAhlo6QoR',
    '2sf2owtFSCvz2MLfxmNdkb',
    '1vgjN6nIPNKiiQGE9PtzTT',
    '2ycnb8Er79LoH2AsR5ldjh',
    '2wOqMjp9TyABvtHdOSOTUS',
    '0eGh2jSWPBX5GuqIHoZJZG',
    '09hVIj6vWgoCDtT03h8ZCa',
    '2efzHZrUGhawnSOTpyAHOQ',
    '1rJkz5vopfGxTUGFNB3o4G',
    '2c9yn5DJQd5es7YMY92ikZ',
    '1N5oRpOIshVJwICjXqkHPW',
    '6WoTvA9qinpHtSRJuldYh6',
    '7bu3H8JO7d0UbMoVzbo70s',
    '3CkvROUTQ6nRi9yQOcsB50',
    '3qm84nBOXUEQ2vnTfUTTFC',
    '6olE6TJLqED3rqDCT0FyPh',
    '7LuYiSXiWs86rwWJjEEgB9',
    '1XIIxzmo6BNRR4QkImSdsX',
    '3GTaO7e3uPaG0SJR7Hxy8L',
    '4t7bXPFEPe0pu1ozhdDLOp',
    '5O0RrEgz4NLCPLrDZiPggz',
    '6tbjWDEIzxoDsBA1FuhfPW',
    '18jZvCsW1PJ4FDQ5gEXuKp',
    '2JIf5JxI3ypOSfrfNIIMQE',
    '0Cx9SrMKbfrkHvnqJLHq6b',
    '4m8zzr6DNSW4tkuyGHvF7h',
    '2aFm5gM8lQefcKzOvP2eH8',
    '0Rh2F37PiLjhYaERywNulu',
    '0epOFNiUfyON9EYx7Tpr6V',
    '0SDMI2Gkjubw3ol5p5fKtX',
    '3Eeb1U0VJTDaFpBHV4DmHl',
    '3uwAm6vQy7kWPS2bciKWx9',
    '5Z3IWpvwOvoaWodujHw7xh',
    '4gHs8pWsgZpndQZKs6QVRH',
    '6UUrUCIZtQeOf8tC0WuzRy',
    '7MSUfLeTdDEoZiJPDSBXgi',
    '29XOeO6KIWxGthejQqn793',
    '1e7ePqINXwh9BthP2XQOox',
    '2CIMQHirSU0MQqyYHq0eOx',
    '5NtMqQLCzdVvL7F8vFp3zM',
    '0qEO82Hj3SvjoNyEfKpRku',
    '2Gu6Q05ExIGwHTF43kqLBI',
    '5RADpgYLOuS2ZxDq7ggYYH',
    '6Q0gMZJNIebNFFaJeonc11',
    '4G6HhUUQ1LgyYnA2WJppf8',
    '2wPDbhaGXCqROrVmwDdCrK'
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
                    console.log(`idsToDo length: ${idsToDo.length}`);
                    spotify(idsToDo[0], insertrecord);
                    idsToDo.shift();

                }

            }
            else { // if idsToCheck is not empty

                if (!Array.isArray(idsToDo) || !idsToDo.length) { // pre-populated id list array is empty

                    console.log(`idsToDo[] list is now empty. Scraping is now complete.`);

                }
                else { // pre-populated id list array is not empty

                    console.log(`Id's remaining are non-duplicates, choosing location 0: ${idsToCheck[0].id}`);
                    console.log(`idsToDo length: ${idsToDo.length}`);
                    spotify(idsToCheck[0].id, insertrecord);

                }

            }

        });

}