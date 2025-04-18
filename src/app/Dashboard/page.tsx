"use client";

import { useEffect, useState } from "react";
import NavBar from "../NavBar/page";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import axios from "axios";
import MonthlyExpenseChart from "../MonthlyExpenseChart/page";
import CategoryPieChart from "../PieChart/page";
import RecentTransactions from "../RecentTransactions/page";
import BudgetComaparison from "../BudgetComparison/page";

interface Transaction {
  _id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
}

export default function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get<Transaction[]>("/api/transaction")
      .then((res) => setTransactions(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Calculate total expenses
  const totalExpenses = transactions.reduce((sum, tx) => sum + tx.amount, 0);

  if (loading) {
    return <p className="p-6 text-center">Loading...</p>;
  }

  return (
    <div id="app" className="min-h-screen flex pt-12 flex-col">
      <NavBar />

      <main className="p-4 mb-6">
        {" "}
        {/* Added margin-bottom */}
        <Card>
          <CardHeader>
            <CardTitle>Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">₹{totalExpenses.toFixed(2)}</p>
          </CardContent>
        </Card>
      </main>

      <div className="bg-gray-100 p-6 space-y-6">
        {" "}
        {/* Changed padding and added space-y-6 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {" "}
          {/* Increased gap */}
          <div className="bg-white p-6 rounded-lg shadow">
            {" "}
            {/* Increased padding */}
            <CategoryPieChart />
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            {" "}
            <RecentTransactions />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {" "}
          {/* Increased gap */}
          <div className="bg-white p-6 rounded-lg shadow">
            {" "}
            <MonthlyExpenseChart />
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            {" "}
            <BudgetComaparison />
          </div>
        </div>
      </div>
    </div>
  );
}
