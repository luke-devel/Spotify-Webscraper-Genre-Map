const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

async function puppeteerScrapeScriptTag(artistID) {
  try {
    console.log(`in puppeteerScrapeScriptTag, doing ${artistID}`);
    var url = "https://open.spotify.com/artist/" + artistID + "/about";
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-extensions"]
    });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    // sets user agent to internet explorer 11
    await page.setUserAgent(
      "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0)"
    );
    await page.goto(url);
    let bodyHTML = await page.evaluate(() => document.body.innerHTML);
    const $ = cheerio.load(bodyHTML);
    let rawSpotifyData = $("script");
    var scriptData = rawSpotifyData[3].children[0].data;
    await browser.close();

    return scriptData;
  } catch (err) {
    console.log(
      `~~~~~~~~~~~~~~~~~~~~~~~~ err caught in puppeteerScrapeScriptTag, continuing ~~~~~~~~~~~~~~~~~~~~~~~~`
    );
    console.log(err);
  }
}

module.exports = puppeteerScrapeScriptTag;
