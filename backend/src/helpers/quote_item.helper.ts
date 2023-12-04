import { IQuoteItem } from "../features/quote_item/types";

export const getTotalTax = (item: IQuoteItem) => {
  const igstPercentage = item.tax.gstPercentage / 100;
  const subtotal: number = item.rate * item.qty;
  const gstPercentage = igstPercentage / 2;
  const percentageApplicable = item.tax.gstType.startsWith("IGST")
    ? igstPercentage
    : gstPercentage;
  const totalTax = subtotal * percentageApplicable;
  return totalTax;
};
