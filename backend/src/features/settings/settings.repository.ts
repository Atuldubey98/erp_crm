import mongoose, { Model } from "mongoose";
import { IInvoiceSetting, IQuoteSetting } from "../quote/types";
import { SettingNotFoundError } from "./errors";
let settingsRef: mongoose.mongo.Collection;
mongoose.connection.once("open", () => {
  settingsRef = mongoose.connection.db.collection("settings");
});

export enum ESettingType {
  COMPANY = "company",
  INVOICE = "invoice",
  QUOTE = "quote",
  ADMIN = "admin",
}

export const getSettingsByType = (setttingType: string) => {
  return settingsRef.findOne({ type: setttingType });
};

export const getSettings = async () => {
  const [company, invoice, quote, admin] = await Promise.all([
    getSettingsByType(ESettingType.COMPANY),
    getSettingsByType(ESettingType.INVOICE),
    getSettingsByType(ESettingType.QUOTE),
    getSettingsByType(ESettingType.ADMIN),
  ]);
  return { company, invoice, quote, admin };
};

export const saveSetting = async (setting: any, settingType: string) => {
  return settingsRef.insertOne({
    type: settingType,
    ...setting,
  });
};
export const updateSetting = async (setting: any, settingType: string) => {
  const updated = await settingsRef.findOneAndUpdate(
    { type: settingType },
    { $set: setting },
    { returnDocument: "after" }
  );
  return updated.value;
};

export const nextIndexFromSetting = async (
  settingType: string,
  model: Model<any, any>
) => {
  const lastInsertedQuote = await model.findOne({}).sort({ createdAt: -1 });
  const quoteIndex = lastInsertedQuote
    ? (lastInsertedQuote.quoteIndex || 0) + 1
    : 1;
  const quoteSetting = (await getSettingsByType(settingType)) as unknown as
    | IQuoteSetting
    | IInvoiceSetting;
  if (!quoteSetting) {
    throw new SettingNotFoundError();
  }
  const quoteNo =
    quoteSetting.seriesType === "append"
      ? `${quoteIndex}${quoteSetting.value || ""}`
      : `${quoteSetting.value || ""}${quoteIndex}`;
  return { quoteNo, quoteIndex };
};
