export function TotalBottomRow(props: {
  totalQty: number;
  totalGST: number;
  grandTotal: number;
}) {
  return (
    <tr>
      <td className="font-bold p-2" colSpan={3}>
        Total
      </td>
      <td className="border-l-2 p-2 border-emerald-500 text-right">
        {props.totalQty.toFixed(2)}
      </td>
      <td className="border-l-2 p-2 border-emerald-500"></td>
      <td className="border-l-2 p-2 border-emerald-500"></td>
      <td className="border-l-2 p-2 border-emerald-500 text-right">
        {props.totalGST.toFixed(2)}
      </td>
      <td className="border-l-2 p-2 border-emerald-500 text-right">
        {props.grandTotal}
      </td>
    </tr>
  );
}
