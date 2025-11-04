"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getIncomes, createIncome, deleteIncome } from "@/actions/incomes";
import { getCategories } from "@/actions/categories";
import type { IIncome, IIncomeFormData } from "@/types/income";
import type { ICategory } from "@/types/category";
import { queryKeys } from "@/types/query";

/**
 * Hook to fetch incomes with TanStack Query
 */
export function useIncomesQuery(initialData?: IIncome[]) {
  return useQuery({
    queryKey: queryKeys.incomes,
    queryFn: async () => {
      const { data, error } = await getIncomes();
      if (error) throw new Error(error);
      return data || [];
    },
    initialData,
  });
}

/**
 * Hook to fetch income categories with TanStack Query
 */
export function useIncomeCategoriesQuery(initialData?: ICategory[]) {
  return useQuery({
    queryKey: queryKeys.categories("income"),
    queryFn: async () => {
      const { data, error } = await getCategories("income");
      if (error) throw new Error(error);
      return data || [];
    },
    initialData,
  });
}

/**
 * Hook to create a new income with TanStack Query
 */
export function useCreateIncomeMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: IIncomeFormData) => {
      const { data, error } = await createIncome(formData);
      if (error) throw new Error(error);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.incomes });
      queryClient.invalidateQueries({ queryKey: queryKeys.analytics });
    },
  });
}

/**
 * Hook to delete an income with TanStack Query
 */
export function useDeleteIncomeMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const { error } = await deleteIncome(id);
      if (error) throw new Error(error);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.incomes });
      queryClient.invalidateQueries({ queryKey: queryKeys.analytics });
    },
  });
}
