"use client";

import { useState, useMemo, useEffect } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { TransactionForm } from "@/components/transaction/TransactionForm";
import { TransactionList } from "@/components/transaction/TransactionList";
import { MonthSelector } from "@/components/shared/MonthSelector";
import { TransactionStats } from "@/components/transaction/TransactionStats";
import { createIncome, deleteIncome } from "@/actions/incomes";
import { getCategories } from "@/actions/categories";
import type { IIncome, IIncomeFormData } from "@/types/income";
import type { IMonthOption, IMonthlyStats } from "@/types/transaction";
import type { ICategory } from "@/types/category";

interface IncomesContentProps {
  initialIncomes: IIncome[];
}

export default function IncomesContent({
  initialIncomes,
}: IncomesContentProps) {
  const [incomes, setIncomes] = useState<IIncome[]>(initialIncomes);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>("all");

  // TODO: Change to React Query or SWR
  useEffect(() => {
    async function loadCategories() {
      const { data } = await getCategories("income");
      if (data) {
        setCategories(data);
      }
    }
    loadCategories();
  }, []);

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

  const handleAddIncome = async (formData: IIncomeFormData) => {
    const { data, error } = await createIncome(formData);

    if (error) {
      console.error("Erro ao adicionar receita:", error);
      // TODO: Add toast notification for error
      return;
    }

    if (data) {
      setIncomes((prev) => [data, ...prev]);
    }
  };

  const handleDeleteIncome = async (id: number) => {
    const { success, error } = await deleteIncome(id);

    if (error) {
      console.error("Erro ao deletar receita:", error);
      // TODO: Add toast notification for error
      return;
    }

    if (success) {
      setIncomes((prev) => prev.filter((income) => income.id !== id));
    }
  };

  return (
    <>
      <PageHeader
        title="Receitas"
        description="Gerencie suas receitas e acompanhe suas entradas"
      />
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        {/* Left column - Form and Stats */}
        <div className="space-y-6">
          <TransactionForm
            type="income"
            categories={categories}
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
            title="Lista de Receitas"
            emptyMessage="Nenhuma receita encontrada. Adicione sua primeira receita acima."
          />
        </div>
      </div>
    </>
  );
}
