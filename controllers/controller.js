var express = require("express");
const db = require("../db/db.js");
const models = require('../models');



const router = express.Router();

// takes in genre name from client's search
async function getGenreListeners(name){
    let arrayData = [];
    // Searches sql db for genre name
    let data = await db.searchGenre(name);

    // Returns obect of spotify listner count for each city from Sequelize query above
    // We also return the lat and long values of the city
    await data.dataValues.listeners.forEach(function(iter, i){
            let bufferObj = {};
            bufferObj.count = iter.count;
            bufferObj.lat = iter.city.lat;
            bufferObj.lon = iter.city.lon;
            arrayData.push(bufferObj);
        
    })
    return await arrayData;
}

// 
function makePropObj(item){
    let obj = {"properties": { "point_count": item.count}, "geometry":{"type": "Point", "coordinates": [ item.lon, item.lat ]}}
    return obj;
}

// Takes result data from getGenreListeners(), and converts into a single GEOJSON object for Mapbox
async function convertToGeo(array){
    let bufferArray = [];

    // 
    await array.forEach(function(iter){
        let bufferObj = makePropObj(iter);
        bufferArray.push(bufferObj);
    })

    let geoData = {"type": "FeatureCollection","crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },"features":  bufferArray };
    return geoData;
}


router.get('/', (req, res) => res.sendFile(path.join(__dirname, "../public-static/index.html")));



router.get('/api/genre/:genre',async function(req,res){
    getGenreListeners(req.params.genre).then(function(data){
        // Data from getGenreListeners() passed to convertToGeo()
        convertToGeo(data).then(function(geoData){
            res.json(geoData);
        })
    })
    .catch(function(err){
        res.send("No value for genre exist in database. ");
    })    
})

router.get('/api/genre/', async function(req,res){
    res.json( await models.genre.findAll());
})




module.exports = router;