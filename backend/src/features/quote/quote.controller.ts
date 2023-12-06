import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import { parseDate } from "../../helpers/date.helper";
import requestAsyncHandler from "../../middlewares/requestAsyncHandler";
import QuoteItem from "../quote_item/quote_item.model";
import {
  getQuoteItemsByQuote,
  updateQuoteItems,
} from "../quote_item/quote_item.repository";
import { IQuoteItem } from "../quote_item/types";
import {
  ESettingType,
  getSettingsByType,
} from "../settings/settings.repository";
import { QuoteNotFound } from "./errors";
import Quote from "./quote.model";
import {
  createQuote,
  getAllQuotes,
  getQuote,
  makeQuote,
} from "./quote.repository";
import { ICreateQuote } from "./types";
export const createQuoteController = requestAsyncHandler(
  async (req: Request, res: Response) => {
    const { quoteItems = [], ...quote }: ICreateQuote = await makeQuote(
      req.body
    );
    const newQuote = await createQuote(quote);

    await QuoteItem.insertMany(
      quoteItems.map((item) => ({ ...item, quote: newQuote.id }))
    );

    return res
      .status(201)
      .json({ status: true, message: "New quotation saved !", data: newQuote });
  }
);

export const getQuotesController = requestAsyncHandler(
  async (req: Request, res: Response) => {
    const DAYS = 30;
    const HOURS_IN_A_DAY = 24 * 60 * 60 * 1000;
    const startDate = parseDate(
      typeof req.query.startDate === "string"
        ? req.query.startDate
        : new Date(Date.now() - DAYS * HOURS_IN_A_DAY).toISOString()
    );
    const endDate = parseDate(
      typeof req.query.endDate === "string"
        ? req.query.endDate
        : new Date(Date.now()).toISOString()
    );
    const filter = { date: { $gte: startDate, $lte: endDate } };
    const select = req.query.select;
    const quotes = await getAllQuotes({
      select: String(select),
      filter,
    });
    return res.status(200).json({
      status: true,
      data: quotes,
    });
  }
);

export const getQuoteItemsController = requestAsyncHandler(
  async (req: Request, res: Response) => {
    const quoteId = req.params.quoteId;
    if (!isValidObjectId(quoteId)) throw new QuoteNotFound();
    const quoteItems = await getQuoteItemsByQuote(quoteId);
    return res.status(200).json({ status: true, data: quoteItems });
  }
);
export const getQuoteByIdController = requestAsyncHandler(
  async (req: Request, res: Response) => {
    const quoteId = req.params.quoteId;
    if (!isValidObjectId(quoteId)) throw new QuoteNotFound();
    const quote = await getQuote(quoteId, String(req.query.select));
    if (!quote) throw new QuoteNotFound();
    return res.status(200).json({ status: true, data: quote });
  }
);

export const downloadQuoteByIdController = requestAsyncHandler(
  async (req: Request, res: Response) => {
    const quoteId = req.params.quoteId;
    const select = req.query.select || "";
    if (!isValidObjectId(quoteId)) throw new QuoteNotFound();
    const [quote, quoteItems] = await Promise.all([
      getQuote(quoteId, String(select)),
      getQuoteItemsByQuote(quoteId),
    ]);
    if (!quote) throw new QuoteNotFound();
    const company = await getSettingsByType(ESettingType.COMPANY);
    return res.render("quote", { quote, quoteItems, company });
  }
);

export const updateQuoteController = requestAsyncHandler(
  async (req: Request, res: Response) => {
    const quoteId = req.params.quoteId;
    if (!isValidObjectId(quoteId)) throw new QuoteNotFound();
    const { quoteItems = [], ...quote }: ICreateQuote = await makeQuote(
      req.body
    );
    const newQuoteItems: IQuoteItem[] = [];
    const oldQuoteItems: IQuoteItem[] = [];
    quoteItems.forEach((quoteItem: IQuoteItem) => {
      if (quoteItem.quote) {
        oldQuoteItems.push(quoteItem);
      } else {
        newQuoteItems.push(quoteItem);
      }
    });
    await Quote.findByIdAndUpdate(quoteId, quote);
    await QuoteItem.insertMany(
      newQuoteItems.map(({ _id, ...item }) => ({ ...item, quote: quoteId }))
    );
    await updateQuoteItems(oldQuoteItems);
    return res.status(200).json({ status: true, data: quoteId });
  }
);
