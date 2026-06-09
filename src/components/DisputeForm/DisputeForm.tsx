import styles from "./DisputeForm.module.css";

export function DisputeForm({ txId }: { txId: string }) {
  void txId;

  // TODO: Wire useDispute hook here.
  // Render: textarea for reason, submit button.
  // Disable submit while in-flight.
  // On success show: "Dispute submitted. Reference: [disputeId].
  //                   Resolution in approx [N] days."
  // On error show error message specific to the ApiError code.

  return (
    <section className={styles.card} aria-label="Dispute form">
      <h2>Dispute</h2>
      <div className={styles.placeholder}>Dispute form coming soon</div>
    </section>
  );
}
