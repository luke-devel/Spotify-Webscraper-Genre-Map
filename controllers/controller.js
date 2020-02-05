var express = require("express");
const db = require("../db/db.js");
const models = require('../models');



const router = express.Router();


async function getGenreListeners(name){
    let arrayData = [];
    let data = await db.searchGenre(name);

    await data.dataValues.listeners.forEach(function(iter, i){
            let bufferObj = {};
            bufferObj.count = iter.count;
            bufferObj.lat = iter.city.lat;
            bufferObj.lon = iter.city.lon;
            arrayData.push(bufferObj);
        
    })
    return await arrayData;
}

function makePropObj(item){
    let obj = {"properties": { "point_count": item.count}, "geometry":{"type": "Point", "coordinates": [ item.lon, item.lat ]}}
    return obj;
}

async function convertToGeo(array){
    let bufferArray = [];

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
        convertToGeo(data).then(function(geoData){
            res.send(JSON.stringify(geoData))
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