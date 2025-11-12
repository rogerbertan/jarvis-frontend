import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { IMonthlyStats } from "@/types/transaction";
import { cn } from "@/lib/utils";
import { NumberTicker } from "@/components/ui/number-ticker";

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
            <NumberTicker
              value={stats.count}
              decimalPlaces={0}
              className="text-lg font-semibold font-heading"
            />
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
              R${" "}
              <NumberTicker
                value={stats.total}
                decimalPlaces={2}
                className="text-2xl font-bold font-heading"
              />
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
