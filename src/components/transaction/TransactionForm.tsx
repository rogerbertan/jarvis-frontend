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
  PaymentMethod,
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

const PAYMENT_METHODS: { value: PaymentMethod; label: string }[] = [
  { value: "cash", label: "Dinheiro" },
  { value: "credit_card", label: "Cartão de Crédito" },
  { value: "debit", label: "Débito" },
  { value: "pix", label: "Pix" },
];

export function TransactionForm({
  type,
  categories,
  onAddTransaction,
  title,
  buttonText,
}: ITransactionFormProps) {
  const [formData, setFormData] = useState<ITransactionFormData>({
    title: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    category: categories[0]?.name || "",
    payment_method: "cash",
  });
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [paymentMethodOpen, setPaymentMethodOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.amount ||
      !formData.date ||
      !formData.category ||
      !formData.payment_method
    ) {
      return;
    }

    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      return;
    }

    if (formData.payment_method === "credit_card" && type === "expense") {
      if (!formData.installments || formData.installments < 1) {
        alert("Número de parcelas inválido");
        return;
      }
    }

    onAddTransaction(formData);

    const newDate = new Date();
    setFormData({
      title: "",
      amount: "",
      date: newDate.toISOString().split("T")[0],
      category: categories[0]?.name || "",
      payment_method: "debit",
      installments: 1,
    });
    setSelectedDate(newDate);
  };

  const selectedPaymentMethod = PAYMENT_METHODS.find(
    (pm) => pm.value === formData.payment_method
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-heading">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-sm font-medium font-body">
              Descrição
            </label>
            <Input
              id="title"
              type="text"
              placeholder={
                type === "expense"
                  ? "ex: Compras no mercado"
                  : "ex: Salário do mês"
              }
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
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

          {type === "expense" && (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium font-body">
                Forma de Pagamento
              </label>
              <Popover
                open={paymentMethodOpen}
                onOpenChange={setPaymentMethodOpen}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={paymentMethodOpen}
                    className="w-full justify-between font-body"
                  >
                    {selectedPaymentMethod?.label ||
                      "Selecione um método de pagamento"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Buscar forma de pagamento..." />
                    <CommandList>
                      <CommandEmpty>
                        Nenhuma forma de pagamento encontrada.
                      </CommandEmpty>
                      <CommandGroup>
                        {PAYMENT_METHODS.map((method) => (
                          <CommandItem
                            key={method.value}
                            value={method.value}
                            onSelect={() => {
                              setFormData({
                                ...formData,
                                payment_method: method.value,
                                installments:
                                  method.value === "credit_card"
                                    ? formData.installments
                                    : undefined,
                              });
                              setPaymentMethodOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                formData.payment_method === method.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {method.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          )}

          {type === "expense" && formData.payment_method === "credit_card" && (
            <div className="flex flex-col gap-2">
              <label
                htmlFor="installments"
                className="text-sm font-medium font-body"
              >
                Número de Parcelas
              </label>
              <Input
                id="installments"
                type="number"
                min="1"
                max="24"
                placeholder="1"
                value={formData.installments || 1}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    installments: parseInt(e.target.value) || 1,
                  })
                }
                required
              />
              <p className="text-xs text-muted-foreground">
                A compra será dividida em {formData.installments || 1}x de R${" "}
                {formData.amount
                  ? (
                      parseFloat(formData.amount) / (formData.installments || 1)
                    ).toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  : "0,00"}
              </p>
            </div>
          )}

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
                  {formData.category || "Selecione uma categoria"}
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
                              category: category.name,
                            });
                            setCategoryOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              formData.category === category.name
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
