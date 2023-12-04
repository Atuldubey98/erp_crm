export type StartingSeriesFormProps = {
  onSetSeriesType: (e: React.ChangeEvent<HTMLInputElement>) => void;
  series: ISeries;
};
export default function StartingSeriesForm({
  series,
  onSetSeriesType,
}: StartingSeriesFormProps) {
  return (
    <>
      <p className="text-sm italic">
        Suppose your company's name is ABC Company. You need to append or
        prepend the a series of characters in the series.
      </p>
      <p className="text-sm italic">eg. ABC/23-24/1</p>
      <div className="grid gap-3">
        <div>
          <div className="block">
            <span className="block text-sm font-medium text-slate-700">
              Invoice Series Type
            </span>
            <div className="flex gap-3">
              <label className="flex gap-3">
                <span className="block text-sm font-medium text-slate-700">
                  Start
                </span>
                <input
                  type="radio"
                  required
                  checked={series.invoiceSeriesType === "prepend"}
                  value={"prepend"}
                  onChange={onSetSeriesType}
                  maxLength={30}
                  name="invoiceSeriesType"
                  className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-emerald-500 block w-full rounded-md sm:text-sm focus:ring-1"
                  placeholder="ABC/23-24"
                />
              </label>
              <label className="flex gap-3">
                <span className="block text-sm font-medium text-slate-700">
                  End
                </span>
                <input
                  type="radio"
                  required
                  checked={series.invoiceSeriesType === "append"}
                  value={"append"}
                  onChange={onSetSeriesType}
                  maxLength={30}
                  name="invoiceSeriesType"
                  className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-emerald-500 block w-full rounded-md sm:text-sm focus:ring-1"
                  placeholder="ABC/23-24"
                />
              </label>
            </div>
          </div>
          <label className="block flex-1">
            <span className="block text-sm font-medium text-slate-700">
              Invoice series
            </span>
            <input
              type="text"
              minLength={3}
              value={series.invoice.toUpperCase()}
              onChange={onSetSeriesType}
              maxLength={30}
              name="invoice"
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-emerald-500 block w-full rounded-md sm:text-sm focus:ring-1"
              placeholder="ABC/23-24"
            />
          </label>
        </div>
        <div>
          <div className="block">
            <span className="block text-sm font-medium text-slate-700">
              Quotation Series Type
            </span>
            <div className="flex gap-3">
              <label className="flex gap-3">
                <span className="block text-sm font-medium text-slate-700">
                  Start
                </span>
                <input
                  type="radio"
                  required
                  checked={series.quoteSeriesType === "prepend"}
                  value={"prepend"}
                  onChange={onSetSeriesType}
                  maxLength={30}
                  name="quoteSeriesType"
                  className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-emerald-500 block w-full rounded-md sm:text-sm focus:ring-1"
                  placeholder="ABC/23-24"
                />
              </label>
              <label className="flex gap-3">
                <span className="block text-sm font-medium text-slate-700">
                  End
                </span>
                <input
                  type="radio"
                  required
                  checked={series.quoteSeriesType === "append"}
                  value={"append"}
                  onChange={onSetSeriesType}
                  maxLength={30}
                  name="quoteSeriesType"
                  className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-emerald-500 block w-full rounded-md sm:text-sm focus:ring-1"
                  placeholder="ABC/23-24"
                />
              </label>
            </div>
          </div>
          <label className="block flex-1">
            <span className="block text-sm font-medium text-slate-700">
              Quotation/Estimate series
            </span>
            <input
              type="text"
              minLength={3}
              onChange={onSetSeriesType}
              value={series.quote.toUpperCase()}
              maxLength={30}
              name="quote"
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-emerald-500 block w-full rounded-md sm:text-sm focus:ring-1"
              placeholder="ABC/23-24"
            />
          </label>
        </div>
      </div>
    </>
  );
}
