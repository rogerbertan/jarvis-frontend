import Link from "next/link";
import { FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="size-20 rounded-lg bg-primary/10 flex items-center justify-center">
            <FileQuestion className="size-12 text-primary" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            Página não encontrada
          </h1>
          <p className="text-muted-foreground">
            A página que você está procurando não existe ou foi movida.
          </p>
        </div>

        {/* Action */}
        <div className="pt-2">
          <Button asChild>
            <Link href="/">Ir para o Dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
