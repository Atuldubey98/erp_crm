import Joi from "joi";
import { ESettingType } from "./settings.repository";

export const companySchema = Joi.object({
  name: Joi.string().min(3).max(50).required().label("Name"),
  address: Joi.string().min(3).max(80).required().label("Address"),
  gstNo: Joi.string().min(10).max(15).label("GST Number").optional(),
  panNo: Joi.string().min(10).max(12).required().label("Pan Number"),
});
export const settingTypeSchema = Joi.string().valid(
  ESettingType.COMPANY,
  ESettingType.INVOICE,
  ESettingType.QUOTE,
  ESettingType.ADMIN
);
const invoiceSchema = Joi.object({
  seriesType: Joi.string()
    .valid("prepend", "append")
    .required()
    .label("Series Type"),
  value: Joi.string().label("Series"),
});
const firstAdminRegisteSchema = Joi.object({
  registeredOn: Joi.date().default(new Date(Date.now())),
});
const quoteSchema = invoiceSchema;
export const loadSettingSchema = (settingType: string) => {
  const settingsAvailable: {
    [type: string]: Joi.ObjectSchema;
  } = {
    [ESettingType.COMPANY]: companySchema,
    [ESettingType.INVOICE]: invoiceSchema,
    [ESettingType.QUOTE]: quoteSchema,
    [ESettingType.ADMIN]: firstAdminRegisteSchema,
  };
  return settingsAvailable[settingType] || null;
};
