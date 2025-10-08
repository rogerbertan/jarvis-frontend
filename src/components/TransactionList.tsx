import { Trash2 } from "lucide-react";
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
import type { ITransaction, TransactionType } from "@/types/transaction";

interface ITransactionListProps {
  type: TransactionType;
  transactions: ITransaction[];
  onDeleteTransaction: (id: number) => void;
  getCategoryName: (categoryId: number) => string;
  title: string;
  emptyMessage: string;
}

export function TransactionList({
  type,
  transactions,
  onDeleteTransaction,
  getCategoryName,
  title,
  emptyMessage,
}: ITransactionListProps) {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
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
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium font-body">
                    {formatDate(transaction.date)}
                  </TableCell>
                  <TableCell className="font-body">
                    {transaction.description}
                  </TableCell>
                  <TableCell className="font-body">
                    {getCategoryName(transaction.category_id)}
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
