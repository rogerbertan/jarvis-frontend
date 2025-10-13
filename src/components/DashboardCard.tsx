import { Card } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

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
            {value}
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
