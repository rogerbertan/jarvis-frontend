import { Card } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";
import { cn, parseNumericValue } from "@/lib/utils";
import { NumberTicker } from "@/components/ui/number-ticker";

interface DashboardCardProps {
  title: string;
  value: string;
  description?: string;
  icon: LucideIcon;
  trend?: "positive" | "negative" | "neutral";
}

export function DashboardCard({
  title,
  value,
  description,
  icon: Icon,
  trend = "neutral",
}: DashboardCardProps) {
  const trendColors = {
    positive: "text-green-500",
    negative: "text-red-500",
    neutral: "text-muted-foreground",
  };

  const { numericValue, prefix, isCurrency } = parseNumericValue(value);

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-lg font-semibold text-foreground mb-2">{title}</p>
          <h3
            className={cn(
              "text-2xl font-bold mb-1",
              trend !== "neutral" && trendColors[trend]
            )}
          >
            {!isNaN(numericValue) && numericValue !== 0 ? (
              <>
                <span className={cn(trend !== "neutral" && trendColors[trend])}>
                  {prefix}
                </span>
                <NumberTicker
                  value={numericValue}
                  decimalPlaces={isCurrency ? 2 : 0}
                  className="text-2xl font-bold"
                />
              </>
            ) : (
              value
            )}
          </h3>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        <div className="ml-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon className="w-5 h-5 text-primary" />
          </div>
        </div>
      </div>
    </Card>
  );
}
