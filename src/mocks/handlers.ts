import { rest } from "msw";
import { ApiError } from "../types/async";
import { DisputeResponse, Transaction } from "../types/transaction";

const DAY_MS = 24 * 60 * 60 * 1000;

const toIsoDaysFromNow = (days: number) =>
  new Date(Date.now() + days * DAY_MS).toISOString();

export const transactions: Transaction[] = [
  {
    id: "tx-001",
    type: "pre_auth",
    status: "pending",
    amount: 18000,
    currency: "GBP",
    merchant: { name: "The Ritz London", category: "hotel" },
    createdAt: toIsoDaysFromNow(-2),
    expiresAt: toIsoDaysFromNow(5),
  },
  {
    id: "tx-002",
    type: "payment",
    status: "failed",
    amount: 18000,
    currency: "GBP",
    merchant: { name: "The Ritz London", category: "hotel" },
    createdAt: toIsoDaysFromNow(-2),
  },
  {
    id: "tx-003",
    type: "refund",
    status: "pending",
    amount: 24000,
    currency: "GBP",
    merchant: { name: "The Ritz London", category: "hotel" },
    createdAt: toIsoDaysFromNow(-1),
  },
];

interface TransactionsResponse {
  transactions: Transaction[];
}

interface DisputeRequest {
  reason: string;
}

const notFound: ApiError = {
  code: "TRANSACTION_NOT_FOUND",
  message: "Transaction not found",
};

export const handlers = [
  rest.get("/api/transactions", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.json<TransactionsResponse>({ transactions }));
  }),

  rest.get("/api/transactions/:txId", (req, res, ctx) => {
    const transaction = transactions.find(
      (item) => item.id === req.params.txId
    );

    if (!transaction) {
      return res(ctx.delay(800), ctx.status(404), ctx.json<ApiError>(notFound));
    }

    return res(ctx.delay(800), ctx.json<Transaction>(transaction));
  }),

  rest.post("/api/transactions/:txId/dispute", async (req, res, ctx) => {
    const transaction = transactions.find(
      (item) => item.id === req.params.txId
    );

    if (!transaction) {
      return res(ctx.delay(1000), ctx.status(404), ctx.json<ApiError>(notFound));
    }

    const body = await req.json<DisputeRequest>();

    if (!body.reason.trim()) {
      return res(
        ctx.delay(1000),
        ctx.status(400),
        ctx.json<ApiError>({
          code: "DISPUTE_REASON_REQUIRED",
          message: "Please provide a reason for the dispute",
        })
      );
    }

    return res(
      ctx.delay(1000),
      ctx.json<DisputeResponse>({
        disputeId: "dispute-abc123",
        estimatedResolutionDays: 5,
      })
    );
  }),
];
