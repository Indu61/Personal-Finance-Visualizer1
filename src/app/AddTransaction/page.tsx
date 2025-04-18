"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AddTransaction() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  // console.log("id ", id);

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  // const [amountError, setamountError] = useState("");
  // const [descriptionError, setdescriptionError] = useState("");
  // const [dateError, setdateError] = useState("");

  const isEditMode = Boolean(id);

  function formatDateForInput(dateStr: string): string {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/transaction/${id}`)
        .then((res) => {
          console.log("Full Response:", res);
          const transaction = res.data;
          console.log("transaction", transaction);
          setAmount(transaction.amount);
          setDescription(transaction.description);
          setDate(formatDateForInput(transaction.date));
          setCategory(transaction.category);
        })
        .catch((err) => console.error("Error loading transaction", err));
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      amount: parseFloat(amount),
      category,
      description,
      date,
    };

    try {
      if (isEditMode) {
        await axios.put(`/api/transaction/${id}`, { ...data, _id: id });
      } else {
        await axios.post("/api/transaction", data);
      }
      router.push("/TransactionList");
    } catch (err) {
      console.error("Failed to save transaction", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-12">
      <Suspense fallback={<div>Loading form...</div>}>
        <AddTransaction />
      </Suspense>
      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">
          {isEditMode ? "Edit Transaction" : "Add New Transaction"}
        </h2>
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
            <label className="block text-sm font-medium">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
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
            <Button type="submit">{isEditMode ? "Update" : "Add"}</Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/TransactionList")}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
