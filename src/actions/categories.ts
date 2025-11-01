"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { ICategory, ICategoryFormData } from "@/types/category";

/**
 * Get all categories for the current user
 * @param type - Optional filter by category type (income or expense)
 */
export async function getCategories(
  type?: "income" | "expense"
): Promise<{ data: ICategory[] | null; error: string | null }> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { data: null, error: "Usuário não autenticado" };
  }

  let query = supabase
    .from("categories")
    .select("*")
    .eq("user_id", user.id)
    .order("name", { ascending: true });

  if (type) {
    query = query.eq("type", type);
  }

  const { data, error } = await query;

  if (error) {
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

/**
 * Create a new category
 */
export async function createCategory(
  formData: ICategoryFormData
): Promise<{ data: ICategory | null; error: string | null }> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { data: null, error: "Usuário não autenticado" };
  }

  const { data, error } = await supabase
    .from("categories")
    .insert({
      user_id: user.id,
      name: formData.name,
      type: formData.type,
      color: formData.color,
      icon: formData.icon,
    })
    .select()
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  revalidatePath("/expenses");
  revalidatePath("/incomes");
  revalidatePath("/analytics");

  return { data, error: null };
}

/**
 * Update an existing category
 */
export async function updateCategory(
  id: number,
  formData: Partial<ICategoryFormData>
): Promise<{ data: ICategory | null; error: string | null }> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { data: null, error: "Usuário não autenticado" };
  }

  const { data, error } = await supabase
    .from("categories")
    .update(formData)
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  revalidatePath("/expenses");
  revalidatePath("/incomes");
  revalidatePath("/analytics");

  return { data, error: null };
}

/**
 * Delete a category
 */
export async function deleteCategory(
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
    .from("categories")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/expenses");
  revalidatePath("/incomes");
  revalidatePath("/analytics");

  return { success: true, error: null };
}

/**
 * Seed default categories for a new user
 */
export async function seedDefaultCategories(): Promise<{
  success: boolean;
  error: string | null;
}> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Usuário não autenticado" };
  }

  const { data: existingCategories } = await supabase
    .from("categories")
    .select("id")
    .eq("user_id", user.id)
    .limit(1);

  if (existingCategories && existingCategories.length > 0) {
    return { success: true, error: null };
  }

  const expenseCategories = [
    { name: "Alimentação", icon: "🍔", color: "#ef4444" },
    { name: "Transporte", icon: "🚗", color: "#f97316" },
    { name: "Lazer", icon: "🎮", color: "#8b5cf6" },
    { name: "Saúde", icon: "⚕️", color: "#10b981" },
    { name: "Educação", icon: "📚", color: "#3b82f6" },
    { name: "Compras", icon: "🛍️", color: "#ec4899" },
    { name: "Contas", icon: "💡", color: "#eab308" },
    { name: "Outros", icon: "📦", color: "#6b7280" },
  ];

  const incomeCategories = [
    { name: "Salário", icon: "💼", color: "#10b981" },
    { name: "Freelance", icon: "💻", color: "#3b82f6" },
    { name: "Investimentos", icon: "📈", color: "#8b5cf6" },
    { name: "Aluguel", icon: "🏠", color: "#f59e0b" },
    { name: "Vendas", icon: "💰", color: "#10b981" },
    { name: "Bônus", icon: "🎁", color: "#ec4899" },
    { name: "Presentes", icon: "🎉", color: "#f97316" },
    { name: "Outros", icon: "📦", color: "#6b7280" },
  ];

  const categoriesToInsert = [
    ...expenseCategories.map((cat) => ({
      user_id: user.id,
      name: cat.name,
      type: "expense" as const,
      icon: cat.icon,
      color: cat.color,
    })),
    ...incomeCategories.map((cat) => ({
      user_id: user.id,
      name: cat.name,
      type: "income" as const,
      icon: cat.icon,
      color: cat.color,
    })),
  ];

  const { error } = await supabase
    .from("categories")
    .insert(categoriesToInsert);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, error: null };
}
