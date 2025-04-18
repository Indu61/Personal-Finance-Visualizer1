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

interface Budget {
  _id: string;
  category: string;
  amount: number;
  month: string;
}

export default function BudgetList() {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const router = useRouter();

  const onNew = () => {
    router.push("/AddBudget");
  };

  const fetchBudgets = async () => {
    try {
      const response = await axios.get("/api/budgets");
      setBudgets(response.data);
    } catch (err) {
      console.error("Error fetching budgets", err);
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      <NavBar />
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Budgets</h3>
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
            A list of your monthly category budgets
          </TableCaption>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-[200px] font-medium text-gray-900 border-r">
                Category
              </TableHead>
              <TableHead className="font-medium text-gray-900 border-r">
                Amount
              </TableHead>
              <TableHead className="font-medium text-gray-900">Month</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {budgets.map((b) => (
              <TableRow key={b._id} className="border-t hover:bg-gray-50">
                <TableCell className="font-medium border-r">
                  {b.category}
                </TableCell>
                <TableCell className="border-r">
                  <span className="font-mono">₹{b.amount.toFixed(2)}</span>
                </TableCell>
                <TableCell>
                  {new Date(b.month).toLocaleDateString("en-US", {
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
