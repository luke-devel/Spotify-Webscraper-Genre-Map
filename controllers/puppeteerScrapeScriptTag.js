const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

async function puppeteerScrapeScriptTag(artistID) {
  try {
    console.log(artistID);
    var url = "https://open.spotify.com/artist/" + artistID + "/about";
    const browser = await puppeteer.launch({
      headless: false
    });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    // sets user agent to internet explorer 11
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 6.1; Trident/7.0; rv:11.0) like Gecko"
    );
    await page.goto(url);
    let bodyHTML = await page.evaluate(() => document.body.innerHTML);
    const $ = cheerio.load(bodyHTML);
    let rawSpotifyData = $("script");
    var scriptData = rawSpotifyData[3].children[0].data;
    await browser.close();
    return scriptData;
  } catch {
    console.log(
      `~~~~~~~~~~~~~~~~~~~~~~~~ err caught, continuing ~~~~~~~~~~~~~~~~~~~~~~~~`
    );
  }
}

module.exports = puppeteerScrapeScriptTag;
