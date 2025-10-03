import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { IExpenseFormData } from "@/types/expense";

interface IAddExpenseFormProps {
  onAddExpense: (expense: IExpenseFormData) => void;
}

export function AddExpenseForm({ onAddExpense }: IAddExpenseFormProps) {
  const [formData, setFormData] = useState<IExpenseFormData>({
    description: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    category_id: 1,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.description.trim() || !formData.amount || !formData.date) {
      return;
    }

    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      return;
    }

    onAddExpense(formData);

    setFormData({
      description: "",
      amount: "",
      date: new Date().toISOString().split("T")[0],
      category_id: 1,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-heading">Adicionar Nova Despesa</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium font-body">
              Descrição
            </label>
            <Input
              id="description"
              type="text"
              placeholder="ex: Compras no mercado"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="amount" className="text-sm font-medium font-body">
              Valor
            </label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0.01"
              placeholder="0,00"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="date" className="text-sm font-medium font-body">
              Data
            </label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Adicionar Despesa
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}