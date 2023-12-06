import { Schema, Types, model } from "mongoose";

const quoteItemSchema = new Schema(
  {
    name: {
      type: String,
      minLength: 3,
      maxLength: 60,
      required: true,
    },
    unit: {
      type: String,
      minLength: 1,
      maxLength: 10,
    },
    rate: {
      type: Number,
      min: 0,
      default: 0,
    },
    qty: {
      type: Number,
      min: 1,
      required: true,
    },
    tax: {
      type: {
        gstType: {
          type: String,
          required: true,
          enum: ["GST", "IGST", "NONE"],
          default: "NONE",
        },
        gstPercentage: {
          type: Number,
          required: true,
          min: 0,
          max: 100,
          default: 0,
        },
      },
      required: true,
    },
    code: {
      type: String,
      minLength: 6,
      maxLength: 8,
    },
    quote: {
      type: Types.ObjectId,
      required: true,
      ref: "quote",
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
    amount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true, versionKey: false }
);
const QuoteItem = model("quote_item", quoteItemSchema);
quoteItemSchema.pre("save", function (next) {
  this.amount = ((100 + this.tax.gstPercentage) / 100) * this.rate;
  next();
});
export default QuoteItem;
