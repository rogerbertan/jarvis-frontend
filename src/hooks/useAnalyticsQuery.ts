"use client";

import { useQuery } from "@tanstack/react-query";
import { getExpenses } from "@/actions/expenses";
import { getIncomes } from "@/actions/incomes";
import { getCategories } from "@/actions/categories";
import { queryKeys } from "@/types/query";
import type { ICategory } from "@/types/category";
import type { IExpense } from "@/types/expense";
import type { IIncome } from "@/types/income";

/**
 * Hook to fetch all data needed for analytics with TanStack Query
 */
export function useAnalyticsQuery(
  initialExpenses?: IExpense[],
  initialIncomes?: IIncome[]
) {
  const expensesQuery = useQuery({
    queryKey: queryKeys.expenses,
    queryFn: async () => {
      const { data, error } = await getExpenses();
      if (error) throw new Error(error);
      return data || [];
    },
    initialData: initialExpenses,
  });

  const incomesQuery = useQuery({
    queryKey: queryKeys.incomes,
    queryFn: async () => {
      const { data, error } = await getIncomes();
      if (error) throw new Error(error);
      return data || [];
    },
    initialData: initialIncomes,
  });

  return {
    expenses: expensesQuery,
    incomes: incomesQuery,
    isLoading: expensesQuery.isLoading || incomesQuery.isLoading,
    isError: expensesQuery.isError || incomesQuery.isError,
    error: expensesQuery.error || incomesQuery.error,
  };
}

/**
 * Hook to fetch both expense and income categories
 */
export function useAnalyticsCategoriesQuery(
  initialExpenseCategories?: ICategory[],
  initialIncomeCategories?: ICategory[]
) {
  const expenseCategoriesQuery = useQuery({
    queryKey: queryKeys.categories("expense"),
    queryFn: async () => {
      const { data, error } = await getCategories("expense");
      if (error) throw new Error(error);
      return data || [];
    },
    initialData: initialExpenseCategories,
  });

  const incomeCategoriesQuery = useQuery({
    queryKey: queryKeys.categories("income"),
    queryFn: async () => {
      const { data, error } = await getCategories("income");
      if (error) throw new Error(error);
      return data || [];
    },
    initialData: initialIncomeCategories,
  });

  return {
    expenseCategories: expenseCategoriesQuery,
    incomeCategories: incomeCategoriesQuery,
    isLoading:
      expenseCategoriesQuery.isLoading || incomeCategoriesQuery.isLoading,
    isError: expenseCategoriesQuery.isError || incomeCategoriesQuery.isError,
    error: expenseCategoriesQuery.error || incomeCategoriesQuery.error,
  };
}
