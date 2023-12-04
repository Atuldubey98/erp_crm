import { Schema, Types, model } from "mongoose";

const quoteSchema = new Schema(
  {
    createdBy: {
      type: Types.ObjectId,
      ref: "user",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    updatedBy: {
      type: Types.ObjectId,
      ref: "user",
    },
    customer: {
      type: Types.ObjectId,
      ref: "customer",
      required: true,
      index: true,
    },
    taxableAmount: {
      type: Number,
      default: 0,
      min: 0,
    },
    sgst: {
      type: Number,
      min: 0,
      default: 0,
    },
    cgst: {
      type: Number,
      min: 0,
      default: 0,
    },
    igst: {
      type: Number,
      min: 0,
      default: 0,
    },
    quoteNo: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
      maxLength: 250,
    },
    termsAndConditions: {
      type: String,
      maxLength: 250,
    },
    grandTotal: {
      type: Number,
      min: 0,
      default: 0,
    },
    quoteIndex: {
      type: Number,
      min: 1,
    },
  },
  { timestamps: true, versionKey: false }
);
const Quote = model("quote", quoteSchema);

export default Quote;
