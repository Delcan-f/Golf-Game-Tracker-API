const app = require("./server");
const connectDB = require("./database");

const PORT = process.env.PORT || 5000;

async function startServer() {
  await connectDB();
  console.log("DB connected, starting server...");
  const server = app.listen(PORT, () =>
    console.log(`Server is running on port ${PORT}`)
  );
  return server;
}

if (require.main === module) {
  startServer();
}

module.exports = startServer;
