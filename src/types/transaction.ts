export type TransactionType = "payment" | "pre_auth" | "refund" | "chargeback";
export type TransactionStatus = "completed" | "pending" | "failed" | "reversed";
export type MerchantCategory = "hotel" | "restaurant" | "transport" | "other";

export interface Merchant {
  name: string;
  category: MerchantCategory;
  logo?: string;
}

export interface Transaction {
  id: string;
  type: TransactionType;
  status: TransactionStatus;
  amount: number;
  currency: string;
  merchant: Merchant;
  createdAt: string;
  settledAt?: string;
  expiresAt?: string;
  notes?: string;
}

export interface DisputeResponse {
  disputeId: string;
  estimatedResolutionDays: number;
}
