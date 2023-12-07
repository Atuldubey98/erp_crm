export function QuoteItem(props: { quoteItem: IQuoteItem; index: number }) {
  const tax =
    (parseFloat(props.quoteItem.tax.gstPercentage) / 100) *
    props.quoteItem.rate *
    props.quoteItem.qty;
  return (
    <tr className="text-sm">
      <td className="border-2 border-emerald-500 p-1 text-center ">
        {props.index + 1}
      </td>
      <td className="border-2 border-emerald-500 p-1">
        {props.quoteItem.name}
      </td>
      <td className="border-2 border-emerald-500 p-1 text-right">
        {props.quoteItem.qty}
      </td>
      <td className="border-2 border-emerald-500 p-1 text-right">
        {props.quoteItem.unit}
      </td>
      <td className="border-2 text-right border-emerald-500 p-1">
        {props.quoteItem.rate.toFixed(2)}
      </td>
      <td className="border-2 w-16 border-emerald-500 p-1 text-right">
        {props.quoteItem.tax.gstType + "@" + props.quoteItem.tax.gstPercentage}%
      </td>
      <td className="border-2 border-emerald-500 p-1 text-right">
        {tax.toFixed(2)}
      </td>
      <td className="border-2 text-right border-emerald-500 p-1">
        {props.quoteItem.amount.toFixed(2)}
      </td>
    </tr>
  );
}
