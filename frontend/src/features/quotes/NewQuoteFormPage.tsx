import { FormEvent, useCallback, useEffect } from "react";
import useQuoteForm from "../../hooks/useQuoteForm";
import { FormHeading } from "../common/FormHeading";
import PrivateMainLayout from "../layouts/PrivateMainLayout";
import TableWrapper from "../layouts/TableWrapper";
import AmountInWords from "./AmountInWords.tsx";
import QuoteFormFooter from "./QuoteFormFooter";
import QuoteItemEditableRow from "./QuoteItemEditableRow";
import SelectCustomer from "./SelectCustomer";
import { TotalBottomRow } from "./TotalBottomRow";

export default function NewQuoteFormPage() {
  const {
    newQuoteItemProps,
    customerProps,
    quoteFooterProps,
    dateProps,
    submitForm,
  } = useQuoteForm();
  const headerRow = [
    "*",
    "Item/Service Name",
    "HSN Code",
    "Qty",
    "Unit",
    "Rate",
    "Total",
    "GST",
    "Amount",
  ];
  const totalQty = newQuoteItemProps.quoteItems.reduce(
    (total, quotItem) => total + parseFloat(quotItem.qty || "0"),
    0.0
  );
  const totalGST = newQuoteItemProps.quoteItems.reduce((total, quoteItem) => {
    return (
      ((total +
        parseFloat(quoteItem.rate || "0") * parseFloat(quoteItem.qty || "0")) *
        parseFloat(quoteItem.tax.gstPercentage || "0")) /
      100
    );
  }, 0);
  const grandTotal = newQuoteItemProps.quoteItems.reduce((total, quoteItem) => {
    const rate = parseFloat(quoteItem.rate || "0");
    const qty = parseFloat(quoteItem.qty || "0");
    const taxPercentage = parseFloat(quoteItem.tax.gstPercentage || "0");
    const subtotal = rate * qty;
    const tax = (subtotal * taxPercentage) / 100;
    return total + tax + subtotal;
  }, 0);
  const taxableAmount = newQuoteItemProps.quoteItems.reduce(
    (total, quoteItem) => {
      const rate = parseFloat(quoteItem.rate || "0");
      const qty = parseFloat(quoteItem.qty || "0");
      return total + rate * qty;
    },
    0
  );
  function keysHandler(e: KeyboardEvent) {
    if (e.altKey && e.key === "n") {
      newQuoteItemProps.onAddQuoteItem();
    }
  }
  const keysHandlerCb = useCallback(keysHandler, []);
  useEffect(() => {
    document.addEventListener("keydown", keysHandlerCb);
    return () => {
      document.removeEventListener("keydown", keysHandlerCb);
    };
  }, []);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitForm();
  };
  return (
    <PrivateMainLayout>
      <section className="p-3">
        <FormHeading text="Estimate" />
        <form onSubmit={onSubmit} className="grid gap-2 my-2 text-sm">
          <div className="flex items-center justify-end">
            <label className="text-slate-800" htmlFor="date">
              Q No. :
            </label>
            <span className="font bold">1</span>
          </div>
          <SelectCustomer {...customerProps} />
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center">
              <label className="text-slate-800" htmlFor="date">
                Date :
              </label>
              <input
                type="date"
                name="date"
                className="font-bold"
                value={dateProps.date}
                onChange={dateProps.onChangeDate}
              />
            </div>
            <button
              onClick={newQuoteItemProps.onAddQuoteItem}
              type="button"
              className="border-2 border-blue-500 p-2 text-blue-500 text-sm font-bold rounded"
            >
              New Item +
            </button>
          </div>
          <TableWrapper headerRow={headerRow}>
            {newQuoteItemProps.quoteItems.map((quoteItem) => (
              <QuoteItemEditableRow
                quoteItem={quoteItem}
                key={quoteItem._id}
                changeNewQuoteItem={newQuoteItemProps.changeNewQuoteItem(
                  quoteItem
                )}
                onRemoveQuoteItem={newQuoteItemProps.onRemoveQuoteItem}
              />
            ))}
            <TotalBottomRow
              totalQty={totalQty}
              totalGST={totalGST}
              grandTotal={grandTotal}
            />
            <AmountInWords
              grandTotal={grandTotal}
              taxableAmount={taxableAmount}
            />
            <tr className="border-2 border-emerald-500"></tr>
            <QuoteFormFooter {...quoteFooterProps} />
          </TableWrapper>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-emerald-600 p-2 text-white hover:bg-emerald-500 rounded text-bold"
            >
              Save
            </button>
          </div>
        </form>
      </section>
    </PrivateMainLayout>
  );
}
