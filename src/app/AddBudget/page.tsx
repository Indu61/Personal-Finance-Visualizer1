"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ErrorResponse {
  error: string;
}

export default function AddBudget() {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [month, setMonth] = useState("");
  const [duplicateError, setDuplicateError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("amount ", amount);
    console.log("month", month);
    console.log("category", category);
    e.preventDefault();

    const data = {
      amount: parseFloat(amount),
      category,
      month,
    };

    try {
      await axios.post("/api/budgets", data);
      console.log(data);
      setDuplicateError(null);
      router.push("/BudgetList");
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      if (
        error.response &&
        error.response.data?.error &&
        error.response.data.error.includes("already exists")
      ) {
        setDuplicateError("This category in this month is already present.");
      } else {
        setDuplicateError(
          "Failed to save Budget: " +
            (error.response?.data?.error || error.message)
        );
      }
      console.error("Failed to save Budget", err);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-12">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Set Monthly Category Budget
          </h2>
          <p className="text-gray-500 mt-1 text-sm">
            Plan your expenses by category
          </p>
        </div>
        {duplicateError && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm">
            {duplicateError}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Month</label>

            <Input
              type="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Category</label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger className="border border-gray-300 rounded px-3 py-2 w-full">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  <SelectItem value="Food & Dining">Food & Dining</SelectItem>
                  <SelectItem value="Shopping">Shopping</SelectItem>
                  <SelectItem value="Transportation">Transportation</SelectItem>
                  <SelectItem value="Housing">Housing</SelectItem>
                  <SelectItem value="Entertainment">Entertainment</SelectItem>
                  <SelectItem value="Utilities">Utilities</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="submit">Set Budget</Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/BudgetList")}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
