import type { LucideIcon } from "lucide-react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  icon?: LucideIcon;
  title?: string;
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({
  icon: Icon,
  title,
  message,
  action,
}: EmptyStateProps) {
  return (
    <div className="py-12">
      <Empty>
        <EmptyHeader>
          {Icon && (
            <EmptyMedia variant="icon">
              <Icon />
            </EmptyMedia>
          )}
          {title && <EmptyTitle>{title}</EmptyTitle>}
          <EmptyDescription>{message}</EmptyDescription>
        </EmptyHeader>
        {action && (
          <EmptyContent>
            <Button onClick={action.onClick} variant="outline">
              {action.label}
            </Button>
          </EmptyContent>
        )}
      </Empty>
    </div>
  );
}
