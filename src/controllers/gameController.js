const Game = require("../models/Game.js");

exports.createGame = async (request, response) => {
  try {
    const game = await Game.create(request.body);
    response.status(201).json(game);
  } catch (err) {
    response.status(400).json({ error: err.message });
  }
};

exports.getAllGames = async (request, response) => {
  try {
    const games = await Game.find().sort({ date: -1 });
    response.json(games);
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
};

exports.getGameById = async (request, response) => {
  try {
    const game = await Game.findById(request.params.id);
    if (!game) {
      return response.status(404).json({ message: "Game not found" });
    }
    response.json(game);
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
};

exports.getGameStats = async (request, response) => {
  try {
    const games = await Game.find();
    const totalGames = games.length;
    const bestScore = Math.min(...games.map(g => g.scores.reduce((a, b) => a + b, 0)));
    const avgScore = games.reduce((sum, g) => sum + g.scores.reduce((a, b) => a + b, 0), 0) / totalGames;

    response.json({ totalGames, bestScore, avgScore: avgScore.toFixed(2) });
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
};
