"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const monthLabels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

interface Transaction {
  date: string;
  amount: number;
}

interface MonthlyData {
  month: string;
  amount: number;
}

function groupByMonth(transactions: Transaction[]): MonthlyData[] {
  const monthlyTotals: Record<string, number> = {};

  transactions.forEach((txn) => {
    const date = new Date(txn.date);
    const month = monthLabels[date.getMonth()];

    if (!monthlyTotals[month]) {
      monthlyTotals[month] = 0;
    }
    monthlyTotals[month] += txn.amount;
  });

  return monthLabels.map((month) => ({
    month,
    amount: monthlyTotals[month] || 0,
  }));
}

export default function MonthlyExpenseChart() {
  const [data, setData] = useState<{ month: string; amount: number }[]>([]);

  useEffect(() => {
    axios.get("/api/transaction").then((res) => {
      const grouped = groupByMonth(res.data);
      setData(grouped);
    });
  }, []);

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-center">
        Monthly expenses bar chart
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" axisLine={false} tickLine={false} />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `₹${value}`}
          />
          <Tooltip formatter={(value) => `₹${value}`} />
          <Bar
            dataKey="amount"
            fill="#0f0f0f"
            radius={[4, 4, 0, 0]}
            barSize={30}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
