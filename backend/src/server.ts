import http from "http";
import mongoose from "mongoose";
import process from "process";
import app from "./app";
import {
  MONGO_URI,
  PORT
} from "./config";
const server = http.createServer(app);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log(`Connected to mongodb 👍🏻`);
  })
  .catch((err) => {
    console.error(err);
  });
process.on("SIGTERM", () => {
  server.close(async () => {
    console.info("Shutting down");
    await mongoose.disconnect();
    console.info("DB disconnected");
  });
});
server.listen(PORT, () => {
  console.log(`Server is running on ${PORT} 🪄`);
});
