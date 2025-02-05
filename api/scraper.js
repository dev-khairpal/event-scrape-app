const puppeteer = require("puppeteer");
const Events = require("./models/events.model");

async function scrapeEvents() {
  try {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    await page.goto("https://www.meetup.com/en-AU/find/au--sydney/", { waitUntil: "networkidle2", timeout: 60000 });

    await page.waitForSelector("article", { timeout: 5000 });
    let events = await page.evaluate(() =>
      Array.from(document.querySelectorAll("article>div>div>div")).map(event => ({
        title: event.querySelector("h3")?.innerText.trim() || "",
        date: event.querySelector("time")?.innerText.trim() || "No date",
        hostedBy: event.querySelector("p")?.innerText.trim() || "No location",
        link: event.querySelector("a")?.href || "No link",
      }))
    );

    events = events.filter(event => event.title !== "");

    if (events.length > 0) {
      await Events.deleteMany({}); // Clear old data before inserting new
      await Events.insertMany(events);
      console.log("Events updated in the database.");
    } else {
      console.log("No new events found.");
    }

    await browser.close();
    return events;
  } catch (error) {
    console.error("Scraping failed:", error);
    return [];
  }
}

module.exports = { scrapeEvents };
