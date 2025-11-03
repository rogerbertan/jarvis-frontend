"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { useDashboardData } from "@/hooks/useDashboardData";
import { Wallet, TrendingUp, Calendar, ShoppingCart, Tag } from "lucide-react";
import type { IExpense } from "@/types/expense";
import type { IIncome } from "@/types/income";
import { getGreeting } from "@/lib/utils";

interface DashboardContentProps {
  userName: string;
  initialExpenses: IExpense[];
  initialIncomes: IIncome[];
}

export function DashboardContent({
  userName,
  initialExpenses,
  initialIncomes,
}: DashboardContentProps) {
  const expenses = initialExpenses;
  const incomes = initialIncomes;

  const metrics = useDashboardData(expenses, incomes);

  const greeting = getGreeting();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <>
      <PageHeader
        title={`${greeting}, ${userName}`}
        description="Seu assistente pessoal de controle de despesas"
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          title="Saldo Atual"
          value={formatCurrency(metrics.currentBalance)}
          description="Total de receitas menos despesas"
          icon={Wallet}
          trend={
            metrics.currentBalance > 0
              ? "positive"
              : metrics.currentBalance < 0
                ? "negative"
                : "neutral"
          }
        />

        <DashboardCard
          title="Total Investido"
          value={formatCurrency(metrics.totalInvested)}
          description="Em breve"
          icon={TrendingUp}
          trend="neutral"
        />

        <DashboardCard
          title="Balanço do Mês"
          value={formatCurrency(metrics.monthlyBalance)}
          description="Receitas menos despesas do mês atual"
          icon={Calendar}
          trend={
            metrics.monthlyBalance > 0
              ? "positive"
              : metrics.monthlyBalance < 0
                ? "negative"
                : "neutral"
          }
        />

        <DashboardCard
          title="Top Gasto do Mês"
          value={
            metrics.topExpense
              ? formatCurrency(metrics.topExpense.amount)
              : "Nenhum"
          }
          description={metrics.topExpense?.description || "Sem gastos"}
          icon={ShoppingCart}
          trend="neutral"
        />

        <DashboardCard
          title="Top Categoria do Mês"
          value={
            metrics.topCategory
              ? formatCurrency(metrics.topCategory.total)
              : "Nenhuma"
          }
          description={metrics.topCategory?.name || "Sem categorias"}
          icon={Tag}
          trend="neutral"
        />
      </div>
    </>
  );
}
