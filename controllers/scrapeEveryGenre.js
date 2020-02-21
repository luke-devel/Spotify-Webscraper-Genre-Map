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
            // if (i >= 4 && i <= 5) {
            if (i == 4) {
                //const item = $(el).text();
                const link = $(el).attr('href');
                console.log(`http://everynoise.com/new_releases_by_genre.cgi${link}\n`);

                request(`http://everynoise.com/new_releases_by_genre.cgi${link}`, (error, response, html) => {
                    if (!error && response.statusCode == 200) {
                        const $ = cheerio.load(html);

                        // fs.File('./result.json', `${html} \n`, function (err) {
                        //     if (err) { console.log(err); }
                        // })

                        $('.albumbox.album a').each((j, ele) => {
                            const artistLink = $(ele).attr('href').slice(29, -10);
                            if (j < 3 && artistLink) {
                                console.log(`Spotify id: ${artistLink}`);
                            }
                        })
                    }
                });
            }
        })
    }
});


