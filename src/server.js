require("dotenv").config();
const express = require("express");
const gameRoutes = require("./routes/gameRoutes");

const app = express();

app.use(express.json());

// Routes
app.use("/games", gameRoutes);

app.get("/", (req, res) => {
  res.send("Golf Game Tracker API is up and running!");
});

module.exports = app;
