import { Router } from "express";
import usersRouter from "./features/user/user.routes";
import customerRouter from "./features/customers/customer.routes";
import authenticationMiddleware from "./middlewares/authentication.middleware";
import quoteRouter from "./features/quote/quote.routes";
import settingsRouter from "./features/settings/settings.routes";
import { settingsAuthenticationMiddleware } from "./middlewares/settings.middleware";

const router = Router();

router.use("/api/v1/users", usersRouter);
router.use("/api/v1/customers", authenticationMiddleware, customerRouter);
router.use("/api/v1/quotes", quoteRouter);
router.use(
  "/api/v1/settings",
  settingsAuthenticationMiddleware,
  settingsRouter
);

export default router;
