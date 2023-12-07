import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getFullQuote } from "../../api/quote.api";
import PrivateMainLayout from "../layouts/PrivateMainLayout";
import TableWrapper from "../layouts/TableWrapper";
import { QuoteDisplayHeader } from "./QuoteDisplayHeader";
import { QuoteItem } from "./QuoteItem";
import QuoteTerms from "./QuoteTerms";

function QuoteButtons(props: { _id: string }) {
  return (
    <div className="gap-2 flex items-center justify-end">
      <Link className="font-bold text-purple-900" to={`/quotes/${props._id}`}>
        Edit
      </Link>
      <button className="font-bold text-red-500">Delete</button>
    </div>
  );
}

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
          <QuoteButtons _id={quote._id} />
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
                  {quote.taxableAmount.toFixed(2)}
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
                  {totalGST.toFixed(2)}
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
                  {quote.grandTotal.toFixed(2)}
                </td>
              </tr>
            </TableWrapper>
          </div>
          <QuoteTerms
            termsAndConditions={quote.termsAndConditions}
            description={quote.description}
          />
        </div>
      ) : (
        <></>
      )}
    </PrivateMainLayout>
  );
}
