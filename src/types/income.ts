import type {
  ITransaction,
  ITransactionFormData,
  IGroupedTransactions,
} from "./transaction";

/**
 * Income type extending the base transaction
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IIncome extends ITransaction {}

/**
 * Form data for creating a new income
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IIncomeFormData extends ITransactionFormData {}

/**
 * Grouped incomes by month
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IGroupedIncomes extends IGroupedTransactions {}
