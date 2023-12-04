import { Link } from "react-router-dom";
import addBtnLogo from "../../assets/add_btn.svg";

export default function MainNavLinksList() {
  return (
    <ul className="h-full">
      <li className="flex items-center gap-2 p-2 justify-between">
        <Link to="/customers" className="text-sm font-bold">
          Customers
        </Link>
        <Link to={"/customers/new"}>
          <img
            className="cursor-pointer"
            src={addBtnLogo}
            alt="Add Btn logo"
            height={20}
            width={20}
          />
        </Link>
      </li>
      <li className="flex items-center gap-2 p-2 justify-between">
        <Link to="/customers" className="text-sm font-bold">
          Invoices
        </Link>
        <Link to={"/invoices/new"}>
          <img
            className="cursor-pointer"
            src={addBtnLogo}
            alt="Add Btn logo"
            height={20}
            width={20}
          />
        </Link>
      </li>
      <li className="flex items-center gap-2 p-2 justify-between">
        <Link to="/quotes" className="text-sm font-bold">
          Quotation
        </Link>
        <Link to={"/quotes/new"}>
          <img
            src={addBtnLogo}
            alt="Add Btn logo"
            className="cursor-pointer"
            height={20}
            width={20}
          />
        </Link>
      </li>
    </ul>
  );
}
