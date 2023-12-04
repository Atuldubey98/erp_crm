interface ICompanyDetails {
  _id?: string;
  type: "company";
  gstNo?: string;
  panNo: string;
  name: string;
  address: string;
}
interface ICompanyDetailsCreateBody extends ICompanyDetails {
  isGSTApplicable: boolean;
}
type RegisterUserProps = {
  _id?: string;
  firstName: string;
  lastName: string;
  maidenName: string;
  password: string;
  email: string;
  phoneNumber: string;
};
type ISeriesType = "append" | "prepend";

type ISeries = {
  _id?: string;
  invoice: string;
  invoiceSeriesType: ISeriesType;
  quote: string;
  quoteSeriesType: ISeriesType;
};

type IInvoiceSettings = {
  _id?: string;
  type: "invoice";
  seriesType: "append" | "prepend";
  value: string;
};
type IQuoteSettings = {
  _id?: string;
  type: "quote";
  seriesType: "append" | "prepend";
  value: string;
};
type ISettingsContextProps = {
  company: ICompanyDetails | null;
  invoice: IInvoiceSettings | null;
  quote: IQuoteSettings | null;
  admin: null;
  status: IApiStatus;
};
type IApiStatus = "idle" | "loading" | "succeeded" | "failed";
