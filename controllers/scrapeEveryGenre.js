// Autoscraper to scrape http://everynoise.com/new_releases_by_genre.cgi using cheerio
// to populate json with with spotify ID's for artists for all ~ 3000 Spotify genres

const request = require('request');
const cheerio = require('cheerio');

const fs = require('fs');

request('http://everynoise.com/new_releases_by_genre.cgi', (error, response, html) => {
    if (!error && response.statusCode == 200) {

        // Loads html page into cheerio
        const $ = cheerio.load(html);

        const genre = $('.genre');

        const output = genre.children('a').parent().text();

        $('.genre a').each((i, el) => {
            // ignores first 4 links
            if (i == 4) {
                //const item = $(el).text();
                const link = $(el).attr('href');
                console.log(`http://everynoise.com/new_releases_by_genre.cgi${link}`);

                request(`http://everynoise.com/new_releases_by_genre.cgi${link}`, (error, response, html) => {
                    if (!error && response.statusCode == 200) {

                        $('.albumbox.album a').each((j, ele) => {
                            const artistLink = $(ele).attr('href');
                            if (j == 0) {
                                console.log(artistLink);

                            }

                        })
                    }
                });

                // fs.appendFile('./result.json', `${link} \n`, function (err) {
                //     if (err) { console.log(err); }
                // })
            }

        })





    }
});
