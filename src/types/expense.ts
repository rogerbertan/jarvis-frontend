import type {
  ITransaction,
  ITransactionFormData,
  IGroupedTransactions,
  IMonthOption,
  IMonthlyStats,
} from "./transaction";

/**
 * Expense type extending the base transaction
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IExpense extends ITransaction {}

/**
 * Form data for creating a new expense
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IExpenseFormData extends ITransactionFormData {}

/**
 * Grouped expenses by month
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IGroupedExpenses extends IGroupedTransactions {}

// Re-export shared types for backward compatibility
export type { IMonthOption, IMonthlyStats };
