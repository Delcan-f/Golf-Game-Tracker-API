require("dotenv").config(); // Load .env variables
const express = require("express");
const connectDB = require("./database");
const gameRoutes = require("./routes/gameRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Route registration
app.use("/games", gameRoutes);

// Health check or root route
app.get("/", (req, res) => {
  res.send("Golf Game Tracker API is up and running!");
});

// Connect to database and start server
connectDB()
  .then(() => {
    console.log("DB connected, starting server...");
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

module.exports = app; // Export for testing
