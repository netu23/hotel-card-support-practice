import { rest } from "msw";
import { ApiError } from "../types/async";
import { Transaction } from "../types/transaction";
import {
  disputeReasonRequired,
  disputeResponse,
  DisputeRequest,
  findTransaction,
  getTransactions,
  mockDelays,
  transactionNotFound,
  TransactionsResponse,
} from "./fixtures";

export const handlers = [
  rest.get("/api/transactions", (_req, res, ctx) => {
    return res(
      ctx.delay(mockDelays.transactions),
      ctx.json<TransactionsResponse>({ transactions: getTransactions() })
    );
  }),

  rest.get("/api/transactions/:txId", (req, res, ctx) => {
    const transaction = findTransaction(String(req.params.txId));

    if (!transaction) {
      return res(
        ctx.delay(mockDelays.transaction),
        ctx.status(404),
        ctx.json<ApiError>(transactionNotFound)
      );
    }

    return res(ctx.delay(mockDelays.transaction), ctx.json<Transaction>(transaction));
  }),

  rest.post("/api/transactions/:txId/dispute", async (req, res, ctx) => {
    const transaction = findTransaction(String(req.params.txId));

    if (!transaction) {
      return res(
        ctx.delay(mockDelays.dispute),
        ctx.status(404),
        ctx.json<ApiError>(transactionNotFound)
      );
    }

    const body = await req.json<DisputeRequest>();

    if (!body.reason.trim()) {
      return res(
        ctx.delay(mockDelays.dispute),
        ctx.status(400),
        ctx.json<ApiError>(disputeReasonRequired)
      );
    }

    return res(
      ctx.delay(mockDelays.dispute),
      ctx.json(disputeResponse)
    );
  }),
];
