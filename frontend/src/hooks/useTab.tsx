import { useState } from "react";

export default function useTab(tabLength: number) {
  const [tabIndex, setTabIndex] = useState(0);

  const onClickNext = () => {
    setTabIndex((prev) => (prev + 1 < tabLength ? prev + 1 : prev));
  };
  const onClickPrevious = () => {
    setTabIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };
  return { tabIndex, onClickNext, onClickPrevious };
}
