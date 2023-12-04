import { Link } from "react-router-dom";

export default function Header({ children }: { children?: React.JSX.Element }) {
  return (
    <header className="border-b-2 border-emerald-500 p-2">
      <div className="flex">
        <input
          placeholder="Search for entity"
          type="search"
          className="flex-1 focus:outline-none"
        />
        <div className="flex-auto gap-2 flex flex-wrap item-center justify-center">
          <Link
            to={"/invoices/new"}
            className="font-bold text-bold border-emerald-500 border-2 p-2 rounded"
          >
            Create Invoice
          </Link>
          <Link
            to={"/quotes/new"}
            className="font-bold border-emerald-500 border-2 p-2 rounded"
          >
            Create Quote
          </Link>
        </div>
      </div>
      {children}
    </header>
  );
}
