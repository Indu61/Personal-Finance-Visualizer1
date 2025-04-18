// components/CategoryPieChart.tsx
"use client";

import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import axios from "axios";

const TRANSACTION_CATEGORIES = [
  "Food & Dining",
  "Shopping",
  "Transportation",
  "Housing",
  "Entertainment",
  "Utilities",
  "Healthcare",
  "Education",
  "Savings",
  "Other",
];

// A simple color palette with one color per category
const COLORS = [
  "#4f46e5",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#14b8a6",
  "#f97316",
  "#e11d48",
];

interface Transaction {
  category: string;
  amount: number;
}

interface PieData {
  name: string;
  value: number;
}

export default function CategoryPieChart() {
  const [data, setData] = useState<PieData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<Transaction[]>("/api/transaction")
      .then((res) => {
        const totals: Record<string, number> = {};
        TRANSACTION_CATEGORIES.forEach((cat) => (totals[cat] = 0));

        res.data.forEach((tx) => {
          if (totals.hasOwnProperty(tx.category)) {
            totals[tx.category] += tx.amount;
          } else {
            totals["Other"] += tx.amount;
          }
        });

        const chartData: PieData[] = Object.entries(totals)
          .filter(([, value]) => value > 0)
          .map(([name, value]) => ({ name, value }));

        setData(chartData);
      })
      .catch((err) => {
        console.error("Failed loading transactions:", err);
        setError("Could not load transactions.");
      });
  }, []);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  } else if (data.length === 0) {
    return <p className="text-gray-500">No spending data to display.</p>;
  }

  return (
    <div className="w-full h-80 bg-white">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-center">
          Category-wise pie chart
        </h3>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Tooltip formatter={(val: number) => `₹${val.toFixed(2)}`} />
          <Legend verticalAlign="bottom" height={36} />
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius="40%"
            outerRadius="70%"
            label={({ name, percent }) =>
              `${name}: ${(percent! * 100).toFixed(0)}%`
            }
          >
            {data.map((_, idx) => (
              <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
