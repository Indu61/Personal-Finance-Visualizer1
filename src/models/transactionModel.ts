import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: [true, "Please provide amount"] },
    date: { type: Date, required: [true, "Please provide date"] },
    category: { type: String, required: [true, "Please provide category"] },
    description: {
      type: String,
      required: [true, "Please provide description"],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Transaction ||
  mongoose.model("Transaction", TransactionSchema);
