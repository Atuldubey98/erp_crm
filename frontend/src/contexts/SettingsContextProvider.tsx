import useSettingsFetch from "../hooks/useSettingsFetch";
import SettingsContext from "./SettingsContext";

export default function SettingsContextProvider({
  children,
}: {
  children: React.JSX.Element | React.JSX.Element[];
}) {
  const { companySettings, invoiceSettings, quoteSettings, status } =
    useSettingsFetch();
  return (
    <SettingsContext.Provider
      value={{
        company: companySettings,
        invoice: invoiceSettings,
        quote: quoteSettings,
        admin: null,
        status,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
