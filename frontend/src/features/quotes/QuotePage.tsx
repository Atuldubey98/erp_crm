import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFullQuote } from "../../api/quote.api";
import PrivateMainLayout from "../layouts/PrivateMainLayout";
import TableWrapper from "../layouts/TableWrapper";

function QuoteDisplayHeader(props: { quote: Quote }) {
  return (
    <div className="leading-10 border-b-2 flex justify-between pb-3">
      <div className="flex-1">
        <p>Quote To :</p>
        <p className="font-bold">{props.quote.customer.name}</p>
        <p>{props.quote.customer.billingAddress}</p>
        {props.quote.customer.gstNo ? (
          <p>GST No. : {props.quote.customer.gstNo}</p>
        ) : null}
        {props.quote.customer.panNo ? (
          <p>PAN No. : {props.quote.customer.panNo}</p>
        ) : null}
      </div>
      <div className="flex-1 text-right">
        <p className="font-bold">Q No. : {props.quote.quoteNo}</p>
        <p>
          Date :
          {new Intl.DateTimeFormat("en-us").format(new Date(props.quote.date))}
        </p>
      </div>
    </div>
  );
}

function QuoteItem(props: { quoteItem: IQuoteItem; index: number }) {
  return (
    <tr className="text-sm">
      <td className="border-2 border-emerald-500 p-1 text-center ">
        {props.index}
      </td>
      <td className="border-2 border-emerald-500 p-1">
        {props.quoteItem.name}
      </td>
      <td className="border-2 border-emerald-500 p-1">{props.quoteItem.qty}</td>
      <td className="border-2 text-right border-emerald-500 p-1">
        {props.quoteItem.rate}
      </td>
      <td className="border-2 w-16 border-emerald-500 p-1 text-right">
        {props.quoteItem.tax.gstType + "@" + props.quoteItem.tax.gstPercentage}%
      </td>
      <td className="border-2 border-emerald-500 p-1 text-right">
        {(parseFloat(props.quoteItem.tax.gstPercentage) / 100) *
          props.quoteItem.rate *
          props.quoteItem.qty}
      </td>
      <td className="border-2 text-right border-emerald-500 p-1">
        {props.quoteItem.amount}
      </td>
    </tr>
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
          <QuoteDisplayHeader quote={quote} />
          <div className="mt-2">
            <TableWrapper
              headerRow={[
                "*",
                "Particulars",
                "Qty",
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
                  colSpan={5}
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
                  colSpan={5}
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
                  colSpan={5}
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
          {quote.termsAndCondtions ? (
            <div className="text-sm leading-8">{quote.termsAndCondtions}</div>
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
