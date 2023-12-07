import { ChangeEvent, useEffect, useState } from "react";
import { getQuotes } from "../api/quote.api";

export default function useQuotes() {
  const [quotes, setQuotes] = useState<IQuotesRowItem[]>([]);
  const [status, setStatus] = useState<IApiStatus>("idle");
  const DAYS = 30;
  const MILL_SECS_IN_A_DAY = 24 * 60 * 60 * 1000;
  const thirtyDaysFBeforeDate = new Date(Date.now() - DAYS * MILL_SECS_IN_A_DAY)
    .toISOString()
    .split("T")[0];
  const todayDate = new Date(Date.now() + MILL_SECS_IN_A_DAY)
    .toISOString()
    .split("T")[0];
  const [filter, setFilter] = useState({
    startDate: thirtyDaysFBeforeDate,
    endDate: todayDate,
  });
  useEffect(() => {
    (async () => {
      try {
        setStatus("loading");
        const { data } = await getQuotes(
          "grandTotal createdBy quoteNo quoteIndex date",
          filter.startDate,
          filter.endDate
        );
        setQuotes(data.data);
        setStatus("succeeded");
      } catch (error) {
        setStatus("failed");
      }
    })();
  }, [filter]);
  const onChangeFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter({ ...filter, [e.currentTarget.name]: e.currentTarget.value });
  };
  const filterProps = {
    onChangeFilter,
    filter,
  };
  const removeQuoteItem = (quoteId: string) => {
    setQuotes(quotes.filter((quote) => quote._id !== quoteId));
  };
  return { quotes, status, filterProps, removeQuoteItem };
}
