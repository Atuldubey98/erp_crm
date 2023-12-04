import cors from "cors";
import express, { Application } from "express";
import morgan from "morgan";
import { isEnvDev } from "./config";
import { errorHandler } from "./handlers/error.handler";
import router from "./routes";
import notFoundHandler from "./handlers/not_found.handler";

const app: Application = express();
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan(isEnvDev ? "dev" : "combined"));
app.use(router);
app.use("*", notFoundHandler);
app.use(errorHandler);
export default app;
