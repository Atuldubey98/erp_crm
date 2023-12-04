import { Router } from "express";
import { currentUser, login, register } from "./user.controller";
import authenticationMiddleware from "../../middlewares/authentication.middleware";
const usersRouter = Router();

usersRouter.post("/register", register);
usersRouter.post("/login", login);
usersRouter.get("/", authenticationMiddleware, currentUser);
export default usersRouter;