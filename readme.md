# Meetup Event Scraper

This is a Node.js and Express-based web scraper that fetches events from Meetup and serves them via an API. The frontend displays the events and includes a booking modal that asks for an email and OTP before proceeding.

## Features

- Scrapes event data from Meetup using Puppeteer.
- Stores event data in MongoDB.
- Serves event data via a REST API.
- React frontend displays events with a "Book Tickets" button.
- Modal for email and OTP confirmation before redirecting to the event link.

## Tech Stack

- **Backend:** Node.js, Express, Puppeteer, MongoDB
- **Frontend:** React, Tailwind CSS
- **Deployment:** Render (backend), Vercel (frontend)

## Setup Instructions

### Prerequisites

- Node.js installed
- MongoDB instance running (local or cloud)

### Frontend setup

- install all Dependencies

```sh
npm install
```

- Run locally

```sh
npm run dev
```

## Note :

The frontend will still work without running the backend because it is using the deployed version of the backend to fetch the data about Events.

### Backend Setup

- install all Dependencies

```sh
npm install
```

- Generate MongoDB connection string
- Run locally

```sh
node index.js
```
