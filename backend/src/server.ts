import app from "./app";
import http from "http";
import {
  MONGO_INITDB_ROOT_PASSWORD,
  MONGO_INITDB_ROOT_USERNAME,
  MONGO_URI,
  PORT,
} from "./config";
import process from "process";
import mongoose from "mongoose";
const server = http.createServer(app);

mongoose
  .connect(MONGO_URI, {
    user: MONGO_INITDB_ROOT_USERNAME,
    pass: MONGO_INITDB_ROOT_PASSWORD,
  })
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
