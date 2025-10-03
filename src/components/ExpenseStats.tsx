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
        <CardTitle className="font-heading">Resumo Mensal</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground font-body">Período</span>
            <span className="text-lg font-semibold font-body">{stats.month}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground font-body">
              Total de Despesas
            </span>
            <span className="text-lg font-semibold font-heading">{stats.count}</span>
          </div>
          <div className="flex items-center justify-between border-t pt-4">
            <span className="text-sm text-muted-foreground font-body">Valor Total</span>
            <span className="text-2xl font-bold text-primary font-heading">
              {formatAmount(stats.total)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}