import QuoteItem from "./quote_item.model";

export const getQuoteItemsByQuote = (quoteId: string) => {
  return QuoteItem.find({ quote: quoteId });
};
