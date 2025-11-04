"use client";

import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { IAnalyticsSummary } from "@/types/analytics";
import { TrendingUp, TrendingDown, DollarSign, Wallet } from "lucide-react";
import { NumberTicker } from "@/components/ui/number-ticker";

interface IAnalyticsDashboardProps {
  summary: IAnalyticsSummary;
}

export function AnalyticsDashboard({ summary }: IAnalyticsDashboardProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Incomes */}
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Total de Receitas
              </p>
              <h3 className="text-2xl font-bold text-chart-2">
                R${" "}
                <NumberTicker
                  value={summary.totalIncomes}
                  decimalPlaces={2}
                  className="text-2xl font-bold"
                />
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                <NumberTicker value={summary.incomeCount} decimalPlaces={0} />{" "}
                {summary.incomeCount === 1 ? "transação" : "transações"}
              </p>
            </div>
            <div className="p-2 bg-green-500/10 rounded-full">
              <Wallet className="h-5 w-5 text-chart-2" />
            </div>
          </div>
        </Card>

        {/* Total Expenses */}
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Total de Despesas
              </p>
              <h3 className="text-2xl font-bold text-chart-5">
                R${" "}
                <NumberTicker
                  value={summary.totalExpenses}
                  decimalPlaces={2}
                  className="text-2xl font-bold"
                />
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                <NumberTicker value={summary.expenseCount} decimalPlaces={0} />{" "}
                {summary.expenseCount === 1 ? "transação" : "transações"}
              </p>
            </div>
            <div className="p-2 bg-red-500/10 rounded-full">
              <DollarSign className="h-5 w-5 text-chart-5" />
            </div>
          </div>
        </Card>

        {/* Net Balance */}
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Saldo Líquido
              </p>
              <h3
                className={`text-2xl font-bold ${summary.netBalance >= 0 ? "text-chart-2" : "text-chart-5"}`}
              >
                R${" "}
                <NumberTicker
                  value={summary.netBalance}
                  decimalPlaces={2}
                  className="text-2xl font-bold"
                />
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                Receitas - Despesas
              </p>
            </div>
            <div
              className={`p-2 rounded-full ${summary.netBalance >= 0 ? "bg-green-500/10" : "bg-red-500/10"}`}
            >
              {summary.netBalance >= 0 ? (
                <TrendingUp className="h-5 w-5 text-chart-2" />
              ) : (
                <TrendingDown className="h-5 w-5 text-chart-5" />
              )}
            </div>
          </div>
        </Card>

        {/* Savings Rate */}
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Taxa de Poupança
              </p>
              <h3
                className={`text-2xl font-bold ${summary.savingsRate >= 0 ? "text-chart-2" : "text-chart-5"}`}
              >
                <NumberTicker
                  value={summary.savingsRate}
                  decimalPlaces={1}
                  className="text-2xl font-bold"
                />
                %
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                Do total de receitas
              </p>
            </div>
            <div
              className={`p-2 rounded-full ${summary.savingsRate >= 0 ? "bg-green-500/10" : "bg-red-500/10"}`}
            >
              {summary.savingsRate >= 0 ? (
                <TrendingUp className="h-5 w-5 text-chart-2" />
              ) : (
                <TrendingDown className="h-5 w-5 text-chart-5" />
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* Averages */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Médias</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Receita Média
              </span>
              <span className="font-medium text-chart-2">
                {formatCurrency(summary.averageIncome)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Despesa Média
              </span>
              <span className="font-medium text-chart-5">
                {formatCurrency(summary.averageExpense)}
              </span>
            </div>
          </div>
        </Card>

        {/* Monthly Trends Summary */}
        {summary.monthlyTrends.length > 0 && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Últimos Meses</h3>
            <div className="space-y-3">
              {summary.monthlyTrends.slice(0, 3).map((trend) => (
                <div key={trend.month} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">
                      {trend.monthLabel}
                    </span>
                    <span
                      className={`text-sm font-medium ${trend.netBalance >= 0 ? "text-chart-2" : "text-chart-5"}`}
                    >
                      {formatCurrency(trend.netBalance)}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground flex justify-between">
                    <span>Receitas: {formatCurrency(trend.totalIncomes)}</span>
                    <span>Despesas: {formatCurrency(trend.totalExpenses)}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>

      {/* Category Breakdown */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Expense Categories */}
        {summary.expenseCategories.length > 0 && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Despesas por Categoria
            </h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Categoria</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="text-right">Qtd</TableHead>
                  <TableHead className="text-right">%</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {summary.expenseCategories.map((category, index) => (
                  <TableRow key={`expense-${category.categoryId}-${index}`}>
                    <TableCell className="font-medium">
                      {category.categoryName}
                    </TableCell>
                    <TableCell className="text-right text-chart-5">
                      {formatCurrency(category.total)}
                    </TableCell>
                    <TableCell className="text-right">
                      {category.count}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatPercentage(category.percentage)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        )}

        {/* Income Categories */}
        {summary.incomeCategories.length > 0 && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Receitas por Categoria
            </h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Categoria</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="text-right">Qtd</TableHead>
                  <TableHead className="text-right">%</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {summary.incomeCategories.map((category, index) => (
                  <TableRow key={`income-${category.categoryId}-${index}`}>
                    <TableCell className="font-medium">
                      {category.categoryName}
                    </TableCell>
                    <TableCell className="text-right text-chart-2">
                      {formatCurrency(category.total)}
                    </TableCell>
                    <TableCell className="text-right">
                      {category.count}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatPercentage(category.percentage)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        )}
      </div>

      {/* Monthly Trends Table */}
      {summary.monthlyTrends.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Tendências Mensais</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mês</TableHead>
                <TableHead className="text-right">Receitas</TableHead>
                <TableHead className="text-right">Despesas</TableHead>
                <TableHead className="text-right">Saldo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {summary.monthlyTrends.map((trend) => (
                <TableRow key={trend.month}>
                  <TableCell className="font-medium">
                    {trend.monthLabel}
                  </TableCell>
                  <TableCell className="text-right text-chart-2">
                    {formatCurrency(trend.totalIncomes)}
                  </TableCell>
                  <TableCell className="text-right text-chart-5">
                    {formatCurrency(trend.totalExpenses)}
                  </TableCell>
                  <TableCell
                    className={`text-right font-medium ${trend.netBalance >= 0 ? "text-chart-2" : "text-chart-5"}`}
                  >
                    {formatCurrency(trend.netBalance)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
}
