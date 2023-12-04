import { ChangeEvent, useEffect, useState } from "react";
import { paginatedCustomers } from "../api/customer.api";
import useSkipLimit from "./useSkipLimit";
import useDelayedSearch from "./useDelayedSearch";

export default function useCustomers() {
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const [status, setStatus] = useState<IApiStatus>("idle");
  const [total, setTotal] = useState<number | null>(null);
  const { skip, limit, onChangeLimit, onChangeSkip, onIncrementSkip } =
    useSkipLimit();
  const [search, setSearch] = useState("");
  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };
  const { delayedSearchKey } = useDelayedSearch(search, () => {
    setCustomers([]);
    skipProps.onChangeSkip(0);
  });
  useEffect(() => {
    (async () => {
      try {
        setStatus("loading");
        if (!skip) {
          setCustomers([]);
        }
        const { data } = await paginatedCustomers({
          skip,
          limit,
          search: delayedSearchKey,
        });
        setCustomers((prev) => [...prev, ...data.data]);
        setTotal(data.total);
        setStatus("succeeded");
      } catch (error) {
        setStatus("failed");
      }
    })();
  }, [limit, delayedSearchKey, skip]);
  const limitProps = {
    limit,
    onChangeLimit,
  };
  const skipProps = {
    skip,
    onChangeSkip,
    onIncrementSkip,
  };
  const searchProps = {
    search,
    onChangeSearch,
    delayedSearchKey,
  };
  const hasMore = total ? total > customers.length : false;
  return {
    limitProps,
    hasMore,
    total,
    skipProps,
    customers,
    status,
    searchProps,
  };
}
