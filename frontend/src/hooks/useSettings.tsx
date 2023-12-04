import { useContext } from "react";
import SettingsContext from "../contexts/SettingsContext";

export default function useSettings() {
  const settings = useContext(SettingsContext);
  return {
    companySettings: settings?.company || null,
    invoiceSettings: settings?.invoice || null,
    quoteSettings: settings?.quote || null,
    status: settings?.status,
  };
}
