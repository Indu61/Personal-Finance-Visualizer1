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
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Unknown error occurred" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request, context: { params: { id: string } }) {
  try {
    await connect();
    const { id } = context.params;

    const transaction = await Transaction.findById(id);

    if (!transaction) {
      return NextResponse.json(
        { error: "Transaction not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(transaction, { status: 200 });
  } catch (error) {
    console.error("Error fetching transaction:", error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Unknown error occurred" },
      { status: 500 }
    );
  }
}
