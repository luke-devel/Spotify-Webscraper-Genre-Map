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

        var options = {
            uri: 'http://everynoise.com/new_releases_by_genre.cgi',
            transform: function (body) {
                return cheerio.load(body);
            }
        };

        rp(options)
            .then(function ($) {
                try {
                    var urls = [];
                    $('.genre a').each(async (i, el) => {
                        try {

                            if (i >= 234) {
                                const link = $(el).attr('href');
                                var url = `http://everynoise.com/new_releases_by_genre.cgi${link}`;
                                urls.push(url);
                            }

                        }
                        catch (e) {
                            console.log('err in .genre a loop: ' + e.message);
                        }
                    })
                    console.log('done the .genre a loop');
                    return urls;
                }
                catch (e) {
                    console.log('err in first loop: ' + e.message);
                }
            }).then(function (urls) {
                try {
                    var ids = [];
                    console.log(`urls length is: ${urls.length}`);


                    // ~2467 times
                    let completed_requests = 0;
                    for (let i = 0; i < 100; i++) {
                        try {

                            var options2 = {
                                uri: urls[i],
                                transform: function (body) {
                                    return cheerio.load(body);
                                }
                            };

                            rp(options2)
                                .then(async function ($) {
                                    //     Process html like you would with jQuery...
                                    // loops twice
                                    $('.albumbox.album a').each(await function (j, ele) {
                                        try {
                                            const artistLink = $(ele).attr('href').slice(29, -10);
                                            if (j < 3 && artistLink) {
                                                ids.push(artistLink);
                                                completed_requests++;

                                                if (completed_requests == 200) {
                                                    // All download done, process responses array
                                                    console.log(ids);
                                                    console.log(ids.length);

                                                    var result = JSON.stringify(ids);

                                                    fs.writeFile('./spotifyIDs4.json', result, function (err) {
                                                        console.log("The file was saved!");
                                                        if (err) { console.log(err); }
                                                    })
                                                }

                                            }
                                        }
                                        catch{
                                            console.log(`err at albumbox album a - j: ${j}`);

                                        }
                                    })
                                })
                                .catch(function (err) {
                                });
                        }
                        catch{
                            console.log(`err at i: ${i} in 2700 for loop`);

                        }
                    }


                }
                catch{
                    console.log(`err in new function`);
                }

            }).then(function (ids) {



            })
            .catch(function (err) {

            });

    } catch (e) {
        console.log('main function err: ' + e.message);
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






