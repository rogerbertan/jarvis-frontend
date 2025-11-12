"use client";

import { useState, useMemo } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { AnalyticsFilters } from "@/components/analytics/AnalyticsFilters";
import { AnalyticsDashboard } from "@/components/analytics/AnalyticsDashboard";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { ErrorAlert } from "@/components/shared/ErrorAlert";
import { useAnalyticsQuery } from "@/hooks/useAnalyticsQuery";
import {
  FilterPeriod,
  TransactionTypeFilter,
  type IAnalyticsFilters,
  type IAnalyticsSummary,
  type ICategoryBreakdown,
  type IMonthlyTrend,
} from "@/types/analytics";
import type { IExpense } from "@/types/expense";
import type { IIncome } from "@/types/income";
import type { ICategory } from "@/types/category";

interface AnalyticsContentProps {
  initialExpenses: IExpense[];
  initialIncomes: IIncome[];
  initialExpenseCategories: ICategory[];
  initialIncomeCategories: ICategory[];
}

export default function AnalyticsContent({
  initialExpenses,
  initialIncomes,
  initialExpenseCategories,
  initialIncomeCategories,
}: AnalyticsContentProps) {
  const {
    expenses: {
      data: expenses = [],
      isLoading: isLoadingExpenses,
      isError: isErrorExpenses,
      error: errorExpenses,
      refetch: refetchExpenses,
    },
    incomes: {
      data: incomes = [],
      isLoading: isLoadingIncomes,
      isError: isErrorIncomes,
      error: errorIncomes,
      refetch: refetchIncomes,
    },
  } = useAnalyticsQuery(initialExpenses, initialIncomes);

  const expenseCategories = initialExpenseCategories;
  const incomeCategories = initialIncomeCategories;

  const categories = useMemo(() => {
    return [...expenseCategories, ...incomeCategories];
  }, [expenseCategories, incomeCategories]);

  if (isLoadingExpenses || isLoadingIncomes) {
    return <LoadingSpinner message="Carregando dados de análise..." />;
  }

  if (isErrorExpenses) {
    return (
      <ErrorAlert
        title="Erro ao carregar despesas"
        message={errorExpenses?.message}
        onRetry={() => refetchExpenses()}
      />
    );
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

  const [filters, setFilters] = useState<IAnalyticsFilters>({
    period: FilterPeriod.ALL,
    transactionType: TransactionTypeFilter.ALL,
    categoryIds: [],
  });

  // Calculate date range based on period
  const dateRange = useMemo(() => {
    const now = new Date();
    let startDate: Date | null = null;
    let endDate: Date | null = null;

    switch (filters.period) {
      case FilterPeriod.THIS_MONTH:
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        break;
      case FilterPeriod.LAST_MONTH:
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        endDate = new Date(now.getFullYear(), now.getMonth(), 0);
        break;
      case FilterPeriod.LAST_3_MONTHS:
        startDate = new Date(now.getFullYear(), now.getMonth() - 3, 1);
        endDate = now;
        break;
      case FilterPeriod.LAST_6_MONTHS:
        startDate = new Date(now.getFullYear(), now.getMonth() - 6, 1);
        endDate = now;
        break;
      case FilterPeriod.THIS_YEAR:
        startDate = new Date(now.getFullYear(), 0, 1);
        endDate = now;
        break;
      case FilterPeriod.LAST_YEAR:
        startDate = new Date(now.getFullYear() - 1, 0, 1);
        endDate = new Date(now.getFullYear() - 1, 11, 31);
        break;
      case FilterPeriod.CUSTOM:
        if (filters.customStartDate) {
          startDate = new Date(filters.customStartDate);
        }
        if (filters.customEndDate) {
          endDate = new Date(filters.customEndDate);
        }
        break;
      case FilterPeriod.ALL:
      default:
        startDate = null;
        endDate = null;
    }

    return { startDate, endDate };
  }, [filters.period, filters.customStartDate, filters.customEndDate]);

  // Filter transactions based on filters
  const filteredExpenses = useMemo(() => {
    let result = expenses;

    // Filter by date range
    if (dateRange.startDate || dateRange.endDate) {
      result = result.filter((expense) => {
        const date = new Date(expense.date);
        if (dateRange.startDate && date < dateRange.startDate) return false;
        if (dateRange.endDate && date > dateRange.endDate) return false;
        return true;
      });
    }

    // Filter by category names
    if (filters.categoryIds.length > 0) {
      const categoryNames = filters.categoryIds
        .map((id) => categories.find((cat) => cat.id === id)?.name)
        .filter(Boolean);
      result = result.filter((expense) =>
        categoryNames.includes(expense.category)
      );
    }

    return result;
  }, [expenses, dateRange, filters.categoryIds, categories]);

  const filteredIncomes = useMemo(() => {
    let result = incomes;

    // Filter by date range
    if (dateRange.startDate || dateRange.endDate) {
      result = result.filter((income) => {
        const date = new Date(income.date);
        if (dateRange.startDate && date < dateRange.startDate) return false;
        if (dateRange.endDate && date > dateRange.endDate) return false;
        return true;
      });
    }

    // Filter by category names
    if (filters.categoryIds.length > 0) {
      const categoryNames = filters.categoryIds
        .map((id) => categories.find((cat) => cat.id === id)?.name)
        .filter(Boolean);
      result = result.filter((income) =>
        categoryNames.includes(income.category)
      );
    }

    return result;
  }, [incomes, dateRange, filters.categoryIds, categories]);

  // Calculate analytics summary
  const analyticsSummary = useMemo((): IAnalyticsSummary => {
    const expensesToAnalyze =
      filters.transactionType === TransactionTypeFilter.INCOMES
        ? []
        : filteredExpenses;
    const incomesToAnalyze =
      filters.transactionType === TransactionTypeFilter.EXPENSES
        ? []
        : filteredIncomes;

    const totalExpenses = expensesToAnalyze.reduce(
      (sum, exp) => sum + exp.amount,
      0
    );
    const totalIncomes = incomesToAnalyze.reduce(
      (sum, inc) => sum + inc.amount,
      0
    );
    const netBalance = totalIncomes - totalExpenses;
    const savingsRate =
      totalIncomes > 0 ? (netBalance / totalIncomes) * 100 : 0;

    // Calculate category breakdowns
    const expenseCategoryMap = new Map<string, ICategoryBreakdown>();
    expensesToAnalyze.forEach((expense) => {
      const existing = expenseCategoryMap.get(expense.category);
      const category = categories.find((cat) => cat.name === expense.category);
      if (existing) {
        existing.total += expense.amount;
        existing.count += 1;
      } else {
        expenseCategoryMap.set(expense.category, {
          categoryId: category?.id || 0,
          categoryName: expense.category,
          total: expense.amount,
          count: 1,
          percentage: 0,
        });
      }
    });

    const expenseCategoriesData = Array.from(expenseCategoryMap.values())
      .map((cat) => ({
        ...cat,
        percentage: totalExpenses > 0 ? (cat.total / totalExpenses) * 100 : 0,
      }))
      .sort((a, b) => b.total - a.total);

    const incomeCategoryMap = new Map<string, ICategoryBreakdown>();
    incomesToAnalyze.forEach((income) => {
      const existing = incomeCategoryMap.get(income.category);
      const category = categories.find((cat) => cat.name === income.category);
      if (existing) {
        existing.total += income.amount;
        existing.count += 1;
      } else {
        incomeCategoryMap.set(income.category, {
          categoryId: category?.id || 0,
          categoryName: income.category,
          total: income.amount,
          count: 1,
          percentage: 0,
        });
      }
    });

    const incomeCategoriesData = Array.from(incomeCategoryMap.values())
      .map((cat) => ({
        ...cat,
        percentage: totalIncomes > 0 ? (cat.total / totalIncomes) * 100 : 0,
      }))
      .sort((a, b) => b.total - a.total);

    // Calculate monthly trends
    const monthlyMap = new Map<string, IMonthlyTrend>();

    expensesToAnalyze.forEach((expense) => {
      const date = new Date(expense.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      const existing = monthlyMap.get(monthKey);
      if (existing) {
        existing.totalExpenses += expense.amount;
      } else {
        const monthLabel = date.toLocaleDateString("pt-BR", {
          year: "numeric",
          month: "long",
        });
        monthlyMap.set(monthKey, {
          month: monthKey,
          monthLabel,
          totalExpenses: expense.amount,
          totalIncomes: 0,
          netBalance: 0,
        });
      }
    });

    incomesToAnalyze.forEach((income) => {
      const date = new Date(income.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      const existing = monthlyMap.get(monthKey);
      if (existing) {
        existing.totalIncomes += income.amount;
      } else {
        const monthLabel = date.toLocaleDateString("pt-BR", {
          year: "numeric",
          month: "long",
        });
        monthlyMap.set(monthKey, {
          month: monthKey,
          monthLabel,
          totalExpenses: 0,
          totalIncomes: income.amount,
          netBalance: 0,
        });
      }
    });

    const monthlyTrends = Array.from(monthlyMap.values())
      .map((trend) => ({
        ...trend,
        netBalance: trend.totalIncomes - trend.totalExpenses,
      }))
      .sort((a, b) => b.month.localeCompare(a.month));

    return {
      totalIncomes,
      totalExpenses,
      netBalance,
      averageIncome:
        incomesToAnalyze.length > 0
          ? totalIncomes / incomesToAnalyze.length
          : 0,
      averageExpense:
        expensesToAnalyze.length > 0
          ? totalExpenses / expensesToAnalyze.length
          : 0,
      incomeCount: incomesToAnalyze.length,
      expenseCount: expensesToAnalyze.length,
      savingsRate,
      expenseCategories: expenseCategoriesData,
      incomeCategories: incomeCategoriesData,
      monthlyTrends,
    };
  }, [filteredExpenses, filteredIncomes, filters.transactionType, categories]);

  return (
    <>
      <PageHeader
        title="Análises"
        description="Análise profunda de suas finanças"
      />

      <div className="space-y-6">
        <AnalyticsFilters
          filters={filters}
          onFiltersChange={setFilters}
          expenseCategories={expenseCategories}
          incomeCategories={incomeCategories}
        />

        <AnalyticsDashboard summary={analyticsSummary} />
      </div>
    </>
  );
}
