export function QuoteDisplayHeader(props: { quote: Quote }) {
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
