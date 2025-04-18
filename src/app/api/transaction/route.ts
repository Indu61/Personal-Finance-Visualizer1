import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import Transaction from "@/models/transactionModel";

export async function POST(req: Request) {
  try {
    await connect();
    const data = await req.json();
    const newTransaction = await Transaction.create(data);
    console.log(newTransaction);
    return NextResponse.json(
      { message: "Transaction saved!" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connect();
    const transactions = await Transaction.find().sort({ createdAt: -1 });
    return NextResponse.json(transactions, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json(
      { message: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}
