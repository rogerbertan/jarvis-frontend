"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getExpenses, createExpense, deleteExpense } from "@/actions/expenses";
import { getCategories } from "@/actions/categories";
import type { IExpense, IExpenseFormData } from "@/types/expense";
import type { ICategory } from "@/types/category";
import { queryKeys } from "@/types/query";

/**
 * Hook to fetch expenses with TanStack Query
 */
export function useExpensesQuery(initialData?: IExpense[]) {
  return useQuery({
    queryKey: queryKeys.expenses,
    queryFn: async () => {
      const { data, error } = await getExpenses();
      if (error) throw new Error(error);
      return data || [];
    },
    initialData,
  });
}

/**
 * Hook to fetch expense categories with TanStack Query
 */
export function useExpenseCategoriesQuery(initialData?: ICategory[]) {
  return useQuery({
    queryKey: queryKeys.categories("expense"),
    queryFn: async () => {
      const { data, error } = await getCategories("expense");
      if (error) throw new Error(error);
      return data || [];
    },
    initialData,
  });
}

/**
 * Hook to create a new expense with TanStack Query
 */
export function useCreateExpenseMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: IExpenseFormData) => {
      const { data, error } = await createExpense(formData);
      if (error) throw new Error(error);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.expenses });
      queryClient.invalidateQueries({ queryKey: queryKeys.analytics });
    },
  });
}

/**
 * Hook to delete an expense with TanStack Query
 */
export function useDeleteExpenseMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const { error } = await deleteExpense(id);
      if (error) throw new Error(error);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.expenses });
      queryClient.invalidateQueries({ queryKey: queryKeys.analytics });
    },
  });
}
