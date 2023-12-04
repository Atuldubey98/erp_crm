import { Link } from "react-router-dom";
import FilterAddNewSectionWrapper from "../layouts/FilterAddNewSectionWrapper";
import { ChangeEvent } from "react";

export function Filter(filterProps: {
  onChangeFilter: (e: ChangeEvent<HTMLInputElement>) => void;
  filter: {
    startDate: string;
    endDate: string;
  };
}) {
  return (
    <FilterAddNewSectionWrapper>
      <div className="flex items-center justify-center flex-auto gap-3">
        <label className="block">
          <span className="text-sm">Start Date </span>
          <input
            onChange={filterProps.onChangeFilter}
            value={filterProps.filter.startDate}
            type="date"
            name="startDate"
            id="startDate"
            className="text-sm"
          />
        </label>
        <label className="block">
          <span className="text-sm">End Date </span>
          <input
            type="date"
            name="endDate"
            id="endDate"
            className="text-sm"
            onChange={filterProps.onChangeFilter}
            value={filterProps.filter.endDate}
          />
        </label>
      </div>
      <div className="flex items-center justify-between">
        <Link
          className="font-bold p-1 bg-emerald-800 text-white rounded"
          to={"/quotes/new"}
        >
          New Quote
        </Link>
      </div>
    </FilterAddNewSectionWrapper>
  );
}
