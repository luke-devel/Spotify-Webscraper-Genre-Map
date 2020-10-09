// cityToCoord.js writes fresh 'cityCoords.csv' file using each city from the spotify_db database

const axios = require("axios");
const fs = require("fs");

const cities = [{ city: 'Mexico City', country: 'MX' },
{ city: 'Los Angeles', country: 'US' },
{ city: 'Chicago', country: 'US' },
{ city: 'Paris', country: 'FR' },
{ city: 'Dallas', country: 'US' },
{ city: 'Santiago', country: 'CL' },
{ city: 'New York City', country: 'US' },
{ city: 'Houston', country: 'US' },
{ city: 'Sydney', country: 'AU' },
{ city: 'Atlanta', country: 'US' },
{ city: 'São Paulo', country: 'BR' },
{ city: 'Stockholm', country: 'SE' },
{ city: 'London', country: 'GB' },
{ city: 'Seattle', country: 'US' },
{ city: 'Oslo', country: 'NO' },
{ city: 'Guadalajara', country: 'MX' },
{ city: 'San Francisco', country: 'US' },
{ city: 'Brisbane', country: 'AU' },
{ city: 'Toronto', country: 'CA' },
{ city: 'Madrid', country: 'ES' },
{ city: 'Melbourne', country: 'AU' },
{ city: 'Denver', country: 'US' },
{ city: 'Berlin', country: 'DE' },
{ city: 'Dublin', country: 'IE' },
{ city: 'Brooklyn', country: 'US' },
{ city: 'Amsterdam', country: 'NL' },
{ city: 'Barcelona', country: 'ES' },
{ city: 'Munich', country: 'DE' },
{ city: 'Hamburg', country: 'DE' },
{ city: 'Montreal', country: 'CA' },
{ city: 'Buenos Aires', country: 'AR' },
{ city: 'Cleveland', country: 'US' },
{ city: 'Lima', country: 'PE' },
{ city: 'Bogotá', country: 'CO' },
{ city: 'Miami', country: 'US' },
{ city: 'Perth', country: 'AU' },
{ city: 'Istanbul', country: 'TR' },
{ city: 'Warsaw', country: 'PL' },
{ city: 'Puebla City', country: 'MX' },
{ city: 'Milan', country: 'IT' },
{ city: 'Minneapolis', country: 'US' },
{ city: 'Philadelphia', country: 'US' },
{ city: 'Arlington', country: 'US' },
{ city: 'Phoenix', country: 'US' },
{ city: 'Helsinki', country: 'FI' },
{ city: 'Auckland', country: 'NZ' },
{ city: 'Puebla', country: 'MX' },
{ city: 'Austin', country: 'US' },
{ city: 'Vancouver', country: 'CA' },
{ city: 'Zurich', country: 'CH' },
{ city: 'Rio de Janeiro', country: 'BR' },
{ city: 'Birmingham', country: 'GB' },
{ city: 'Glasgow', country: 'GB' },
{ city: 'Nottingham', country: 'GB' },
{ city: 'Ilford', country: 'GB' },
{ city: 'Bristol', country: 'GB' },
{ city: 'Jakarta', country: 'ID' },
{ city: 'Curitiba', country: 'BR' },
{ city: 'Manchester', country: 'GB' },
{ city: 'Rome', country: 'IT' },
{ city: 'Las Vegas', country: 'US' },
{ city: 'Southampton', country: 'GB' }];

var cityToCoord = function (city, country) {

    // Coords object to hold coordinates
    let coords = [];

    // Assigns queryUrl based on city and country

    let queryUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + city + ' ' + country + process.env.MAPBOXAPIKEY;

    // Calls api

    axios.get(queryUrl).then(function (res) {
        coords = res.data.features[0].center.reverse();
    }).then(function () {

        // Appends each city name, country, latitude, and longitude
        fs.appendFile('../data/cityCoords.csv', `${city}, ${country}, ${coords[0]}, ${coords[1]}\n`, (err) => {
            if (err) throw err;
        });

    });

}

// Appends header line to csv file

fs.writeFile('../data/cityCoords.csv', `city, country, latitude, longitude\n`, (err) => {
    if (err) throw err;
});


// For loop to pull coordinates from all cities from spotify_db, and append each line to csv

for (let i = 0; i < cities.length; i++) {
    cityToCoord(cities[i].city, cities[i].country);
}

console.log('\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n csv file written successfully.\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n');

module.exports = cityToCoord;



