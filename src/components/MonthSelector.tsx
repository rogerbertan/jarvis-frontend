import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { IMonthOption } from "@/types/expense";

interface IMonthSelectorProps {
  months: IMonthOption[];
  selectedMonth: string;
  onMonthChange: (month: string) => void;
}

export function MonthSelector({
  months,
  selectedMonth,
  onMonthChange,
}: IMonthSelectorProps) {
  return (
    <div className="space-y-2">
      <label htmlFor="month-select" className="text-sm font-medium font-body">
        Filtrar por Mês
      </label>
      <Select value={selectedMonth} onValueChange={onMonthChange}>
        <SelectTrigger id="month-select" className="w-[240px]">
          <SelectValue placeholder="Selecione um mês" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos os Meses</SelectItem>
          {months.map((month) => (
            <SelectItem key={month.value} value={month.value}>
              {month.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
