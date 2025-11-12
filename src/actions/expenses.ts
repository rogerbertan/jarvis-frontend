"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { formatDateToString } from "@/lib/utils";
import type { IExpense, IExpenseFormData } from "@/types/expense";

/**
 * Calculate the payment date for an installment based on invoice cycle logic
 *
 * Logic:
 * - If closingDay is null, use simple fallback (always next month)
 * - Invoice cycle: purchases from previous closing day to current closing day
 * - The invoice for that cycle is paid on paymentDay of the NEXT month
 * - Example: closing day 29, payment day 5
 *   - Purchase on 02/11: belongs to Nov invoice, paid 05/12
 *   - Purchase on 29/11: belongs to Dec invoice, paid 05/01
 *
 * @param purchaseDate - The date the purchase was made (YYYY-MM-DD)
 * @param paymentDay - The day of month when invoice is paid (1-31)
 * @param closingDay - The day of month when invoice closes (1-31, nullable)
 * @param installmentNumber - Which installment this is (1-based)
 */
function calculatePaymentDate(
  purchaseDate: string,
  paymentDay: number,
  closingDay: number | null,
  installmentNumber: number
): string {
  const [year, month, day] = purchaseDate.split("-").map(Number);
  const purchase = new Date(year, month - 1, day);
  purchase.setHours(0, 0, 0, 0);

  const purchaseDay = purchase.getDate();
  const purchaseMonth = purchase.getMonth();
  const purchaseYear = purchase.getFullYear();

  if (closingDay === null) {
    const paymentDate = new Date(purchaseYear, purchaseMonth, paymentDay);
    paymentDate.setMonth(paymentDate.getMonth() + installmentNumber);
    paymentDate.setHours(0, 0, 0, 0);
    return formatDateToString(paymentDate);
  }

  let firstPaymentMonth = purchaseMonth + 1;

  if (purchaseDay >= closingDay) {
    firstPaymentMonth = purchaseMonth + 2;
  }

  const paymentDate = new Date(
    purchaseYear,
    firstPaymentMonth + (installmentNumber - 1),
    paymentDay
  );
  paymentDate.setHours(0, 0, 0, 0);

  return formatDateToString(paymentDate);
}

/**
 * Get user's invoice payment and closing days from profile
 * @returns Object with paymentDay and closingDay (both can be null if not configured)
 */
async function getUserInvoiceSettings(
  userId: string
): Promise<{ paymentDay: number; closingDay: number | null }> {
  const supabase = await createClient();

  const { data } = await supabase
    .from("users")
    .select("invoice_payment_day, invoice_closing_day")
    .eq("id", userId)
    .single();

  return {
    paymentDay: data?.invoice_payment_day || 5,
    closingDay: data?.invoice_closing_day || null,
  };
}

/**
 * Get all expenses for the current user
 * @param filters - Optional filters (month, year, category, date range)
 */
export async function getExpenses(filters?: {
  month?: number;
  year?: number;
  category?: string;
  startDate?: string;
  endDate?: string;
}): Promise<{ data: IExpense[] | null; error: string | null }> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { data: null, error: "Usuário não autenticado" };
  }

  let query = supabase
    .from("expenses")
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
 * Get expenses for a specific month
 */
export async function getExpensesByMonth(
  month: number,
  year: number
): Promise<{ data: IExpense[] | null; error: string | null }> {
  return getExpenses({ month, year });
}

/**
 * Get a single expense by ID
 */
export async function getExpenseById(
  id: number
): Promise<{ data: IExpense | null; error: string | null }> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { data: null, error: "Usuário não autenticado" };
  }

  const { data, error } = await supabase
    .from("expenses")
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
 * Create a new expense
 */
export async function createExpense(
  formData: IExpenseFormData
): Promise<{ data: IExpense | null; error: string | null }> {
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

  if (
    formData.payment_method === "credit_card" &&
    formData.installments &&
    formData.installments > 1
  ) {
    return createInstallmentExpenses(formData, user.id);
  }

  const { data, error } = await supabase
    .from("expenses")
    .insert({
      user_id: user.id,
      title: formData.title,
      amount,
      category: formData.category,
      date: formData.date,
      payment_method: formData.payment_method || "debit",
    })
    .select()
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  revalidatePath("/");
  revalidatePath("/expenses");
  revalidatePath("/analytics");

  return { data, error: null };
}

/**
 * Create multiple expense entries for installments
 */
