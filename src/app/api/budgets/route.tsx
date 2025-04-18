import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import Budget from "@/models/budgetModel";

export async function POST(req: Request) {
  try {
    await connect();
    const data = await req.json();
    await Budget.create(data);
    return NextResponse.json({ message: "Budget saved!" }, { status: 201 });
  } catch (error) {
    if (
      error instanceof Error &&
      "name" in error &&
      error.name === "MongoServerError" &&
      "keyPattern" in error &&
      typeof error.keyPattern === "object" &&
      error.keyPattern &&
      "category" in error.keyPattern &&
      "month" in error.keyPattern &&
      "keyValue" in error
    ) {
      const { category, month } = error.keyValue as {
        category: string;
        month: string;
      };
      return NextResponse.json(
        { error: `Budget for ${category} in ${month} already exists.` },
        { status: 400 }
      );
    }

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { error: "Unknown error occurred" },
      { status: 500 }
    );
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
