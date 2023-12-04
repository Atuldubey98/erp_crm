import { ChangeEvent } from "react";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";
import FilterAddNewSectionWrapper from "../layouts/FilterAddNewSectionWrapper";

export type SkipFilterAddNewSectionProps = {
  placeholder: string;
  status: IApiStatus;
  searchProps: {
    search: string;
    onChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  };
  buttonLabel: string;

  limitProps: {
    limit: number;
    onChangeLimit: (limit: number) => void;
  };
};
export default function FilterAddNewSection({
  placeholder,
  limitProps,
  status,
  searchProps,
  buttonLabel,
}: SkipFilterAddNewSectionProps) {
  const { limit, onChangeLimit } = limitProps;
  const { search, onChangeSearch } = searchProps;
  return (
    <FilterAddNewSectionWrapper>
      <div className="flex items-center justify-center w-full">
        <input
          type="search"
          disabled={status === "loading"}
          name="customerSearch"
          id="customerSearch"
          value={search}
          onChange={onChangeSearch}
          className="disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none w-full max-w-sm focus:outline-none p-1 rounded"
          placeholder={placeholder}
        />
        <div className="w-10">{status === "loading" ? <Spinner /> : null}</div>
      </div>
      <div className="flex items-center justify-center gap-2">
        <span className="text-sm font-bold">Per page</span>
        <select
          value={limit}
          onChange={(e) =>
            onChangeLimit(
              isNaN(parseInt(e.currentTarget.value))
                ? 10
                : parseInt(e.currentTarget.value)
            )
          }
          className="border-2 text-sm p-1 bg-white border-emerald-500"
          name="limit"
          id="limit"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
      <Link
        className="font-bold p-1 bg-emerald-800 text-white rounded"
        to={"/customers/new"}
      >
        {buttonLabel}
      </Link>
    </FilterAddNewSectionWrapper>
  );
}
