"use client";

import { useState, useMemo } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { TransactionForm } from "@/components/transaction/TransactionForm";
import { TransactionList } from "@/components/transaction/TransactionList";
import { MonthSelector } from "@/components/shared/MonthSelector";
import { TransactionStats } from "@/components/transaction/TransactionStats";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { ErrorAlert } from "@/components/shared/ErrorAlert";
import {
  useIncomesQuery,
  useIncomeCategoriesQuery,
  useCreateIncomeMutation,
  useDeleteIncomeMutation,
} from "@/hooks/useIncomesQuery";
import type { IIncome, IIncomeFormData } from "@/types/income";
import type { IMonthOption, IMonthlyStats } from "@/types/transaction";
import type { ICategory } from "@/types/category";

interface IncomesContentProps {
  initialIncomes: IIncome[];
  initialCategories: ICategory[];
}

export default function IncomesContent({
  initialIncomes,
  initialCategories,
}: IncomesContentProps) {
  const [selectedMonth, setSelectedMonth] = useState<string>("all");

  const {
    data: incomes = [],
    isLoading: isLoadingIncomes,
    isError: isErrorIncomes,
    error: errorIncomes,
    refetch: refetchIncomes,
  } = useIncomesQuery(initialIncomes);

  const {
    data: categories = [],
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
    error: errorCategories,
    refetch: refetchCategories,
  } = useIncomeCategoriesQuery(initialCategories);

  const createIncomeMutation = useCreateIncomeMutation();
  const deleteIncomeMutation = useDeleteIncomeMutation();

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
    try {
      await createIncomeMutation.mutateAsync(formData);
    } catch (error) {
      console.error("Erro ao adicionar receita:", error);
      // TODO: Add toast notification for error
    }
  };

  const handleDeleteIncome = async (id: number) => {
    try {
      await deleteIncomeMutation.mutateAsync(id);
    } catch (error) {
      console.error("Erro ao deletar receita:", error);
      // TODO: Add toast notification for error
    }
  };

  if (isLoadingIncomes || isLoadingCategories) {
    return <LoadingSpinner message="Carregando receitas..." />;
  }

  if (isErrorIncomes) {
    return (
      <ErrorAlert
        title="Erro ao carregar receitas"
        message={errorIncomes?.message}
        onRetry={() => refetchIncomes()}
      />
    );
  }

  if (isErrorCategories) {
    return (
      <ErrorAlert
        title="Erro ao carregar categorias"
        message={errorCategories?.message}
        onRetry={() => refetchCategories()}
      />
    );
  }

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
