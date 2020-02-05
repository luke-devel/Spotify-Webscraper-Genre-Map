const fs = require('fs');

// Server.js - This file is the initial starting point for the Node/Express server.
// *********************************************************************************

// Dependencies
// =============================================================

var express = require("express");
var db = require("./models");


// Sets up the Express App
// =============================================================
var PORT  = process.env.PORT|| 8080;
var app = express();



app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("./public-static"));
app.use(express.static(__dirname + '/spotifyGenres.json'));

app.get('/api/genres', function spotGenreList(request, response){
    var tempFile="./spotifyGenres.json";
   
    fs.readFile(tempFile, function (err,data){
  
       response.contentType("application/json");
       response.send(data);
       console.log(data);
    
        if (err) {
       console.log(err);
        }
    
    });
});
// app.get('/api/genredata', function spotGenreDataGet(request, response){
//     console.log("getting!");
//     console.log(postValues)
// });
// app.post('/api/genredata', function spotGenreDataPost(request, response){
// console.log("posting!");
// });
// Routes
// =============================================================
require("./controllers/spotify-controller.js")(app);


// =============================================================
//Syncs database 
db.sequelize.sync({ }).then(function() {

// Starts the server to begin listening
    app.listen(PORT, function() {
        console.log("Listening on port %s", PORT);

    });

});

