import type { IExpense } from "./expense";
import type { IIncome } from "./income";

/**
 * Period presets for quick filtering
 */
export enum FilterPeriod {
  THIS_MONTH = "this_month",
  LAST_MONTH = "last_month",
  LAST_3_MONTHS = "last_3_months",
  LAST_6_MONTHS = "last_6_months",
  THIS_YEAR = "this_year",
  LAST_YEAR = "last_year",
  CUSTOM = "custom",
  ALL = "all",
}

/**
 * Transaction type filter
 */
export enum TransactionTypeFilter {
  ALL = "all",
  EXPENSES = "expenses",
  INCOMES = "incomes",
}

/**
 * Analytics filter state
 */
export interface IAnalyticsFilters {
  period: FilterPeriod;
  customStartDate?: string;
  customEndDate?: string;
  transactionType: TransactionTypeFilter;
  categoryIds: number[];
}

/**
 * Category breakdown item
 */
export interface ICategoryBreakdown {
  categoryId: number;
  categoryName: string;
  total: number;
  count: number;
  percentage: number;
}

/**
 * Monthly trend data
 */
export interface IMonthlyTrend {
  month: string; // YYYY-MM format
  monthLabel: string; // Display label
  totalExpenses: number;
  totalIncomes: number;
  netBalance: number;
}

/**
 * Analytics summary data
 */
export interface IAnalyticsSummary {
  totalIncomes: number;
  totalExpenses: number;
  netBalance: number;
  averageIncome: number;
  averageExpense: number;
  incomeCount: number;
  expenseCount: number;
  savingsRate: number; // Percentage
  expenseCategories: ICategoryBreakdown[];
  incomeCategories: ICategoryBreakdown[];
  monthlyTrends: IMonthlyTrend[];
}

/**
 * Combined transaction data for analytics
 */
export interface IAnalyticsData {
  expenses: IExpense[];
  incomes: IIncome[];
}
