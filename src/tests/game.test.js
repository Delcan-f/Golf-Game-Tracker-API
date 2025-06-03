const request = require("supertest");
const app = require("../server.js");

describe("Golf Game Tracker API", () => {
    let createdGameId;

    it("should create a new golf game", async () => {
        const response = await request(app)
            .post("/games")
            .send({
                date: '2025-06-01',
                course: 'Narooma Golf Club',
                holesPlayed: 18,
                scores: Array(18).fill(5),
                notes: "Felt great on the course!"
            });
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('_id');
        createdGameId = response.body._id;
    });

    it("Should retrieve all golf games", async () => {
        const response = await request(app).get('/games');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it("Should retrieve a specific golf game by ID", async () => {
        const response = await request(app).get(`/games/${createdGameId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('_id', createdGameId);
    });
});
