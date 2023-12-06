import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFullQuote } from "../../api/quote.api";
import PrivateMainLayout from "../layouts/PrivateMainLayout";
import TableWrapper from "../layouts/TableWrapper";
import { QuoteDisplayHeader } from "./QuoteDisplayHeader";
import { QuoteItem } from "./QuoteItem";

export default function QuotePage() {
  const { quoteId = "" } = useParams();
  const [quote, setQuote] = useState<Quote | null>(null);
  const [quoteItems, setQuoteItems] = useState<IQuoteItem[]>([]);
  useEffect(() => {
    if (!quoteId) {
      return;
    }
    (async () => {
      const [quoteRes, quoteItemesRes] = await getFullQuote(quoteId);
      setQuote(quoteRes.data.data);
      setQuoteItems(quoteItemesRes.data.data);
    })();
  }, [quoteId]);
  const totalGST = quoteItems.reduce((total, quoteItem) => {
    return (
      total +
      (quoteItem.rate *
        quoteItem.qty *
        parseFloat(quoteItem.tax.gstPercentage)) /
        100
    );
  }, 0);
  return (
    <PrivateMainLayout>
      {quote ? (
        <div className="p-3">
          <QuoteDisplayHeader quote={quote} />
          <div className="mt-2">
            <TableWrapper
              headerRow={[
                "*",
                "Particulars",
                "Qty",
                "UM",
                "Rate",
                "GST",
                "Tax",
                "Total",
              ]}
            >
              {quoteItems.map((quoteItem, index) => (
                <QuoteItem
                  key={quoteItem._id}
                  quoteItem={quoteItem}
                  index={index}
                />
              ))}
              <tr>
                <td
                  colSpan={6}
                  className="text-right font-bold p-1 border-emerald-500 border-2"
                >
                  Sub Total
                </td>
                <td
                  colSpan={2}
                  className="text-right p-1 border-emerald-500 border-2"
                >
                  {quote.taxableAmount}
                </td>
              </tr>
              <tr>
                <td
                  colSpan={6}
                  className="text-right font-bold p-1 border-emerald-500 border-2"
                >
                  Total Tax
                </td>
                <td
                  colSpan={2}
                  className="text-right p-1 border-emerald-500 border-2"
                >
                  {totalGST}
                </td>
              </tr>
              <tr>
                <td
                  colSpan={6}
                  className="text-right font-bold p-1 border-emerald-500 border-2"
                >
                  Grand Total
                </td>
                <td colSpan={2} className="text-right p-1">
                  {quote.grandTotal}
                </td>
              </tr>
            </TableWrapper>
          </div>
          {quote.termsAndConditions ? (
            <div className="text-sm leading-8">
              <h3 className="text-md font-bold">Terms And Conditons :</h3>
              <p>{quote.termsAndConditions}</p>
            </div>
          ) : null}
          {quote.description ? (
            <div className="text-sm leading-8">
              <h3 className="text-md font-bold">Description</h3>
              <p>{quote.description}</p>
            </div>
          ) : null}
        </div>
      ) : (
        <div></div>
      )}
    </PrivateMainLayout>
  );
}
