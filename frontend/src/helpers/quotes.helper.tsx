export const saveQuoteItemMapper = ({
  rate,
  tax,
  qty,
  name,
}: ICreateQuotesRowItemDTO): {
  rate: number;
  tax: ITax;
  qty: number;
  name: string;
} => ({
  rate: parseFloat(rate),
  tax,
  qty: parseFloat(qty),
  name,
});

export const filterQuoteItem = (quoteItem: ICreateQuotesRowItemDTO): boolean =>
  quoteItem.name.length > 3;
