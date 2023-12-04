import { useState } from "react";

export default function useSkipLimit() {
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
  const onChangeSkip = (skip: number) => {
    setSkip(skip);
  };
  const onIncrementSkip = () => {
    setSkip(skip + limit);
  };
  const onChangeLimit = (newLimit: number) => {
    setSkip(0);
    setLimit(newLimit);
  };
  return { onChangeLimit, onChangeSkip, skip, limit, onIncrementSkip };
}
