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

let isInstalled = false;

const transactionPath = /^\/api\/transactions\/([^/]+)$/;
const disputePath = /^\/api\/transactions\/([^/]+)\/dispute$/;

function wait(delayMs: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, delayMs);
  });
}

async function jsonResponse<T>(
  body: T,
  delayMs: number,
  status = 200
): Promise<Response> {
  await wait(delayMs);

  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

function getUrl(input: RequestInfo | URL): URL {
  if (input instanceof Request) {
    return new URL(input.url);
  }

  return new URL(input.toString(), window.location.origin);
}

function getMethod(input: RequestInfo | URL, init?: RequestInit): string {
  return (init?.method ?? (input instanceof Request ? input.method : "GET"))
    .toUpperCase();
}

async function readDisputeRequest(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<DisputeRequest> {
  const request = input instanceof Request ? input.clone() : new Request(input, init);

  return request.json().catch(() => ({ reason: "" })) as Promise<DisputeRequest>;
}

async function handleMockedApiRoute(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response | null> {
  const url = getUrl(input);
  const method = getMethod(input, init);

  if (method === "GET" && url.pathname === "/api/transactions") {
    return jsonResponse<TransactionsResponse>(
      { transactions: getTransactions() },
      mockDelays.transactions
    );
  }

  const transactionMatch = url.pathname.match(transactionPath);
  if (method === "GET" && transactionMatch) {
    const transaction = findTransaction(decodeURIComponent(transactionMatch[1]));

    if (!transaction) {
      return jsonResponse(transactionNotFound, mockDelays.transaction, 404);
    }

    return jsonResponse(transaction, mockDelays.transaction);
  }

  const disputeMatch = url.pathname.match(disputePath);
  if (method === "POST" && disputeMatch) {
    const transaction = findTransaction(decodeURIComponent(disputeMatch[1]));

    if (!transaction) {
      return jsonResponse(transactionNotFound, mockDelays.dispute, 404);
    }

    const body = await readDisputeRequest(input, init);

    if (!body.reason.trim()) {
      return jsonResponse(disputeReasonRequired, mockDelays.dispute, 400);
    }

    return jsonResponse(disputeResponse, mockDelays.dispute);
  }

  return null;
}

export function installFetchFallback(): void {
  if (isInstalled) {
    return;
  }

  const originalFetch = window.fetch.bind(window);

  window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const mockedResponse = await handleMockedApiRoute(input, init);

    if (mockedResponse) {
      return mockedResponse;
    }

    return originalFetch(input, init);
  };

  isInstalled = true;
}
