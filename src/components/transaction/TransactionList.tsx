import { Trash2, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { ITransaction, TransactionType } from "@/types/transaction";
import { cn } from "@/lib/utils";

interface ITransactionListProps {
  type: TransactionType;
  transactions: ITransaction[];
  onDeleteTransaction: (id: number) => void;
  title: string;
  emptyMessage: string;
}

export function TransactionList({
  type,
  transactions,
  onDeleteTransaction,
  title,
  emptyMessage,
}: ITransactionListProps) {
  const formatDate = (dateString: string): string => {
    const parts = dateString.includes("T")
      ? dateString.split("T")[0].split("-")
      : dateString.split("-");
    const [year, month, day] = parts.map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatAmount = (amount: number): string => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount);
  };

  if (transactions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-heading">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-8 font-body">
            {emptyMessage}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-heading">
          {title} ({transactions.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead className="text-right">Valor</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow
                  key={transaction.id}
                  className={cn(
                    transaction.payment_method === "credit_card" &&
                      transaction.installments_total &&
                      "bg-blue-50/30 dark:bg-blue-950/20"
                  )}
                >
                  <TableCell className="font-medium font-body">
                    {formatDate(transaction.date)}
                  </TableCell>
                  <TableCell className="font-body">
                    <div className="flex items-center gap-2">
                      <span>{transaction.title}</span>
                      {transaction.payment_method === "credit_card" &&
                        transaction.installments_total && (
                          <Badge variant="secondary" className="text-xs">
                            <CreditCard className="w-3 h-3 mr-1" />
                            {transaction.installment_number}/
                            {transaction.installments_total}
                          </Badge>
                        )}
                    </div>
                    {transaction.purchase_date &&
                      transaction.purchase_date !== transaction.date && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Compra: {formatDate(transaction.purchase_date)}
                        </p>
                      )}
                  </TableCell>
                  <TableCell className="font-body">
                    {transaction.category}
                  </TableCell>
                  <TableCell className="text-right font-semibold font-heading">
                    {formatAmount(transaction.amount)}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDeleteTransaction(transaction.id)}
                      aria-label={
                        type === "expense"
                          ? "Excluir despesa"
                          : "Excluir receita"
                      }
                      title={
                        transaction.installments_total
                          ? "Deletar todas as parcelas"
                          : undefined
                      }
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
