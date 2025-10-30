"use client";

import { useState, useMemo } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { AnalyticsFilters } from "@/components/analytics/AnalyticsFilters";
import { AnalyticsDashboard } from "@/components/analytics/AnalyticsDashboard";
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
import {
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
  getExpenseCategoryName,
  getIncomeCategoryName,
} from "@/types/category";

export default function AnalyticsContent() {
  // Mock data - In production, this would come from API
  const [expenses] = useState<IExpense[]>([
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
    {
      id: 4,
      account_id: 1,
      category_id: 3,
      amount: 200.0,
      description: "Cinema",
      date: "2024-10-12T20:00:00",
      created_at: "2025-09-30T23:09:00.00000",
    },
  ]);

  const [incomes] = useState<IIncome[]>([
    {
      id: 1,
      account_id: 1,
      category_id: 1,
      amount: 5000.0,
      description: "Salário de Setembro",
      date: "2024-09-05T10:00:00",
      created_at: "2025-09-30T23:07:55.86522",
    },
    {
      id: 2,
      account_id: 1,
      category_id: 2,
      amount: 1500.0,
      description: "Projeto Freelance",
      date: "2024-09-15T14:30:00",
      created_at: "2025-09-30T23:08:00.12345",
    },
    {
      id: 3,
      account_id: 1,
      category_id: 1,
      amount: 5000.0,
      description: "Salário de Outubro",
      date: "2024-10-05T10:00:00",
      created_at: "2025-09-30T23:08:10.54321",
    },
  ]);

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

    // Filter by categories
    if (filters.categoryIds.length > 0) {
      result = result.filter((expense) =>
        filters.categoryIds.includes(expense.category_id)
      );
    }

    return result;
  }, [expenses, dateRange, filters.categoryIds]);

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

    // Filter by categories
    if (filters.categoryIds.length > 0) {
      result = result.filter((income) =>
        filters.categoryIds.includes(income.category_id)
      );
    }

    return result;
  }, [incomes, dateRange, filters.categoryIds]);

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
    const expenseCategoryMap = new Map<number, ICategoryBreakdown>();
    expensesToAnalyze.forEach((expense) => {
      const existing = expenseCategoryMap.get(expense.category_id);
      if (existing) {
        existing.total += expense.amount;
        existing.count += 1;
      } else {
        expenseCategoryMap.set(expense.category_id, {
          categoryId: expense.category_id,
          categoryName: getExpenseCategoryName(expense.category_id),
          total: expense.amount,
          count: 1,
          percentage: 0,
        });
      }
    });

    const expenseCategories = Array.from(expenseCategoryMap.values())
      .map((cat) => ({
        ...cat,
        percentage: totalExpenses > 0 ? (cat.total / totalExpenses) * 100 : 0,
      }))
      .sort((a, b) => b.total - a.total);

    const incomeCategoryMap = new Map<number, ICategoryBreakdown>();
    incomesToAnalyze.forEach((income) => {
      const existing = incomeCategoryMap.get(income.category_id);
      if (existing) {
        existing.total += income.amount;
        existing.count += 1;
      } else {
        incomeCategoryMap.set(income.category_id, {
          categoryId: income.category_id,
          categoryName: getIncomeCategoryName(income.category_id),
          total: income.amount,
          count: 1,
          percentage: 0,
        });
      }
    });

    const incomeCategories = Array.from(incomeCategoryMap.values())
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
      expenseCategories,
      incomeCategories,
      monthlyTrends,
    };
  }, [filteredExpenses, filteredIncomes, filters.transactionType]);

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
          expenseCategories={EXPENSE_CATEGORIES}
          incomeCategories={INCOME_CATEGORIES}
        />

        <AnalyticsDashboard summary={analyticsSummary} />
      </div>
    </>
  );
}
