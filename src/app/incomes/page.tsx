"use client";

import { useState, useMemo } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { TransactionForm } from "@/components/transaction/TransactionForm";
import { TransactionList } from "@/components/transaction/TransactionList";
import { MonthSelector } from "@/components/shared/MonthSelector";
import { TransactionStats } from "@/components/transaction/TransactionStats";
import type { IIncome, IIncomeFormData } from "@/types/income";
import type { IMonthOption, IMonthlyStats } from "@/types/transaction";
import { INCOME_CATEGORIES, getIncomeCategoryName } from "@/types/category";

export default function IncomesPage() {
  // State for incomes (mocked data matching backend format)
  const [incomes, setIncomes] = useState<IIncome[]>([
    {
      id: 1,
      account_id: 1,
      category_id: 1,
      amount: 5000.0,
      description: "Salário de Setembro",
      date: "2025-09-05T10:00:00",
      created_at: "2025-09-30T23:07:55.86522",
    },
    {
      id: 2,
      account_id: 1,
      category_id: 2,
      amount: 1500.0,
      description: "Projeto Freelance",
      date: "2025-09-15T14:30:00",
      created_at: "2025-09-30T23:08:00.12345",
    },
    {
      id: 3,
      account_id: 1,
      category_id: 1,
      amount: 5000.0,
      description: "Salário de Outubro",
      date: "2025-10-05T10:00:00",
      created_at: "2025-09-30T23:08:10.54321",
    },
  ]);

  const [selectedMonth, setSelectedMonth] = useState<string>("all");

  const availableMonths = useMemo((): IMonthOption[] => {
    const monthsSet = new Set<string>();

    incomes.forEach((income) => {
      const date = new Date(income.date);
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
  }, [incomes]);

  const filteredIncomes = useMemo((): IIncome[] => {
    if (selectedMonth === "all") {
      return incomes;
    }

    return incomes.filter((income) => {
      const date = new Date(income.date);
      const incomeMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      return incomeMonth === selectedMonth;
    });
  }, [incomes, selectedMonth]);

  const monthlyStats = useMemo((): IMonthlyStats => {
    const total = filteredIncomes.reduce(
      (sum, income) => sum + income.amount,
      0
    );

    let monthLabel = "Todos os Meses";
    if (selectedMonth !== "all") {
      const selected = availableMonths.find((m) => m.value === selectedMonth);
      monthLabel = selected ? selected.label : monthLabel;
    }

    return {
      total,
      count: filteredIncomes.length,
      month: monthLabel,
    };
  }, [filteredIncomes, selectedMonth, availableMonths]);

  const handleAddIncome = (formData: IIncomeFormData) => {
    const newIncome: IIncome = {
      id: Math.max(0, ...incomes.map((i) => i.id)) + 1,
      account_id: 1,
      category_id: formData.category_id,
      amount: parseFloat(formData.amount),
      description: formData.description,
      date: new Date(formData.date).toISOString(),
      created_at: new Date().toISOString(),
    };

    setIncomes((prev) => [newIncome, ...prev]);
  };

  const handleDeleteIncome = (id: number) => {
    setIncomes((prev) => prev.filter((income) => income.id !== id));
  };

  return (
    <AppLayout>
      <PageHeader
        title="Receitas"
        description="Gerencie suas receitas e acompanhe suas entradas"
      />
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        {/* Left column - Form and Stats */}
        <div className="space-y-6">
          <TransactionForm
            type="income"
            categories={INCOME_CATEGORIES}
            onAddTransaction={handleAddIncome}
            title="Adicionar Nova Receita"
            buttonText="Adicionar Receita"
          />
          <TransactionStats
            stats={monthlyStats}
            title="Resumo Mensal"
            countLabel="Total de Receitas"
            colorVariant="income"
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
            type="income"
            transactions={filteredIncomes}
            onDeleteTransaction={handleDeleteIncome}
            getCategoryName={getIncomeCategoryName}
            title="Lista de Receitas"
            emptyMessage="Nenhuma receita encontrada. Adicione sua primeira receita acima."
          />
        </div>
      </div>
    </AppLayout>
  );
}
