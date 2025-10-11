import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { IMonthlyStats } from "@/types/transaction";
import { cn } from "@/lib/utils";

interface ITransactionStatsProps {
  stats: IMonthlyStats;
  title: string;
  countLabel: string;
  colorVariant?: "income" | "expense";
}

export function TransactionStats({
  stats,
  title,
  countLabel,
  colorVariant = "expense",
}: ITransactionStatsProps) {
  const formatAmount = (amount: number): string => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-heading">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground font-body">
              Período
            </span>
            <span className="text-lg font-semibold font-body">
              {stats.month}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground font-body">
              {countLabel}
            </span>
            <span className="text-lg font-semibold font-heading">
              {stats.count}
            </span>
          </div>
          <div className="flex items-center justify-between border-t pt-4">
            <span className="text-sm text-muted-foreground font-body">
              Valor Total
            </span>
            <span
              className={cn(
                "text-2xl font-bold font-heading",
                colorVariant === "income" ? "text-chart-2" : "text-chart-5"
              )}
            >
              {formatAmount(stats.total)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
