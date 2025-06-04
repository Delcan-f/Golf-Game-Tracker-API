const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const gameRoutes = require("./routes/gameRoutes");

dotenv.config();

const app = express();

app.use(express.json());
app.use('/games', gameRoutes);

const PORT = process.env.PORT || 3000;

console.log("Mongo URI:", process.env.MONGO_URI); // debug line

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("MongoDB connected");
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
})
.catch(err => console.error("MongoDB connection error:", err));

module.exports = app;
