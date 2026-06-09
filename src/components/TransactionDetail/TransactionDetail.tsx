import { Transaction } from "../../types/transaction";
import styles from "./TransactionDetail.module.css";

interface TransactionDetailProps {
  transaction: Transaction;
}

export function TransactionDetail({ transaction }: TransactionDetailProps) {
  // TODO: If type === "pre_auth", show banner:
  //       "This is a temporary hold, not a charge. It will be released automatically."
  // TODO: If type === "pre_auth" and expiresAt exists, show:
  //       "Hold expires in X days" (calculate from now to expiresAt).
  // TODO: If type === "refund" and status === "pending" and no settledAt, show:
  //       "Estimated arrival: [date]" using addBusinessDays(createdAt, 5).

  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <div>
          <p className={styles.kicker}>{transaction.merchant.category}</p>
          <h2>{transaction.merchant.name}</h2>
        </div>
        <span className={styles.badge}>{transaction.status}</span>
      </div>

      <dl className={styles.details}>
        <div>
          <dt>Amount</dt>
          <dd>{transaction.amount}</dd>
        </div>
        <div>
          <dt>Type</dt>
          <dd>{transaction.type}</dd>
        </div>
        <div>
          <dt>Created</dt>
          <dd>{transaction.createdAt}</dd>
        </div>
      </dl>
    </article>
  );
}
