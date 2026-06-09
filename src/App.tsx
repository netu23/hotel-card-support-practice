import { TransactionList } from "./components/TransactionList/TransactionList";
import styles from "./App.module.css";

function App() {
  return (
    <main className={styles.shell}>
      <section className={styles.header}>
        <p className={styles.kicker}>Support workflow</p>
        <h1>Hotel booking charge review</h1>
        <p>
          Investigate a customer report involving a hotel pre-authorisation hold
          and a pending refund.
        </p>
      </section>

      <TransactionList />
    </main>
  );
}

export default App;
