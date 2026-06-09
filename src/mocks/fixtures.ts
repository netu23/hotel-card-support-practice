import { ApiError } from "../types/async";
import { DisputeResponse, Transaction } from "../types/transaction";

const DAY_MS = 24 * 60 * 60 * 1000;

export interface TransactionsResponse {
  transactions: Transaction[];
}

export interface DisputeRequest {
  reason: string;
}

export const mockDelays = {
  transactions: 1000,
  transaction: 800,
  dispute: 1000,
} as const;

export const transactionNotFound: ApiError = {
  code: "TRANSACTION_NOT_FOUND",
  message: "Transaction not found",
};

export const disputeReasonRequired: ApiError = {
  code: "DISPUTE_REASON_REQUIRED",
  message: "Please provide a reason for the dispute",
};

export const disputeResponse: DisputeResponse = {
  disputeId: "dispute-abc123",
  estimatedResolutionDays: 5,
};

const toIsoDaysFromNow = (days: number, now: number) =>
  new Date(now + days * DAY_MS).toISOString();

export function getTransactions(now = Date.now()): Transaction[] {
  return [
    {
      id: "tx-001",
      type: "pre_auth",
      status: "pending",
      amount: 18000,
      currency: "GBP",
      merchant: { name: "The Ritz London", category: "hotel" },
      createdAt: toIsoDaysFromNow(-2, now),
      expiresAt: toIsoDaysFromNow(5, now),
    },
    {
      id: "tx-002",
      type: "payment",
      status: "failed",
      amount: 18000,
      currency: "GBP",
      merchant: { name: "The Ritz London", category: "hotel" },
      createdAt: toIsoDaysFromNow(-2, now),
    },
    {
      id: "tx-003",
      type: "refund",
      status: "pending",
      amount: 24000,
      currency: "GBP",
      merchant: { name: "The Ritz London", category: "hotel" },
      createdAt: toIsoDaysFromNow(-1, now),
    },
  ];
}

export function findTransaction(txId: string): Transaction | undefined {
  return getTransactions().find((transaction) => transaction.id === txId);
}
