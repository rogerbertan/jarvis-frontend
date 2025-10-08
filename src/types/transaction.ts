/**
 * Base transaction type for both expenses and incomes
 */
export interface ITransaction {
  id: number;
  account_id: number;
  category_id: number;
  amount: number;
  description: string;
  date: string; // ISO 8601 format: "2024-09-23T14:15:00"
  created_at: string; // ISO 8601 format: "2025-09-30T23:07:55.86522"
}

/**
 * Form data for creating a new transaction
 */
export interface ITransactionFormData {
  description: string;
  amount: string;
  date: string;
  category_id: number;
}

/**
 * Grouped transactions by month
 */
export interface IGroupedTransactions {
  [monthKey: string]: ITransaction[];
}

/**
 * Month option for the selector
 */
export interface IMonthOption {
  value: string;
  label: string;
}

/**
 * Monthly statistics
 */
export interface IMonthlyStats {
  total: number;
  count: number;
  month: string;
}

/**
 * Transaction type enum
 */
export type TransactionType = "expense" | "income";
