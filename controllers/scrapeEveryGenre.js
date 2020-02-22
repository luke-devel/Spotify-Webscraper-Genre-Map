// Autoscraper to scrape http://everynoise.com/new_releases_by_genre.cgi using cheerio
// to populate json with with spotify ID's for artists for all ~ 3000 Spotify genres

const request = require('request');
const cheerio = require('cheerio');
var rp = require('request-promise');

const fs = require('fs');
//callbacks
// promises
//async await

(async function main() {
    try {
        let urls = [];
        var options = {
            uri: 'http://everynoise.com/new_releases_by_genre.cgi',
            transform: function (body) {
                return cheerio.load(body);
            }
        };

        rp(options)
            .then(function ($) {

                $('.genre a').each(async (i, el) => {
                    try {
                        if (i >= 234) {
                            const link = $(el).attr('href');
                            //console.log(`http://everynoise.com/new_releases_by_genre.cgi${link}\n`);
                            var url = `http://everynoise.com/new_releases_by_genre.cgi${link}`;
                            urls.push(url);
                        }
                    }
                    catch (e) {
                        console.log(e.message);
                    }
                });
                console.log('done the loop');
                return urls;
            }).then(async function (urls) {

                console.log(urls);
                console.log('done in new loop');

                // ~2467 times
                for (let i = 0; i < urls.length; i++) {

                    var options2 = {
                        uri: urls[0],
                        transform: function (body) {
                            return cheerio.load(body);
                        }
                    };

                    rp(options2)
                        .then(await function ($) {
                            // Process html like you would with jQuery...
                            // loops twice
                            $('.albumbox.album a').each((j, ele) => {
                                const artistLink = $(ele).attr('href').slice(29, -10);
                                if (j < 3 && artistLink) {
                                    fs.appendFile('./spotifyIDs.json', `${artistLink} \n`, function (err) {
                                        //console.log(artistLink);

                                        if (err) { console.log(err); }
                                    })
                                }
                            })
                        })
                        .catch(function (err) {
                            console.log('Crawling failed or Cheerio choked...');
                        });
                }
            })
            .catch(function (err) {

            });

    } catch (e) {
        console.log(e.message);
    }

})();


// var options = {
//     uri: 'http://everynoise.com/new_releases_by_genre.cgi',
//     transform: function (body) {
//         return cheerio.load(body);
//     }
// };

// rp(options)
//     .then(function ($) {
//         // Process html like you would with jQuery...
//         const genre_a = $('.genre a');
//         console.log(genre_a.length);

//         //loops 3000 times

//         // $('.genre a').each((i, el) => {
//         //     // ignores first 4 links
//         //     // if (i >= 4 && i <= 5) {
//         //     if (i == 4) {
//         //         //const item = $(el).text();
//         //         const link = $(el).attr('href');
//         //         console.log(`http://everynoise.com/new_releases_by_genre.cgi${link}\n`);
//         //         var url = `http://everynoise.com/new_releases_by_genre.cgi${link}`;
//         //         toDo(url);
//         //     }

//         // });
//         //
//     })
//     .catch(function (err) {
//         // Crawling failed or Cheerio choked...
//     });
// //

// async function toDo(url) {
//     var options2 = {
//         uri: url,
//         transform: function (body) {
//             return cheerio.load(body);
//         }
//     };

//     await rp(options2)
//         .then(function ($) {
//             // Process html like you would with jQuery...
//             // loops twice
//             $('.albumbox.album a').each((j, ele) => {
//                 const artistLink = $(ele).attr('href').slice(29, -10);
//                 if (j < 3 && artistLink) {
//                     console.log(`Spotify id: ${artistLink}`);
//                 }
//                 // fs.File('./result.json', `${html} \n`, function (err) {
//                 //     if (err) { console.log(err); }
//                 // })
//             })
//         })
//         .catch(function (err) {
//             // Crawling failed or Cheerio choked...
//         });
// }






