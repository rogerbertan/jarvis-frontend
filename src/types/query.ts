/**
 * Query key factories for TanStack Query
 * Centralizes query keys to maintain consistency and type safety
 */

export const queryKeys = {
  expenses: ["expenses"] as const,
  expensesByMonth: (month: string) => ["expenses", "month", month] as const,

  incomes: ["incomes"] as const,
  incomesByMonth: (month: string) => ["incomes", "month", month] as const,

  categories: (type: "expense" | "income") => ["categories", type] as const,

  analytics: ["analytics"] as const,
  analyticsByPeriod: (startDate: string, endDate: string) =>
    ["analytics", "period", startDate, endDate] as const,
} as const;

/**
 * Common options for TanStack Query hooks
 */
export interface QueryOptions {
  enabled?: boolean;
  refetchOnMount?: boolean;
  refetchOnWindowFocus?: boolean;
}

/**
 * Mutation options with callbacks
 */
export interface MutationOptions<TData = unknown, TError = Error> {
  onSuccess?: (data: TData) => void;
  onError?: (error: TError) => void;
  onSettled?: () => void;
}