export default function AmountInWords(props: {
  grandTotal: number;
  taxableAmount: number;
}) {
  return (
    <>
      <tr className="border-t-2 border-emerald-500">
        <td className="font-bold p-2" colSpan={5}></td>
        <td className="font-bold p-2 border-2 border-emerald-500" colSpan={2}>
          Grand Total
        </td>
        <td className="font-bold p-2 border-2 border-emerald-500" colSpan={1}>
          {props.grandTotal}
        </td>
      </tr>
      <tr>
        <td className="font-bold p-2" colSpan={5}></td>
        <td className="font-bold p-2 border-2 border-emerald-500" colSpan={2}>
          Sub Total
        </td>
        <td className="font-bold p-2 border-2 border-emerald-500" colSpan={1}>
          {props.taxableAmount}
        </td>
      </tr>
    </>
  );
}
