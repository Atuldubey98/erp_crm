import { useEffect, useState } from "react";

export default function useDelayedSearch(
  search: string,
  cleanupCb: CallableFunction
) {
  const [delayedSearchKey, setDelayedSearchKey] = useState("");
  const DELAY_SEARCH_TIMEOUT = 1000;
  useEffect(() => {
    const delayedSearchId = setTimeout(() => {
      setDelayedSearchKey(search);
      if (delayedSearchKey !== search) {
        cleanupCb();
      }
    }, DELAY_SEARCH_TIMEOUT);
    return () => {
      clearTimeout(delayedSearchId);
    };
  }, [search]);
  return { delayedSearchKey };
}
