import { useState, type FormEvent } from "react";
import { NumericFormat } from "react-number-format";
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
import { Calendar } from "@/components/ui/calendar";
import { Check, ChevronsUpDown, CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type {
  ITransactionFormData,
  TransactionType,
} from "@/types/transaction";
import type { ICategory } from "@/types/category";

interface ITransactionFormProps {
  type: TransactionType;
  categories: ICategory[];
  onAddTransaction: (transaction: ITransactionFormData) => void;
  title: string;
  buttonText: string;
}

export function TransactionForm({
  type,
  categories,
  onAddTransaction,
  title,
  buttonText,
}: ITransactionFormProps) {
  const [formData, setFormData] = useState<ITransactionFormData>({
    description: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    category_id: 1,
  });
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.description.trim() || !formData.amount || !formData.date) {
      return;
    }

    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      return;
    }

    onAddTransaction(formData);

    const newDate = new Date();
    setFormData({
      description: "",
      amount: "",
      date: newDate.toISOString().split("T")[0],
      category_id: 1,
    });
    setSelectedDate(newDate);
  };

  const getCategoryName = (categoryId: number): string => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category?.name ?? "Desconhecido";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-heading">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="description"
              className="text-sm font-medium font-body"
            >
              Descrição
            </label>
            <Input
              id="description"
              type="text"
              placeholder={
                type === "expense"
                  ? "ex: Compras no mercado"
                  : "ex: Salário do mês"
              }
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="amount" className="text-sm font-medium font-body">
              Valor
            </label>
            <NumericFormat
              id="amount"
              customInput={Input}
              prefix="R$ "
              thousandSeparator="."
              decimalSeparator=","
              decimalScale={2}
              fixedDecimalScale
              allowNegative={false}
              placeholder="R$ 0,00"
              value={formData.amount}
              onValueChange={(values) => {
                setFormData({ ...formData, amount: values.value });
              }}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium font-body">Data</label>
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-body",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? (
                    format(selectedDate, "PPP", { locale: ptBR })
                  ) : (
                    <span>Selecione uma data</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    if (date) {
                      setSelectedDate(date);
                      setFormData({
                        ...formData,
                        date: date.toISOString().split("T")[0],
                      });
                      setCalendarOpen(false);
                    }
                  }}
                  locale={ptBR}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium font-body">Categoria</label>
            <Popover open={categoryOpen} onOpenChange={setCategoryOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={categoryOpen}
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
                      {categories.map((category) => (
                        <CommandItem
                          key={category.id}
                          value={category.name}
                          onSelect={() => {
                            setFormData({
                              ...formData,
                              category_id: category.id,
                            });
                            setCategoryOpen(false);
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

          <Button type="submit" className="w-full font-bold">
            {buttonText}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
