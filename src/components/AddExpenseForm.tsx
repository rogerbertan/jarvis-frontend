import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { IExpenseFormData } from "@/types/expense";
import { EXPENSE_CATEGORIES, getCategoryName } from "@/types/category";

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
  const [open, setOpen] = useState(false);

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

          <div className="space-y-2">
            <label className="text-sm font-medium font-body">
              Categoria
            </label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between font-body"
                >
                  {getCategoryName(formData.category_id)}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Buscar categoria..." />
                  <CommandList>
                    <CommandEmpty>Nenhuma categoria encontrada.</CommandEmpty>
                    <CommandGroup>
                      {EXPENSE_CATEGORIES.map((category) => (
                        <CommandItem
                          key={category.id}
                          value={category.name}
                          onSelect={() => {
                            setFormData({ ...formData, category_id: category.id });
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              formData.category_id === category.id
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {category.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <Button type="submit" className="w-full">
            Adicionar Despesa
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}