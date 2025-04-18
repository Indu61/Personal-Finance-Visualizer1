import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import Budget from "@/models/budgetModel";

interface MongoServerError extends Error {
  name: string;
  keyPattern?: Record<string, any>;
  keyValue?: Record<string, any>;
}

export async function POST(req: Request) {
  try {
    await connect();
    const data = await req.json();
    const newBudget = await Budget.create(data);
    console.log(newBudget);
    return NextResponse.json({ message: "Budget saved!" }, { status: 201 });
  } catch (error: unknown) {
    const mongoError = error as MongoServerError;

    if (
      mongoError.name === "MongoServerError" &&
      mongoError.keyPattern?.category &&
      mongoError.keyPattern?.month
    ) {
      return NextResponse.json(
        {
          error: `Budget for ${mongoError.keyValue?.category} in ${mongoError.keyValue?.month} already exists.`,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: mongoError.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connect();
    const budgets = await Budget.find().sort({ createdAt: -1 });
    return NextResponse.json(budgets, { status: 200 });
  } catch (error) {
    console.error("Error fetching budgets:", error);
    return NextResponse.json(
      { message: "Failed to fetch budgets" },
      { status: 500 }
    );
  }
}
