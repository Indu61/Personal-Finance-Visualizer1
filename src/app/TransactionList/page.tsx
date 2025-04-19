"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NavBar from "../NavBar/page";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import axios from "axios";

interface Transaction {
  _id: string;
  category: string;
  amount: number;
  date: Date;
  description: string;
}

export default function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const router = useRouter();

  const onNew = () => {
    router.push("/AddTransaction");
  };

  const fetchTransactions = async () => {
    try {
      const response = await axios.get("/api/transaction");
      setTransactions(response.data);
    } catch (err) {
      console.error("Error fetching transactions", err);
    }
  };

  const handleEdit = (transaction: Transaction) => {
    
    router.push(`/AddTransaction?id=${transaction._id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/transaction/${id}`);
      
      setTransactions((prev) => prev.filter((txn) => txn._id !== id));
    } catch (err) {
      console.error("Failed to delete transaction", err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      <NavBar />
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">All Transactions</h3>
        <Button
          onClick={onNew}
          variant="secondary"
          className="border border-gray-300 rounded-md shadow-sm py-1 px-3 h-8 flex items-center text-sm"
        >
          <svg
            className="mr-1"
            height="16"
            viewBox="0 0 16 16"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
            style={{ height: "12px", width: "12px" }}
          >
            <path
              d="M9 7h6a1 1 0 0 1 0 2H9v6a1 1 0 0 1-2 0V9H1a1 1 0 1 1 0-2h6V1a1 1 0 1 1 2 0z"
              fillRule="evenodd"
            ></path>
          </svg>
          New
        </Button>
      </div>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableCaption className="py-4 text-sm text-gray-500">
            A list of all your transactions
          </TableCaption>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-[150px] font-medium text-gray-900 border-r">
                Category
              </TableHead>
              <TableHead className="w-[120px] font-medium text-gray-900 border-r">
                Amount
              </TableHead>
              <TableHead className="font-medium text-gray-900 border-r">
                Description
              </TableHead>
              <TableHead className="w-[130px] font-medium text-gray-900 border-r">
                Date
              </TableHead>
              <TableHead className="w-[180px] font-medium text-gray-900">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((txn) => (
              <TableRow key={txn._id} className="border-t hover:bg-gray-50">
                <TableCell className="font-medium border-r">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-block w-2 h-2 rounded-full ${
                        txn.amount < 0 ? "bg-red-500" : "bg-green-500"
                      }`}
                    ></span>
                    {txn.category}
                  </div>
                </TableCell>
                <TableCell
                  className={`border-r font-mono ${
                    txn.amount < 0 ? "text-red-600" : "text-green-600"
                  }`}
                >
                  ₹{Math.abs(txn.amount).toFixed(2)}
                </TableCell>
                <TableCell className="border-r text-gray-600 truncate max-w-[200px]">
                  {txn.description}
                </TableCell>
                <TableCell className="border-r">
                  {new Date(txn.date).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(txn)}
                      className="h-8"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(txn._id)}
                      className="h-8"
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="mt-4 text-sm text-gray-500">
        {transactions.length} {transactions.length === 1 ? "result" : "results"}
      </div>
    </div>
  );
}
