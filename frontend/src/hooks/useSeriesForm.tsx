import { ChangeEvent, useState } from "react";

export default function useSeriesForm() {
  const [series, setSeries] = useState<ISeries>({
    invoice: "",
    invoiceSeriesType: "append",
    quote: "",
    quoteSeriesType: "append",
  });
  const onSetSeriesType = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setSeries({ ...series, [name]: value });
  };
  return { series, onSetSeriesType };
}
