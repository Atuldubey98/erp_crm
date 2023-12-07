import QuoteItem from "./quote_item.model";
import { IQuoteItem } from "./types";

export const getQuoteItemsByQuote = (quoteId: string) => {
  return QuoteItem.find({ quote: quoteId });
};

export const updateQuoteItems = (quoteItems: IQuoteItem[]) => {
  return Promise.all(
    quoteItems.map(({ _id, ...restQuoteItem }) =>
      QuoteItem.updateOne(
        {
          _id,
        },
        restQuoteItem
      )
    )
  );
};

export const deleteQuoteItems = (quoteId: string) => {
  return QuoteItem.deleteMany({ quote: quoteId });
};
