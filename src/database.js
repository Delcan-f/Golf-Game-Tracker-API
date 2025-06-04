const mongoose = require("mongoose");

const connectDB = async () => {
  const uri = process.env.NODE_ENV === "test" ? process.env.MONGO_URI_TEST : process.env.MONGO_URI;
  console.log("Connecting to MongoDB:", uri); // Log which DB we're connecting to

  // Only connect if not already connected
  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(uri);
      console.log("MongoDB connected successfully");
    } catch (error) {
      console.error("MongoDB connection failed:", error);
      throw error;
    }
  } else {
    console.log("MongoDB connection already established");
  }
};

module.exports = connectDB;
