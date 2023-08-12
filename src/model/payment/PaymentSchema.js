import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: "inactive",
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamp: true }
);

export default mongoose.model("Payment_Option", PaymentSchema);
