import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import Budget from "@/models/budgetModel";

export async function POST(req: Request) {
  try {
    await connect();
    const data = await req.json();
    const newBudget = await Budget.create(data);
    console.log(newBudget);
    return NextResponse.json({ message: "Budget saved!" }, { status: 201 });
  } catch (error: any) {
    if (
      error.name === "MongoServerError" &&
      error.keyPattern?.category &&
      error.keyPattern?.month
    ) {
      return NextResponse.json(
        {
          error: `Budget for ${error.keyValue.category} in ${error.keyValue.month} already exists.`,
        },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connect();
    const budgets = await Budget.find().sort({ createdAt: -1 });
    return NextResponse.json(budgets, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching budgets:", error);
    return NextResponse.json(
      { message: "Failed to fetch budgets" },
      { status: 500 }
    );
  }
}
