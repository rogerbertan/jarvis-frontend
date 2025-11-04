import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface ErrorAlertProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorAlert({
  title = "Erro ao carregar dados",
  message = "Ocorreu um erro ao carregar as informações. Por favor, tente novamente.",
  onRetry,
}: ErrorAlertProps) {
  return (
    <div className="py-8">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription className="mt-2 flex flex-col gap-3">
          <span>{message}</span>
          {onRetry && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRetry}
              className="w-fit"
            >
              Tentar novamente
            </Button>
          )}
        </AlertDescription>
      </Alert>
    </div>
  );
}
