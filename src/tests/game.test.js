const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../server");
const startServer = require("../index");
const Game = require("../models/Game");

let server;

describe("Golf Game Tracker API", () => {
  beforeAll(async () => {
    server = await startServer();
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await server.close();  // properly close server after tests
  });

  // Your tests...
  it("should create a new golf game", async () => {
    const response = await request(app)
      .post("/games")
      .send({
        course: "Pebble Beach",
        date: "2024-06-01",
        score: 72,
        player: "Tiger Woods",
        holesPlayed: 18,
        scores: Array(18).fill(4),
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.course).toBe("Pebble Beach");
  });

  it("Should retrieve all golf games", async () => {
    const response = await request(app).get("/games");
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("Should retrieve a specific golf game by ID", async () => {
    const game = await Game.create({
      course: "Pebble Beach",
      date: "2024-06-01",
      score: 72,
      player: "Tiger Woods",
      holesPlayed: 18,
      scores: Array(18).fill(4),
    });

    const response = await request(app).get(`/games/${game._id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body._id).toBe(game._id.toString());
  });
});

