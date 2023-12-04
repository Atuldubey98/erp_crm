import Joi from "joi";

const customerJoiSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  shippingAddress: Joi.string().min(2).max(80),
  billingAddress: Joi.string().min(2).max(80).required(),
  gstNo: Joi.string().min(15).max(15),
  createdBy: Joi.string().required(),
  updatedBy: Joi.string(),
  panNo: Joi.string().min(10).max(10),
});

const updateJoiSchema = Joi.object({
  name: Joi.string().min(3).max(50),
  shippingAddress: Joi.string().min(3).max(80),
  billingAddress: Joi.string().min(3).max(80),
  gstNo: Joi.string().min(15).max(15),
  createdBy: Joi.string(),
  updatedBy: Joi.string().required(),
  panNo: Joi.string().min(10).max(10),
});

export { customerJoiSchema, updateJoiSchema };
