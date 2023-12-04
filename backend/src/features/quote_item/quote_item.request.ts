import Joi from "joi";

const quoteItemJoiSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  rate: Joi.number().min(0).default(0),
  qty: Joi.number().min(1).required(),
  tax: Joi.object({
    gstType: Joi.string().valid("GST", "IGST", "NONE").default("NONE"),
    gstPercentage: Joi.number().min(0).max(100).required().default(0),
  }).required(),
  quote: Joi.string().required(),
  code: Joi.string().min(6).max(8),
  createdBy: Joi.string().required(),
  updatedBy: Joi.string(),
  amount: Joi.number().min(0).default(0),
});
export { quoteItemJoiSchema };
