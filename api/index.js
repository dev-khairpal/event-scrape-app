const express = require("express");
const cors = require("cors");
const { scrapeEvents } = require("./scraper");
const connectDB = require("./config/db");
const Events = require("./models/events.model");
require('dotenv').config();

// db connection
connectDB();

//cors config
const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  optionsSuccessStatus: 200, 
};
const app = express();

// middlewares
app.use(cors());

// get stored events
app.get("/events", async (req, res) => {
  try {
    const events = await Events.find(); // fetch from db
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve events" });
  }
});

// run scraper every 24 hours
setInterval(scrapeEvents, 24 * 60 * 60 * 1000);

// Start
app.listen(5000, async () => {
  console.log("Server running on port 5000");

  // scrape once when the server starts
  await scrapeEvents();
});
