import { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { Transaction } from "../../types/transaction";
import { DisputeForm } from "../DisputeForm/DisputeForm";
import { TransactionDetail } from "../TransactionDetail/TransactionDetail";
import { TransactionItem } from "./TransactionItem";
import styles from "./TransactionList.module.css";

interface TransactionsResponse {
  transactions: Transaction[];
}

export function TransactionList() {
  const state = useFetch<TransactionsResponse>("/api/transactions");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  if (state.status === "idle" || state.status === "loading") {
    return <div className={styles.status}>Loading transactions...</div>;
  }

  if (state.status === "error") {
    return <div className={styles.status}>{state.error.message}</div>;
  }

  const transactions = state.data.transactions;
  const selected =
    transactions.find((transaction) => transaction.id === selectedId) ??
    transactions[0];

  // TODO: Group transactions into sections: "Holds", "Payments", "Refunds".
  // Hint: reduce the array into a Record<TransactionType, Transaction[]>.

  return (
    <section className={styles.layout} aria-label="Transactions">
      <div className={styles.listPanel}>
        <div className={styles.panelHeader}>
          <h2>Transactions</h2>
          <span>{transactions.length}</span>
        </div>

        <div className={styles.list}>
          {transactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              isSelected={transaction.id === selected.id}
              onSelect={() => setSelectedId(transaction.id)}
            />
          ))}
        </div>
      </div>

      <div className={styles.detailPanel}>
        <TransactionDetail transaction={selected} />
        <DisputeForm txId={selected.id} />
      </div>
    </section>
  );
}
