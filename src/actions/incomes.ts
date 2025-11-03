"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { IIncome, IIncomeFormData } from "@/types/income";

/**
 * Get all incomes for the current user
 * @param filters - Optional filters (month, year, category, date range)
 */
export async function getIncomes(filters?: {
  month?: number;
  year?: number;
  category?: string;
  startDate?: string;
  endDate?: string;
}): Promise<{ data: IIncome[] | null; error: string | null }> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { data: null, error: "Usuário não autenticado" };
  }

  let query = supabase
    .from("incomes")
    .select("*")
    .eq("user_id", user.id)
    .order("date", { ascending: false });

  if (filters?.category) {
    query = query.eq("category", filters.category);
  }

  if (filters?.startDate && filters?.endDate) {
    query = query.gte("date", filters.startDate).lte("date", filters.endDate);
  } else if (filters?.month !== undefined && filters?.year) {
    const startOfMonth = new Date(
      filters.year,
      filters.month - 1,
      1
    ).toISOString();
    const endOfMonth = new Date(
      filters.year,
      filters.month,
      0,
      23,
      59,
      59
    ).toISOString();
    query = query.gte("date", startOfMonth).lte("date", endOfMonth);
  }

  const { data, error } = await query;

  if (error) {
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

/**
 * Get incomes for a specific month
 */
export async function getIncomesByMonth(
  month: number,
  year: number
): Promise<{ data: IIncome[] | null; error: string | null }> {
  return getIncomes({ month, year });
}

/**
 * Get a single income by ID
 */
export async function getIncomeById(
  id: number
): Promise<{ data: IIncome | null; error: string | null }> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { data: null, error: "Usuário não autenticado" };
  }

  const { data, error } = await supabase
    .from("incomes")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

/**
 * Create a new income
 */
export async function createIncome(
  formData: IIncomeFormData
): Promise<{ data: IIncome | null; error: string | null }> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { data: null, error: "Usuário não autenticado" };
  }

  const amount = parseFloat(formData.amount);
  if (isNaN(amount) || amount <= 0) {
    return { data: null, error: "Valor inválido" };
  }

  const { data, error } = await supabase
    .from("incomes")
    .insert({
      user_id: user.id,
      title: formData.title,
      amount,
      category: formData.category,
      date: formData.date,
    })
    .select()
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  revalidatePath("/");
  revalidatePath("/incomes");
  revalidatePath("/analytics");

  return { data, error: null };
}

/**
 * Update an existing income
 */
export async function updateIncome(
  id: number,
  formData: Partial<IIncomeFormData>
): Promise<{ data: IIncome | null; error: string | null }> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { data: null, error: "Usuário não autenticado" };
  }

  const updateData: Record<string, unknown> = {};

  if (formData.title) updateData.title = formData.title;
  if (formData.amount) {
    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      return { data: null, error: "Valor inválido" };
    }
    updateData.amount = amount;
  }
  if (formData.category) updateData.category = formData.category;
  if (formData.date) updateData.date = formData.date;

  const { data, error } = await supabase
    .from("incomes")
    .update(updateData)
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  revalidatePath("/");
  revalidatePath("/incomes");
  revalidatePath("/analytics");

  return { data, error: null };
}

/**
 * Delete an income
 */
export async function deleteIncome(
  id: number
): Promise<{ success: boolean; error: string | null }> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Usuário não autenticado" };
  }

  const { error } = await supabase
    .from("incomes")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/");
  revalidatePath("/incomes");
  revalidatePath("/analytics");

  return { success: true, error: null };
}

/**
 * Get total incomes for current month
 */
export async function getCurrentMonthIncomesTotal(): Promise<{
  total: number;
  error: string | null;
}> {
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  const { data, error } = await getIncomesByMonth(month, year);

  if (error || !data) {
    return { total: 0, error };
  }

  const total = data.reduce((sum, income) => sum + income.amount, 0);
  return { total, error: null };
}
