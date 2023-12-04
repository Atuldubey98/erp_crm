import { Schema, Types, model } from "mongoose";

const customerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 80,
    },
    shippingAddress: {
      type: String,
      minLength: 2,
      maxLength: 80,
    },
    billingAddress: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 80,
    },
    gstNo: {
      type: String,
      minLength: 15,
      maxLength: 15,
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "user",
      required: true,
    },
    updatedBy: {
      type: Types.ObjectId,
      ref: "user",
    },
    panNo: {
      type: String,
      minLength: 10,
      maxLength: 10,
    },
  },
  { timestamps: true, versionKey: false }
);
customerSchema.index({
  name: "text",
  billingAddress: "text",
  shippingAddress: "text",
});
const Customer = model("customer", customerSchema);

export default Customer;
