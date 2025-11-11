/**
 * Base transaction type for both expenses and incomes
 * Aligned with Supabase schema (expenses/incomes tables)
 */
export interface ITransaction {
  id: number;
  user_id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  created_at: string;
  updated_at: string;
  payment_method: PaymentMethod;
  installments_total?: number;
  installment_number?: number;
  parent_expense_id?: number;
  purchase_date?: string;
}

/**
 * Form data for creating a new transaction
 */
export interface ITransactionFormData {
  title: string;
  amount: string;
  date: string;
  category: string;
  payment_method: PaymentMethod;
  installments?: number;
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
 * Payment method options
 */
export type PaymentMethod = "cash" | "credit_card" | "debit" | "pix";

/**
 * Transaction type enum
 */
export type TransactionType = "expense" | "income";
