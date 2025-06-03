const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const gameRoutes = require("./routes/gameRoutes");

dotenv.config();
const app = express();

app.use(express.json());
app.use('/games', gameRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB connected");
    app.listen(3000, () => console.log("Server is running on port 3000"));
})
.catch(err => console.error(err));