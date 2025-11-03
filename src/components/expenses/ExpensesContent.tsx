"use client";

import { useState, useMemo, useEffect } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { TransactionForm } from "@/components/transaction/TransactionForm";
import { TransactionList } from "@/components/transaction/TransactionList";
import { MonthSelector } from "@/components/shared/MonthSelector";
import { TransactionStats } from "@/components/transaction/TransactionStats";
import { createExpense, deleteExpense } from "@/actions/expenses";
import { getCategories } from "@/actions/categories";
import type {
  IExpense,
  IExpenseFormData,
  IMonthOption,
  IMonthlyStats,
} from "@/types/expense";
import type { ICategory } from "@/types/category";

interface ExpensesContentProps {
  initialExpenses: IExpense[];
}

export default function ExpensesContent({
  initialExpenses,
}: ExpensesContentProps) {
  const [expenses, setExpenses] = useState<IExpense[]>(initialExpenses);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>("all");

  // TODO: Change to React Query or SWR
  useEffect(() => {
    async function loadCategories() {
      const { data } = await getCategories("expense");
      if (data) {
        setCategories(data);
      }
    }
    loadCategories();
  }, []);

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
      0
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

  const handleAddExpense = async (formData: IExpenseFormData) => {
    const { data, error } = await createExpense(formData);

    if (error) {
      console.error("Erro ao adicionar despesa:", error);
      // TODO: Add toast notification for error
      return;
    }

    if (data) {
      setExpenses((prev) => [data, ...prev]);
    }
  };

  const handleDeleteExpense = async (id: number) => {
    const { success, error } = await deleteExpense(id);

    if (error) {
      console.error("Erro ao deletar despesa:", error);
      // TODO: Add toast notification for error
      return;
    }

    if (success) {
      setExpenses((prev) => prev.filter((expense) => expense.id !== id));
    }
  };

  return (
    <>
      <PageHeader
        title="Despesas"
        description="Gerencie suas despesas e controle seus gastos"
      />
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        {/* Left column - Form and Stats */}
        <div className="space-y-6">
          <TransactionForm
            type="expense"
            categories={categories}
            onAddTransaction={handleAddExpense}
            title="Adicionar Nova Despesa"
            buttonText="Adicionar Despesa"
          />
          <TransactionStats
            stats={monthlyStats}
            title="Resumo Mensal"
            countLabel="Total de Despesas"
            colorVariant="expense"
          />
        </div>

        {/* Right column - List and Filter */}
        <div className="lg:col-span-2 space-y-6">
          <MonthSelector
            months={availableMonths}
            selectedMonth={selectedMonth}
            onMonthChange={setSelectedMonth}
          />
          <TransactionList
            type="expense"
            transactions={filteredExpenses}
            onDeleteTransaction={handleDeleteExpense}
            title="Lista de Despesas"
            emptyMessage="Nenhuma despesa encontrada. Adicione sua primeira despesa acima."
          />
        </div>
      </div>
    </>
  );
}
