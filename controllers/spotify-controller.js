const db = require("../models");
const spotify = require("../cheerio-test/scrape.js");

module.exports = function (app) {

  // Get all Spotify data
  app.get("/api/all", function (req, res) {

    // Finding all and then returning them to the user as JSON.
    // Sequelize queries are asynchronous, which helps with perceived speed.
    // If we want something to be guaranteed to happen after the query, we'll use
    // the .then function
    db.Spotify.findAll({


    })
      .then(function (results) {
        // results are available to us inside the .then
        res.json(results);
      });

  });

  // Add an artist's location data and other data
  app.post("/api/newdata", function (req, res) {
    // let artistID = req.body.artistID
    let artistID = '3yY2gUcIsjMr8hjo51PoJ8'
    spotify(artistID, insertrecord);
    function insertrecord(scrapedata) {
      console.log("Spotify Data:");
      console.log(scrapedata);
      for (let i = 0; i < scrapedata.cityData.length; i++) {

        let record = {
          artist_ID: artistID,
          artist_name: scrapedata.artist_name,
          artist_genres: scrapedata.artist_genres[0],
          country: scrapedata.cityData[i].country,
          city: scrapedata.cityData[i].city,
          listeners: scrapedata.cityData[i].listeners
        }


        db.Spotify.create(record)

          .then(function (results) {
            // `results` here would be the newly created table with unique artist and location information
            // res.json(results);
            console.log(results);
          });
      }
      res.json("Insert scrape data");
    }
  });
};