"use client";

import { useState, useMemo } from "react";
import { AppLayout } from "@/components/AppLayout";
import { AddExpenseForm } from "@/components/AddExpenseForm";
import { ExpenseList } from "@/components/ExpenseList";
import { MonthSelector } from "@/components/MonthSelector";
import { ExpenseStats } from "@/components/ExpenseStats";
import type {
  IExpense,
  IExpenseFormData,
  IMonthOption,
  IMonthlyStats,
} from "@/types/expense";

export default function ExpensesPage() {
  // State for expenses (mocked data matching backend format)
  const [expenses, setExpenses] = useState<IExpense[]>([
    {
      id: 1,
      account_id: 1,
      category_id: 1,
      amount: 75.25,
      description: "Barbeiro",
      date: "2024-09-23T14:15:00",
      created_at: "2025-09-30T23:07:55.86522",
    },
    {
      id: 2,
      account_id: 1,
      category_id: 2,
      amount: 150.0,
      description: "Le Monde",
      date: "2024-09-15T10:00:00",
      created_at: "2025-09-30T23:08:00.12345",
    },
    {
      id: 3,
      account_id: 1,
      category_id: 1,
      amount: 45.8,
      description: "Omega 3",
      date: "2024-10-05T19:30:00",
      created_at: "2025-09-30T23:08:10.54321",
    },
  ]);

  const [selectedMonth, setSelectedMonth] = useState<string>("all");

  const availableMonths = useMemo((): IMonthOption[] => {
    const monthsSet = new Set<string>();

    expenses.forEach((expense) => {
      const date = new Date(expense.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      monthsSet.add(monthKey);
    });

    return Array.from(monthsSet)
      .sort()
      .reverse()
      .map((monthKey) => {
        const [year, month] = monthKey.split("-");
        const date = new Date(parseInt(year), parseInt(month) - 1);
        return {
          value: monthKey,
          label: date.toLocaleDateString("pt-BR", {
            year: "numeric",
            month: "long",
          }),
        };
      });
  }, [expenses]);

  const filteredExpenses = useMemo((): IExpense[] => {
    if (selectedMonth === "all") {
      return expenses;
    }

    return expenses.filter((expense) => {
      const date = new Date(expense.date);
      const expenseMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      return expenseMonth === selectedMonth;
    });
  }, [expenses, selectedMonth]);

  const monthlyStats = useMemo((): IMonthlyStats => {
    const total = filteredExpenses.reduce(
      (sum, expense) => sum + expense.amount,
      0,
    );

    let monthLabel = "Todos os Meses";
    if (selectedMonth !== "all") {
      const selected = availableMonths.find((m) => m.value === selectedMonth);
      monthLabel = selected ? selected.label : monthLabel;
    }

    return {
      total,
      count: filteredExpenses.length,
      month: monthLabel,
    };
  }, [filteredExpenses, selectedMonth, availableMonths]);

  const handleAddExpense = (formData: IExpenseFormData) => {
    const newExpense: IExpense = {
      id: Math.max(0, ...expenses.map((e) => e.id)) + 1,
      account_id: 1,
      category_id: formData.category_id,
      amount: parseFloat(formData.amount),
      description: formData.description,
      date: new Date(formData.date).toISOString(),
      created_at: new Date().toISOString(),
    };

    setExpenses((prev) => [newExpense, ...prev]);
  };

  const handleDeleteExpense = (id: number) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  return (
    <AppLayout>
      <div className="mb-8"></div>
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left column - Form and Stats */}
        <div className="space-y-6">
          <AddExpenseForm onAddExpense={handleAddExpense} />
          <ExpenseStats stats={monthlyStats} />
        </div>

        {/* Right column - List and Filter */}
        <div className="lg:col-span-2 space-y-6">
          <MonthSelector
            months={availableMonths}
            selectedMonth={selectedMonth}
            onMonthChange={setSelectedMonth}
          />
          <ExpenseList
            expenses={filteredExpenses}
            onDeleteExpense={handleDeleteExpense}
          />
        </div>
      </div>
    </AppLayout>
  );
}
