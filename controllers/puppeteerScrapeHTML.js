const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

async function puppeteerScrapeHTML(artistID) {
  try {
    console.log(`in puppeteerScrapeHTML, doing ${artistID}`);
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
    await browser.close();
    return $;
  } catch (err) {
    console.log(
      `~~~~~~~~~~~~~~~~~~~~~~~~ err caught in puppeteerScrapeHTML, continuing ~~~~~~~~~~~~~~~~~~~~~~~~`
    );
    console.log(err);
  }
}

module.exports = puppeteerScrapeHTML;
