import { Transaction } from "../../types/transaction";
import styles from "./TransactionItem.module.css";

interface TransactionItemProps {
  transaction: Transaction;
  isSelected: boolean;
  onSelect: () => void;
}

export function TransactionItem({
  transaction,
  isSelected,
  onSelect,
}: TransactionItemProps) {
  // TODO: Format amount with formatCurrency util.
  // TODO: Refund amounts should render with a green "+" prefix e.g. "+GBP 240.00".
  // TODO: Failed transaction amounts should render with red strikethrough.
  // TODO: Format createdAt with Intl.DateTimeFormat ("2 Jun 2026" format).

  return (
    <button
      className={`${styles.item} ${isSelected ? styles.selected : ""}`}
      onClick={onSelect}
      type="button"
    >
      <span className={styles.merchant}>{transaction.merchant.name}</span>
      <span className={styles.meta}>
        {transaction.type} · {transaction.status}
      </span>
      <span className={styles.amount}>{transaction.amount}</span>
      <span className={styles.date}>{transaction.createdAt}</span>
    </button>
  );
}
