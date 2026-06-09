import { useState } from "react";
import { AsyncState } from "../types/async";
import { DisputeResponse } from "../types/transaction";

interface UseDisputeResult {
  submit: (reason: string) => void;
  state: AsyncState<DisputeResponse>;
}

export function useDispute(txId: string): UseDisputeResult {
  const [state] = useState<AsyncState<DisputeResponse>>({ status: "idle" });

  function submit(reason: string) {
    const endpoint = `/api/transactions/${txId}/dispute`;

    void endpoint;
    void reason;

    // TODO: Implement POST /api/transactions/:txId/dispute.
    // Should set loading while in flight.
    // On success, expose disputeId and estimatedResolutionDays.
    // On error, expose the ApiError response.
  }

  return { submit, state };
}
