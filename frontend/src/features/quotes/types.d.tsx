type ICustomerPart = {
  _id: string;
  name: string;
  billingAddress: string;
  gstNo?: string;
  panNo?: string;
};

type IQuotesRowItem = {
  _id?: string;
  date: string;
  customer: ICustomerPart;
  grandTotal: number;
  quoteNo: string;
  quoteIndex: number;
};
type IGSTTypes = "IGST" | "GST" | "NONE";

type ITax = {
  gstType: IGSTTypes;
  gstPercentage: string;
};
type ICreateQuotesRowItemDTO = {
  _id?: string;
  quote?: string;
  name: string;
  code: string;
  unit: string;
  tax: ITax;
  rate: string;
  qty: string;
  hasError: boolean;
};
type Quote = {
  _id: string;
  createdBy: {
    _id: string;
    firstName: string;
    email: string;
  };
  date: string;
  customer: {
    _id: string;
    name: string;
    billingAddress: string;
    gstNo?: string;
    panNo?: string;
  };
  taxableAmount: number;
  sgst: number;
  cgst: number;
  igst: number;
  quoteNo: string;
  grandTotal: number;
  quoteIndex: number;
  createdAt: string;
  updatedAt: string;
  termsAndCondtions: string;
  description: string;
};
type ICreateQuoteState = {
  customer: ICustomerPart | null;
  quoteItems: ICreateQuotesRowItemDTO[];
  description: string;
  date?: string;
  quoteNo?: string;
  _id?: string;
  termsAndConditons: string;
};

type ICreateQuoteActions =
  | {
      type: "SET:CUSTOMER";
      payload: ICustomerPart | null;
    }
  | { type: "ADD:QUOTE_ITEM"; payload: ICreateQuotesRowItemDTO }
  | { type: "REMOVE:QUOTE_ITEM"; payload: string }
  | {
      type: "SET:QUOTE_ITEM";
      payload: ICreateQuotesRowItemDTO;
    }
  | { type: "SET:DESCRIPTION"; payload: string }
  | { type: "SET:TERMS_AND_CONDTIONS"; payload: string }
  | { type: "SET:DATE"; payload: string };
type IQuoteItem = {
  _id?: string;
  name: string;
  rate: number;
  qty: number;
  tax: ITax;
  quote: string;
  createdBy: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
};
