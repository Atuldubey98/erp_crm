import { useEffect, useState } from "react";
import settingsApi from "../api/settings.api";

export default function useSettingsFetch() {
  const [companySettings, setCompanySettings] =
    useState<ICompanyDetails | null>(null);
  const [invoiceSettings, setInvoiceSettings] =
    useState<IInvoiceSettings | null>(null);
  const [quoteSettings, setQuoteSettings] = useState<IQuoteSettings | null>(
    null
  );
  const [status, setStatus] = useState<IApiStatus>("loading");
  useEffect(() => {
    (async () => {
      try {
        const { data } = await settingsApi.getSettings();
        setCompanySettings(data.data.company);
        setInvoiceSettings(data.data.invoice);
        setQuoteSettings(data.data.quote);
        setStatus("succeeded");
      } catch (error) {
        setStatus("failed");
      }
    })();
  }, []);
  return {
    companySettings,
    invoiceSettings,
    quoteSettings,
    status,
  };
}
