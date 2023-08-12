import mongoose, { Mongoose } from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: "inactive",
    },
    name: {
      type: String,
      required: true,
    },
    // Stock Kepping Unit
    sku: {
      type: String,
      required: true,
      unique: true,
      index: 1,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: 1,
    },
    qty: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    salesPrice: {
      type: Number,
    },
    salesStartDate: {
      type: Date,
    },
    salesEndDate: {
      type: Date,
    },

    description: {
      type: String,
      required: true,
    },

    parentCat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: "",
      required: true,
    },

    images: [
      {
        type: String,
      },
    ],
    ratings: {
      type: Number,
      max: 5,
      default: 5,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
