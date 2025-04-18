import mongoose from "mongoose";

const BudgetSchema = new mongoose.Schema(
  {
    category: { type: String, required: [true, "Please provide category"] },
    amount: { type: Number, required: [true, "Please provide amount"] },
    month: { type: String, required: [true, "Please provide month"] },
  },
  { timestamps: true }
);

BudgetSchema.index({ category: 1, month: 1 }, { unique: true });

const Budget = mongoose.models.Budget || mongoose.model("Budget", BudgetSchema);

Budget.init()
  .then(() => {
    console.log("Budget model indexes ensured.");
  })
  .catch((err) => {
    console.error("Index creation failed:", err);
  });

export default Budget;
