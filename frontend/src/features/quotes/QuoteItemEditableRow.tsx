import { ChangeEvent, useRef } from "react";
import removeSvg from "../../assets/negative.svg";
import useAutosizeTextArea from "../../hooks/useAutoSizeTextArea";

export default function QuoteItemEditableRow({
  changeNewQuoteItem,
  quoteItem,
  onRemoveQuoteItem,
}: {
  quoteItem: ICreateQuotesRowItemDTO;
  changeNewQuoteItem: {
    code: (e: ChangeEvent<HTMLInputElement>) => void;
    name: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    qty: (e: ChangeEvent<HTMLInputElement>) => void;
    rate: (e: ChangeEvent<HTMLInputElement>) => void;
    tax: (e: ChangeEvent<HTMLSelectElement>) => void;
    unit: (e: ChangeEvent<HTMLSelectElement>) => void;
  };
  onRemoveQuoteItem: ({
    quoteItemId,
    quote,
  }: {
    quoteItemId: string;
    quote?: string;
  }) => void;
}) {
  const tax = `${quoteItem.tax.gstType}:${quoteItem.tax.gstPercentage}`;
  const total = `${(
    (parseFloat(quoteItem.rate || "0") *
      parseFloat(quoteItem.qty || "0") *
      (100 + parseFloat(quoteItem.tax.gstPercentage || "0"))) /
    100
  ).toFixed(2)}`;
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(textAreaRef.current, quoteItem.name);
  const subtotal =
    parseFloat(quoteItem.rate || "0") * parseFloat(quoteItem.qty || "0");
  return (
    <tr className="border-b-2 border-emerald-500">
      <td className="w-8">
        <img
          onClick={() =>
            onRemoveQuoteItem({
              quoteItemId: quoteItem._id || "",
              quote: quoteItem.quote,
            })
          }
          className="cursor-pointer mx-auto"
          src={removeSvg}
          alt="Remove"
          height={20}
          width={20}
        />
      </td>
      <td className="border-emerald-500 text-sm border-x-2">
        <textarea
          value={quoteItem.name}
          onChange={changeNewQuoteItem.name}
          name="name"
          ref={textAreaRef}
          minLength={3}
          maxLength={80}
          id="name"
          className="disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none bg-white placeholder-slate-400 focus:outline-none block w-full rounded-md sm:text-s p-1"
        />
      </td>
      <td className="border-emerald-500 text-sm border-x-2 w-20">
        <input
          value={quoteItem.code}
          onChange={changeNewQuoteItem.code}
          type="text"
          name="code"
          minLength={6}
          maxLength={8}
          id="code"
          className="disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none bg-white placeholder-slate-400 focus:outline-none block w-full rounded-md sm:text-sm"
        />
      </td>
      <td className="border-emerald-500 text-sm border-x-2 w-16">
        <input
          type="text"
          onChange={changeNewQuoteItem.qty}
          value={quoteItem.qty}
          required
          name="qty"
          id="qty"
          className="disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none bg-white placeholder-slate-400 focus:outline-none block w-full rounded-md sm:text-sm text-right"
        />
      </td>
      <td className="border-emerald-500 text-sm border-x-2 w-20">
        <select
          onChange={changeNewQuoteItem.unit}
          value={quoteItem.unit}
          name="unit"
          id="unit"
          className="w-full p-1"
        >
          <option value="NONE">NONE</option>
          <option value="NOS">NOS</option>
          <option value="KG">KG</option>
          <option value="G">G</option>
          <option value="MG">MG</option>
        </select>
      </td>
      <td className="border-emerald-500 text-sm border-x-2 w-20">
        <input
          type="text"
          onChange={changeNewQuoteItem.rate}
          value={quoteItem.rate}
          name="rate"
          required
          id="rate"
          className="disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none bg-white placeholder-slate-400 focus:outline-none block w-full rounded-md sm:text-sm text-right"
        />
      </td>
      <td className="border-emerald-500 text-sm text-right border-x-2 w-20">
        {subtotal.toFixed(2)}
      </td>
      <td className="border-emerald-500 text-sm border-x-2 w-20">
        <select
          onChange={changeNewQuoteItem.tax}
          value={tax}
          className="w-full p-1"
          name="tax"
          id="tax"
        >
          <option value="GST:0">NONE</option>
          <option value="GST:18">GST@18%</option>
          <option value="IGST:18">IGST@18%</option>
          <option value="GST:28">GST@28%</option>
          <option value="GST:5">GST@5%</option>
        </select>
      </td>

      <td className="border-emerald-500 text-sm text-right w-28">{total}</td>
    </tr>
  );
}