async function createInstallmentExpenses(
  formData: IExpenseFormData,
  userId: string
): Promise<{ data: IExpense | null; error: string | null }> {
  const supabase = await createClient();

  const totalAmount = parseFloat(formData.amount);
  const installments = formData.installments || 1;
  const { paymentDay, closingDay } = await getUserInvoiceSettings(userId);

  const baseAmount = Math.floor((totalAmount / installments) * 100) / 100;
  const remainder =
    Math.round((totalAmount - baseAmount * installments) * 100) / 100;
  const firstInstallmentAmount = baseAmount + remainder;

  const { data: parentData, error: parentError } = await supabase
    .from("expenses")
    .insert({
      user_id: userId,
      title: formData.title,
      amount: firstInstallmentAmount,
      category: formData.category,
      date: calculatePaymentDate(formData.date, paymentDay, closingDay, 1),
      payment_method: "credit_card",
      purchase_date: formData.date,
      installments_total: installments,
      installment_number: 1,
      parent_expense_id: null,
    })
    .select()
    .single();

  if (parentError) {
    return { data: null, error: parentError.message };
  }

  // Create remaining installments
  if (installments > 1) {
    const childInstallments = [];
    for (let i = 2; i <= installments; i++) {
      childInstallments.push({
        user_id: userId,
        title: formData.title,
        amount: baseAmount,
        category: formData.category,
        date: calculatePaymentDate(formData.date, paymentDay, closingDay, i),
        payment_method: "credit_card",
        purchase_date: formData.date,
        installments_total: installments,
        installment_number: i,
        parent_expense_id: parentData.id,
      });
    }

    const { error: childError } = await supabase
      .from("expenses")
      .insert(childInstallments);

    if (childError) {
      return { data: null, error: childError.message };
    }
  }

  revalidatePath("/");
  revalidatePath("/expenses");
  revalidatePath("/analytics");

  return { data: parentData, error: null };
}

/**
 * Update an existing expense (disabled for installments)
 */
export async function updateExpense(
  id: number,
  formData: Partial<IExpenseFormData>
): Promise<{ data: IExpense | null; error: string | null }> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { data: null, error: "Usuário não autenticado" };
  }

  const { data: expense } = await supabase
    .from("expenses")
    .select("*")
    .eq("id", id)
    .single();

  if (expense && (expense.parent_expense_id || expense.installments_total)) {
    return {
      data: null,
      error: "Não é possível editar parcelas. Delete e recrie a despesa.",
    };
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
  if (formData.payment_method)
    updateData.payment_method = formData.payment_method;

  const { data, error } = await supabase
    .from("expenses")
    .update(updateData)
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  revalidatePath("/");
  revalidatePath("/expenses");
  revalidatePath("/analytics");

  return { data, error: null };
}

/**
 * Delete an expense (including all related installments if applicable)
 */
export async function deleteExpense(
  id: number
): Promise<{ success: boolean; error: string | null }> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Usuário não autenticado" };
  }

  const { data: expense, error: getError } = await supabase
    .from("expenses")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (getError) {
    return { success: false, error: getError.message };
  }

  if (expense.parent_expense_id) {
    const parentId = expense.parent_expense_id;

    const { error: deleteChildrenError } = await supabase
      .from("expenses")
      .delete()
      .eq("parent_expense_id", parentId)
      .eq("user_id", user.id);

    if (deleteChildrenError) {
      return { success: false, error: deleteChildrenError.message };
    }

    const { error: deleteParentError } = await supabase
      .from("expenses")
      .delete()
      .eq("id", parentId)
      .eq("user_id", user.id);

    if (deleteParentError) {
      return { success: false, error: deleteParentError.message };
    }
  } else if (expense.installment_number === 1 && expense.installments_total) {
    const { error: deleteChildrenError } = await supabase
      .from("expenses")
      .delete()
      .eq("parent_expense_id", id)
      .eq("user_id", user.id);

    if (deleteChildrenError) {
      return { success: false, error: deleteChildrenError.message };
    }

    const { error: deleteParentError } = await supabase
      .from("expenses")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (deleteParentError) {
      return { success: false, error: deleteParentError.message };
    }
  } else {
    const { error } = await supabase
      .from("expenses")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) {
      return { success: false, error: error.message };
    }
  }

  revalidatePath("/");
  revalidatePath("/expenses");
  revalidatePath("/analytics");

  return { success: true, error: null };
}

/**
 * Get total expenses for current month
 */
export async function getCurrentMonthExpensesTotal(): Promise<{
  total: number;
  error: string | null;
}> {
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  const { data, error } = await getExpensesByMonth(month, year);

  if (error || !data) {
    return { total: 0, error };
  }

  const total = data.reduce((sum, expense) => sum + expense.amount, 0);
  return { total, error: null };
}
