import { Router } from "express";
import { createEntityHandler } from "../../handlers/entity.handler";
import {
  createQuoteController,
  downloadQuoteByIdController,
  getQuoteByIdController,
  getQuoteItemsController,
  getQuotesController,
} from "./quote.controller";
import authenticationMiddleware from "../../middlewares/authentication.middleware";

const quoteRouter = Router();
quoteRouter.post(
  "/",
  authenticationMiddleware,
  createEntityHandler,
  createQuoteController
);
quoteRouter.get("/", authenticationMiddleware, getQuotesController);
quoteRouter.get(
  "/:quoteId/items",
  authenticationMiddleware,
  getQuoteItemsController
);
quoteRouter.get("/:quoteId/download", downloadQuoteByIdController);
quoteRouter.get("/:quoteId", authenticationMiddleware, getQuoteByIdController);
export default quoteRouter;
