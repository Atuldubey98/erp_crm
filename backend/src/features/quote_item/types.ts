export type Tax = {
  gstType: "GST" | "IGST";
  gstPercentage: number;
};

export interface IQuoteItem {
  name: string;
  rate: number;
  tax: Tax;
  qty: number;
  code?: string;
  quote: string;
  createdBy: string;
  updatedBy?: string;
  total: number;
}
