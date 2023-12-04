import { useNavigate } from "react-router-dom";
import TableData from "../common/TableData";
import OptionsDropDown from "../customers/OptionsDropDown";
import TableRowLayout from "../layouts/TableRowLayout";

export function QuoteItemRow(props: { quote: IQuotesRowItem }) {
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
    { onClick: function () {}, label: "Delete" },
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
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM12 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM12 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                  fill="#000000"
                  fillOpacity=".16"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                />
              </g>
            </svg>
          </OptionsDropDown>
        </div>
      </td>
    </TableRowLayout>
  );
}
