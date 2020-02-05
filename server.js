const fs = require('fs');

// Server.js - This file is the initial starting point for the Node/Express server.
// *********************************************************************************

// Dependencies
// =============================================================

var express = require("express");
var db = require("./models");
var router = require('./controllers/controller')

// Sets up the Express App
// =============================================================
var PORT  = process.env.PORT|| 8080;
var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("./public-static"));
app.use(express.static(__dirname + '/spotifyGenres.json'));z

// Routes
// =============================================================
app.use(router);


// =============================================================
//Syncs database 
db.sequelize.sync({ }).then(function() {

// Starts the server to begin listening
    app.listen(PORT, function() {
        console.log("Listening on port %s", PORT);

    });

});
