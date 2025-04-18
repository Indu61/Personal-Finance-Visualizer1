import { Suspense } from "react";
import AddTransaction from "./AddTransaction";

export default function AddTransactionPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddTransaction />
    </Suspense>
  );
}
