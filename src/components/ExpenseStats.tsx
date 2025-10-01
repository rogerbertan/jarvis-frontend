import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { IMonthlyStats } from "@/types/expense";

interface IExpenseStatsProps {
  stats: IMonthlyStats;
}

export function ExpenseStats({ stats }: IExpenseStatsProps) {
  const formatAmount = (amount: number): string => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resumo Mensal</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Período</span>
            <span className="text-lg font-semibold">{stats.month}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Total de Despesas
            </span>
            <span className="text-lg font-semibold">{stats.count}</span>
          </div>
          <div className="flex items-center justify-between border-t pt-4">
            <span className="text-sm text-muted-foreground">Valor Total</span>
            <span className="text-2xl font-bold text-primary">
              {formatAmount(stats.total)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}