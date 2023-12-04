import { getTotalTax } from "../../helpers/quote_item.helper";
import { IQuoteItem } from "../quote_item/types";
import { nextIndexFromSetting } from "../settings/settings.repository";
import Quote from "./quote.model";
import { quoteItemsSchema, quoteJoiSchema } from "./quote.request";
import { ICreateQuote } from "./types";
export async function makeQuote(quote: ICreateQuote) {
  const validatedQuoteItems = await quoteItemsSchema.validateAsync(
    quote.quoteItems
  );
  let igst = 0;
  let cgst = 0;
  let sgst = 0;
  const calculateSubtotal = (item: IQuoteItem) => {
    const subtotal: number = item.rate * item.qty;
    const totalTax = getTotalTax(item);
    igst += item.tax.gstType.startsWith("IGST") ? totalTax : 0;
    cgst += item.tax.gstType.startsWith("IGST") ? 0 : totalTax;
    sgst += item.tax.gstType.startsWith("IGST") ? 0 : totalTax;
    const amount = subtotal * ((100 + item.tax.gstPercentage) / 100);
    return {
      ...item,
      createdBy: quote.createdBy || "",
      amount: parseFloat(amount.toFixed(2)),
    };
  };
  const quoteItems: IQuoteItem[] = validatedQuoteItems.map(calculateSubtotal);
  const taxableAmount = quoteItems.reduce(
    (prev, next) => prev + next.rate * next.qty,
    0
  );
  const { quoteIndex, quoteNo } = await nextIndexFromSetting("quote", Quote);
  const grandTotal = taxableAmount + sgst + cgst + igst;

  const newQuote = await quoteJoiSchema.validateAsync({
    ...quote,
    taxableAmount,
    quoteItems,
    grandTotal: parseFloat(grandTotal.toFixed(2)),
    igst: parseFloat(igst.toFixed(2)),
    sgst: parseFloat(sgst.toFixed(2)),
    cgst: parseFloat(cgst.toFixed(2)),
    quoteIndex,
    quoteNo,
  });
  return newQuote;
}

export async function createQuote(quote: ICreateQuote) {
  console.log(quote);

  const newQuote = new Quote(quote);
  return newQuote.save();
}

export async function getAllQuotes({ select = "", filter = {} }) {
  return Quote.find(filter)
    .select(select)
    .populate("customer", "name billingAddress gstNo panNo");
}

export async function getQuote(quoteId: string, select = "") {
  return Quote.findById(quoteId)
    .select(select)
    .populate("customer", "billingAddress name gstNo panNo")
    .populate("createdBy", "email firstName lastName");
}
