import { Router } from "express";
import {
  createEntityHandler,
  updateEntityHandler,
} from "../../handlers/entity.handler";
import {
  createQuoteController,
  deleteQuoteController,
  downloadQuoteByIdController,
  getQuoteByIdController,
  getQuoteItemsController,
  getQuotesController,
  updateQuoteController,
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

quoteRouter.patch(
  "/:quoteId",
  authenticationMiddleware,
  updateEntityHandler,
  updateQuoteController
);

quoteRouter.delete(
  "/:quoteId",
  authenticationMiddleware,
  deleteQuoteController
);

export default quoteRouter;
