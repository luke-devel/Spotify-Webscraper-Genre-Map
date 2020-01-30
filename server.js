

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

// const mainLayoutView = require("./views/layouts/index.html");

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

