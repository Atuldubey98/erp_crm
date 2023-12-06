import Joi from "joi";
const quoteItemsSchema = Joi.array().items(
  Joi.object({
    _id: Joi.string().optional(),
    name: Joi.string().min(3).max(30).required(),
    rate: Joi.number().min(0).default(0),
    code: Joi.string().min(6).max(8),
    qty: Joi.number().min(1).required(),
    unit: Joi.string().optional(),
    createdBy: Joi.string().optional(),
    tax: Joi.object({
      gstType: Joi.string().valid("GST", "IGST", "NONE").default("NONE"),
      gstPercentage: Joi.number().min(0).max(100).required().default(0),
    }).required(),
    quote: Joi.string().optional(),
  })
);
const quoteJoiSchema = Joi.object({
  createdBy: Joi.string().required(),
  updatedBy: Joi.string(),
  customer: Joi.string().required(),
  taxableAmount: Joi.number().default(0).min(0),
  date: Joi.date().default(new Date(Date.now())),
  sgst: Joi.number().min(0).default(0),
  cgst: Joi.number().min(0).default(0),
  grandTotal: Joi.number().min(0).default(0),
  igst: Joi.number().min(0).default(0),
  quoteNo: Joi.string(),
  description: Joi.string().max(200).allow(""),
  termsAndConditions: Joi.string().max(200).allow(""),
  quoteItems: Joi.array().items(
    Joi.object({
      _id: Joi.string().optional(),
      name: Joi.string().min(3).max(30).required(),
      unit: Joi.string().optional(),
      rate: Joi.number().min(0).default(0),
      tax: Joi.object({
        gstType: Joi.string().valid("GST", "IGST", "NONE").default("NONE"),
        gstPercentage: Joi.number().min(0).max(100).required().default(0),
      }).required(),
      createdBy: Joi.string().required().label("Created By"),
      quote: Joi.string().optional(),
      code: Joi.string().min(6).max(8),
      qty: Joi.number().min(1).required(),
      amount: Joi.number().min(0).default(0),
    })
  ),
  quoteIndex: Joi.number().min(1),
});

export { quoteItemsSchema, quoteJoiSchema };
