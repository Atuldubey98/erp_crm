import { IQuoteItem } from "../quote_item/types";

export interface IQuote {
  createdBy: string;
  updatedBy?: string;
  customer: string;
  taxableAmount: number;
  sgst?: number;
  cgst?: number;
  date?: string;
  igst?: number;
  quoteNo?: string;
  description?: string;
  termsAndConditions?: string;
  grandTotal: number;
}

export interface ICreateQuote extends Partial<IQuote> {
  quoteItems?: IQuoteItem[];
}
export interface IQuoteSetting {
  _id?: string;
  type: "quote";
  seriesType: "append" | "prepend";
  value?: string;
}
export interface IInvoiceSetting {
  _id?: string;
  type: "quote";
  seriesType: "append" | "prepend";
  value?: string;
}
