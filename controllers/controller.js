var express = require("express");
const db = require("../db/db.js");



const router = express.Router();


async function getGenreListeners(name){
    let arrayData = [];
    let data = await db.searchGenre(name);

    await data.dataValues.listeners.forEach(function(iter, i){
        if (i === 0){
            let bufferObj = {};
            bufferObj.count = iter.count;
            bufferObj.lat = iter.city.lat;
            bufferObj.lon = iter.city.lon;
            bufferObj.cityId = iter.cityId;
            arrayData.push(bufferObj);
        }
        else {
            let bufferObj = {};
            let dup = false;
            bufferObj.count = iter.count;
            bufferObj.lat = iter.city.lat;
            bufferObj.lon = iter.city.lon;
            bufferObj.cityId = iter.cityId;
            arrayData.forEach(function(iter2){
                if (iter2.cityId == bufferObj.cityId){
                    iter2.count += bufferObj.count;
                    dup = true;
                }
            })
            if (!dup){
                arrayData.push(bufferObj);
            };
        }
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



router.get('/api/:genre',function(req,res){

    getGenreListeners("Blues").then(function(data){
        convertToGeo(data).then(function(geoData){
            res.send(JSON.stringify(geoData))
        })
    })    
})

module.exports = router;