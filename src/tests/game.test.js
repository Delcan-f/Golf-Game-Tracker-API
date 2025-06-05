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
    // Instead of dropDatabase(), just delete all Game docs to clean up
    await Game.deleteMany({});
    await mongoose.connection.close();
    await server.close();
  });

  beforeEach(async () => {
    await Game.deleteMany({}); // Clean before each test
  });

  const validGameData = {
    course: "Pebble Beach",
    date: "2024-06-01",
    holesPlayed: 18,
    scores: Array(18).fill(4),
  };

  it("should create a new golf game with valid data", async () => {
    const response = await request(app).post("/games").send(validGameData);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("_id");
    expect(response.body.course).toBe(validGameData.course);
    expect(response.body.scores.length).toBe(validGameData.holesPlayed);
  });

  it("should fail to create a game if scores length does not match holesPlayed", async () => {
    const badData = {
      ...validGameData,
      scores: Array(9).fill(4),
    };
    const response = await request(app).post("/games").send(badData);
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toMatch(/Scores array length must match holes played/i);
  });

  it("should fail to create a game with missing required fields", async () => {
    const badData = {
      course: "Pebble Beach",
      holesPlayed: 18,
      scores: Array(18).fill(4),
    }; // missing date
    const response = await request(app).post("/games").send(badData);
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toMatch(/date.*required/i);
  });

  it("should retrieve all golf games", async () => {
    await Game.create(validGameData);
    const response = await request(app).get("/games");
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(1);
  });

  it("should retrieve a specific golf game by ID", async () => {
    const game = await Game.create(validGameData);
    const response = await request(app).get(`/games/${game._id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body._id).toBe(game._id.toString());
  });

  it("should return 404 for non-existing game ID", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const response = await request(app).get(`/games/${fakeId}`);
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("Game not found");
  });
});
