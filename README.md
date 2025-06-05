# Golf Game Tracker API

## Overview

The Golf Game Tracker API enables golfers to input and track their games, including courses played, scores, and notes. The API provides CRUD operations for game records and calculates statistics such as best and average scores. It is built using Node.js, Express, and MongoDB with Mongoose, and includes automated testing, CI/CD pipelines, and deployment.

## Tech Stack

- **Node.js and Express** for backend API
- **MongoDB with Mongoose** for data storage and schema validation
- **Jest and Supertest** for unit and integration testing
- **GitHub Actions** for continuous integration and deployment (CI/CD)
- **Hosted on Render** for cloud deployment

## Getting Started

### Prerequisites

- Node.js 
- MongoDB Atlas account or local MongoDB server
- Render account 

### Installation

1. Clone the repository:

``` bash
git clone https://github.com/Delcan-f/Golf-Game-Tracker-API.git
cd Golf-Game-Tracker-API1
```

2. Install dependencies:

``` bash
npm ci
```

3. Create a `.env` file in the root folder based on `.env.example`:

``` bash
MONGO_URI=your_production_mongodb_uri
MONGO_URI_TEST=your_test_mongodb_uri
PORT=5000
```

4. Start the server locally:

``` bash
npm start
```

The server will run on [http://localhost:5000](http://localhost:5000) by default.

## API Endpoints

### Games
---------------------------------------------------------------------------------------------
| Method | Endpoint           | Description                                                 |
|--------|--------------------|-------------------------------------------------------------|
| POST   | `/games`           | Create a new golf game record                               |
| GET    | `/games`           | Retrieve all golf games (sorted by date desc)               |
| GET    | `/games/:id`       | Retrieve a single golf game by ID                           |
| GET    | `/games/stats`     | Get aggregate stats: total games, best score, average score |
---------------------------------------------------------------------------------------------

### Example Request to Create Game

``` bash
POST /games
Content-Type: application/json

{
  "date": "2024-06-01",
  "course": "Pebble Beach",
  "holesPlayed": 18,
  "scores": [4, 4, 5, 3, 4, 4, 5, 4, 3, 4, 5, 4, 3, 4, 5, 4,Sunny day, good weather"
}
```

#### Response

``` bash
{
  "_id": "642a6b2f8f1b2c1a8b3e5678",
  "date": "2024-06-01T00:00:00.000Z",
  "course": "Pebble Beach",
  "holesPlayed": 18,
  "scores": [4, 4, 5, 3, 4, 4, 5, 4, 3, 4, 5, 4, 3, 4, 5, 4,Sunny day, good weather",
  "__v": 0
}
```

---

## Running Tests

Run unit and integration tests with coverage:

``` bash
npm test
```

Test reports will show coverage and highlight passing/failing tests.

## Deployment

This project is configured to deploy automatically on push to the main branch via GitHub Actions to Render.com.

**Render Setup:**

1. Create a new Web Service on Render.
2. Connect your GitHub repository.
3. Set environment variables (`MONGO_URI`, etc.) on Render dashboard.
4. The CI/CD pipeline will trigger deploys automatically on pushes to main.

## Configuration & Environment Variables

----------------------------------------------------------------
| Variable        | Description                                |
|-----------------|--------------------------------------------|
| MONGO_URI       | MongoDB connection string for production   |
| MONGO_URI_TEST  | MongoDB connection string for tests        |
| PORT            | Port for Express server (default 5000)     |
----------------------------------------------------------------

## Code Quality & Best Practices

- ESLint used for linting with recommended rules.
- Tests cover all main CRUD operations and validations.
- CI/CD pipeline includes linting, tests, and deployment steps.
- Secure environment variables managed via `.env` and GitHub Secrets.

## Contact

**GitHub:** [Delcan-f](https://github.com/Delcan-f)