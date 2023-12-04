import { Request, Response } from "express";
import requestAsyncHandler from "../../middlewares/requestAsyncHandler";

export const updateQuoteItemController = requestAsyncHandler(
  async (req: Request, res: Response) => {
    const quoteItemId = req.params.quoteItemId;
  }
);
