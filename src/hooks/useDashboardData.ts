import { useMemo } from "react";
import type { IExpense } from "@/types/expense";
import type { IIncome } from "@/types/income";

export interface DashboardMetrics {
  currentBalance: number;
  totalInvested: number;
  monthlyBalance: number;
  topExpense: {
    description: string;
    amount: number;
  } | null;
  topCategory: {
    name: string;
    total: number;
  } | null;
}

export function useDashboardData(
  expenses: IExpense[],
  incomes: IIncome[]
): DashboardMetrics {
  return useMemo(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const totalIncomes = incomes.reduce(
      (sum, income) => sum + income.amount,
      0
    );
    const totalExpenses = expenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );

    const currentBalance = totalIncomes - totalExpenses;

    const currentMonthExpenses = expenses.filter((expense) => {
      const date = new Date(expense.date);
      return (
        date.getMonth() === currentMonth && date.getFullYear() === currentYear
      );
    });

    const currentMonthIncomes = incomes.filter((income) => {
      const date = new Date(income.date);
      return (
        date.getMonth() === currentMonth && date.getFullYear() === currentYear
      );
    });

    const monthlyIncomeTotal = currentMonthIncomes.reduce(
      (sum, income) => sum + income.amount,
      0
    );
    const monthlyExpenseTotal = currentMonthExpenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );
    const monthlyBalance = monthlyIncomeTotal - monthlyExpenseTotal;

    const topExpense =
      currentMonthExpenses.length > 0
        ? currentMonthExpenses.reduce((max, expense) =>
            expense.amount > max.amount ? expense : max
          )
        : null;

    const categoryTotals = currentMonthExpenses.reduce(
      (acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
        return acc;
      },
      {} as Record<string, number>
    );

    const topCategoryName =
      Object.keys(categoryTotals).length > 0
        ? Object.entries(categoryTotals).reduce((max, [categoryName, total]) =>
            total > max[1] ? [categoryName, total] : max
          )[0]
        : null;

    const topCategory = topCategoryName
      ? {
          name: topCategoryName,
          total: categoryTotals[topCategoryName],
        }
      : null;

    return {
      currentBalance,
      totalInvested: 0,
      monthlyBalance,
      topExpense: topExpense
        ? {
            description: topExpense.title,
            amount: topExpense.amount,
          }
        : null,
      topCategory,
    };
  }, [expenses, incomes]);
}
