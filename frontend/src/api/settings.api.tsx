import apiInstance, { sanitizedObject } from "./api.instance";

enum ESettingsApi {
  GET_SETTINGS = "/api/v1/settings",
  SAVE_SETTINGS = "/api/v1/settings/",
}

const getSettings = () => {
  return apiInstance.get(ESettingsApi.GET_SETTINGS);
};
const saveCompanyDetails = (companyDetails: ICompanyDetailsCreateBody) => {
  const { isGSTApplicable, type, ...company } = companyDetails;
  return apiInstance.post(ESettingsApi.SAVE_SETTINGS + type, {
    ...company,
    gstNo: isGSTApplicable ? (company.gstNo || "")?.toUpperCase() : undefined,
    panNo: company.panNo.toUpperCase(),
  });
};
const saveInvoiceSettings = (invoiceSettings: {
  seriesType: string;
  value: string;
  type: string;
}) => {
  const { type, ...invoiceSetting } = invoiceSettings;
  return apiInstance.post(
    ESettingsApi.SAVE_SETTINGS + type,
    sanitizedObject(invoiceSetting)
  );
};
const saveQuoteSettings = (quoteSettings: {
  seriesType: string;
  value: string;
  type: string;
}) => {
  const { type, ...quoteSetting } = quoteSettings;
  return apiInstance.post(
    ESettingsApi.SAVE_SETTINGS + type,
    sanitizedObject(quoteSetting)
  );
};
const saveSetupAdminSettings = (adminSettings: { type: string }) => {
  const { type, ...admin } = adminSettings;
  return apiInstance.post(ESettingsApi.SAVE_SETTINGS + type, admin);
};
const settingsApi = {
  saveCompanyDetails,
  getSettings,
  saveSetupAdminSettings,
  saveInvoiceSettings,
  saveQuoteSettings,
};

export default settingsApi;
