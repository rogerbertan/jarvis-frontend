import { Spinner } from "@/components/ui/spinner";

interface LoadingSpinnerProps {
  message?: string;
  size?: "sm" | "md" | "lg";
}

export function LoadingSpinner({
  message = "Carregando...",
  size = "md",
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "size-4",
    md: "size-8",
    lg: "size-12",
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <Spinner className={sizeClasses[size]} />
      {message && <p className="text-sm text-muted-foreground">{message}</p>}
    </div>
  );
}
