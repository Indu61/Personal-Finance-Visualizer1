"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
//import axios from "axios";

// interface Transaction {
//   _id: string;
//   category: string;
//   amount: number;
//   date: Date;
//   description: string;
// }

// const fetchingTransaction = async () => {
//   try {
//     const response = await axios.get("/api/transaction");
//   } catch (error) {}
// };

// export const getMonthlyTransactionSummary = async (req, res) => {
//   try {
//     const startDate = new Date("2024-03-01");
//     const endDate = new Date(); // current date

//     // 1. Aggregate the transaction totals
//     const rawSummary = await Transaction.aggregate([
//       {
//         $match: {
//           date: {
//             $gte: startDate,
//             $lte: endDate,
//           },
//         },
//       },
//       {
//         $group: {
//           _id: {
//             year: { $year: "$date" },
//             month: { $month: "$date" },
//           },
//           totalAmount: { $sum: "$amount" },
//         },
//       },
//       {
//         $project: {
//           _id: 0,
//           year: "$_id.year",
//           month: "$_id.month",
//           totalAmount: 1,
//         },
//       },
//       {
//         $sort: {
//           year: 1,
//           month: 1,
//         },
//       },
//     ]);

//     const filledSummary = [];
//     const current = new Date(startDate);
//     const monthMap = new Map(
//       rawSummary.map((item) => [`${item.year}-${item.month}`, item.totalAmount])
//     );

//     while (current <= endDate) {
//       const year = current.getFullYear();
//       const month = current.getMonth() + 1;

//       const key = `${year}-${month}`;
//       const totalAmount = monthMap.get(key) || 0;

//       filledSummary.push({
//         year,
//         month,
//         totalAmount,
//       });

//       current.setMonth(current.getMonth() + 1);
//     }

//     res.status(200).json(filledSummary);
//   } catch (error) {
//     res.status(500).json({ error: "Server Error", details: error.message });
//   }
// };

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function budgetComaparison() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Multiple</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
