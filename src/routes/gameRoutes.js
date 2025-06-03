const express = require("express");
const router = express.Router();
const gameController = require("../controllers/gameController.js");

router.post('/', gameController.createGame);
router.get('/', gameController.getAllGames);
router.get('/:id', gameController.getGameById);
router.get('/stats', gameController.getGameStats);

module.exports = router;
