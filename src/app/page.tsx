"use client";

import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { useDashboardData } from "@/hooks/useDashboardData";
import { Wallet, TrendingUp, Calendar, ShoppingCart, Tag } from "lucide-react";
import type { IExpense } from "@/types/expense";
import type { IIncome } from "@/types/income";

export default function Home() {
  const [expenses] = useState<IExpense[]>([
    {
      id: 1,
      account_id: 1,
      category_id: 1,
      amount: 75.25,
      description: "Barbeiro",
      date: "2025-10-23T14:15:00",
      created_at: "2025-09-30T23:07:55.86522",
    },
    {
      id: 2,
      account_id: 1,
      category_id: 2,
      amount: 150.0,
      description: "Le Monde",
      date: "2025-10-15T10:00:00",
      created_at: "2025-09-30T23:08:00.12345",
    },
    {
      id: 3,
      account_id: 1,
      category_id: 1,
      amount: 45.8,
      description: "Omega 3",
      date: "2025-10-05T19:30:00",
      created_at: "2025-09-30T23:08:10.54321",
    },
  ]);

  const [incomes] = useState<IIncome[]>([
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

  const metrics = useDashboardData(expenses, incomes);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <AppLayout>
      <PageHeader
        title="Bem-vindo ao Jarvis"
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
    </AppLayout>
  );
}
