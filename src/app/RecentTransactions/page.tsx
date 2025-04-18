"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Transaction {
  _id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
}

export default function RecentTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    axios
      .get<Transaction[]>("/api/transaction")
      .then((res) => {
        const sorted = res.data.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setTransactions(sorted.slice(0, 5));
      })
      .catch(console.error);
  }, []);

  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-6">Recent Transactions</h3>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableCaption className="py-4 text-sm text-gray-500">
            Your recent transaction history
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
              <TableHead className="w-[130px] font-medium text-gray-900">
                Date
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={tx._id} className="border-t hover:bg-gray-50">
                <TableCell className="font-medium border-r">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-block w-2 h-2 rounded-full ${
                        tx.amount < 0 ? "bg-red-500" : "bg-green-500"
                      }`}
                    ></span>
                    {tx.category}
                  </div>
                </TableCell>
                <TableCell
                  className={`border-r font-mono ${
                    tx.amount < 0 ? "text-red-600" : "text-green-600"
                  }`}
                >
                  ₹{Math.abs(tx.amount).toFixed(2)}
                </TableCell>
                <TableCell className="border-r text-gray-600 truncate max-w-[200px]">
                  {tx.description}
                </TableCell>
                <TableCell>
                  {new Date(tx.date).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
