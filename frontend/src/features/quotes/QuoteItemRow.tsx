import { useNavigate } from "react-router-dom";
import TableData from "../common/TableData";
import OptionsDropDown from "../customers/OptionsDropDown";
import TableRowLayout from "../layouts/TableRowLayout";
import { deleteQuote } from "../../api/quote.api";
import DropDownIcon from "../common/DropDownIcon";

export function QuoteItemRow(props: {
  quote: IQuotesRowItem;
  removeQuoteItem: (quoteId: string) => void;
}) {
  const navigate = useNavigate();
  const dropDownList = [
    {
      onClick: function () {
        navigate(`/quotes/${props.quote._id}`);
      },
      label: "View or download",
    },
    {
      onClick: function () {
        navigate(`/quotes/${props.quote._id}/edit`);
      },
      label: "Edit",
    },
    {
      onClick: async function () {
        const response = confirm("Do you want to delete the quote?");
        if (response && props.quote._id) {
          await deleteQuote(props.quote._id);
          props.removeQuoteItem(props.quote._id);
        }
      },
      label: "Delete",
    },
    { onClick: function () {}, label: "Download as pdf" },
  ];
  return (
    <TableRowLayout>
      <td className="border-x-2 text-center border-emerald-500 p-1 text-sm w-10">
        {new Intl.DateTimeFormat("us").format(new Date(props.quote.date))}
      </td>
      <td className="text-center border-x-2 border-emerald-500 p-1 text-sm w-20">
        {props.quote.quoteNo}
      </td>
      <TableData isMiddleCol={true} data={props.quote.customer.name} />
      <TableData
        isMiddleCol={true}
        data={props.quote.customer.billingAddress}
      />
      <td className="text-center border-x-2 border-emerald-500 p-1 text-sm w-20">
        {props.quote.grandTotal}
      </td>
      <td className="w-20">
        <div className="flex items-center justify-center">
          <OptionsDropDown dropDownList={dropDownList}>
            <DropDownIcon />
          </OptionsDropDown>
        </div>
      </td>
    </TableRowLayout>
  );
}
