// Autoscraper to scrape http://everynoise.com/new_releases_by_genre.cgi using cheerio
// to populate json with with spotify ID's for artists for all ~ 3000 Spotify genres

var Promise = require("bluebird");
const cheerio = require('cheerio');
var queue = require('queue')

var rp = require('request-promise');

const fs = require('fs');
//callbacks
// promises
//async await

(async function main() {
    try {
        var options = {
            uri: 'http://everynoise.com/new_releases_by_genre.cgi',
            transform: function (body) {
                return cheerio.load(body);
            }
        };

        const $ = await rp(options);
        var urls = [];
        const ids = {};

        $('.genre a').each((i, el) => {
            // must start at iteration 238 to scrape genres at beginning of alphebetical list
            if (i >= 238) {
                const link = $(el).attr('href');
                var url = `http://everynoise.com/new_releases_by_genre.cgi${link}`;
                urls.push(url);
            }

        })
        console.log(`url scraping complete - urls[] length is ${urls.length}`)
        console.log(`First genre url to scrape is: ${urls[0]}`);

        fs.writeFile('./spotifyIDsFinal.csv', `artistID,\n`, function (err) {
            console.log(`.csv written to with header`);
            if (err) { console.log(err); }
        })
        const requests = urls.map(url => {
            var options = {
                uri: url,
                transform: function (body) {
                    return cheerio.load(body);
                }
            };

            return async () => {

                const $ = await rp(options);


                let twoCount = 0;
                $('.albumbox.album a').each((j, ele) => {

                    const artistID = $(ele).attr('href').slice(29, -10);
                    ///
                    // console.log(artistID);

                    // checks if artistID is not in array already
                    if (artistID) {
                        if (!ids[artistID] && twoCount < 2) {
                            ids[artistID] = true;
                            twoCount++;
                            fs.appendFile('./spotifyIDsFinal.csv', `${artistID},\n`, function (err) {
                                console.log(`.csv written to with Spotify artist ID: ${artistID}`);
                                if (err) { console.log(err); }
                            })
                        }
                    }
                })

            }
        })

        // defines queue, concurrency value is how many requests to be made at once
        // higher the concurrency = more ram usage
        var q = queue({ results: [], concurrency: 10 });

        q.push(...requests)
        q.on('success', function (result, job) {
        })

        // begin processing, get notified on end / failure
        q.start(function (err) {
            if (err) throw err
            console.log('all done:', q.results)
        })

    } catch (e) {
        console.log(e)
    }
})();