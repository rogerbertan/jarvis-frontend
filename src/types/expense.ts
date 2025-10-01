/**
 * Expense type matching the backend API response
 */
export interface IExpense {
  id: number;
  account_id: number;
  category_id: number;
  amount: number;
  description: string;
  date: string; // ISO 8601 format: "2024-09-23T14:15:00"
  created_at: string; // ISO 8601 format: "2025-09-30T23:07:55.86522"
}

/**
 * Form data for creating a new expense
 */
export interface IExpenseFormData {
  description: string;
  amount: string;
  date: string;
  category_id: number;
}

/**
 * Grouped expenses by month
 */
export interface IGroupedExpenses {
  [monthKey: string]: IExpense[];
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