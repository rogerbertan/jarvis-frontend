"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  FilterPeriod,
  TransactionTypeFilter,
  type IAnalyticsFilters,
} from "@/types/analytics";
import type { ICategory } from "@/types/category";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface IAnalyticsFiltersProps {
  filters: IAnalyticsFilters;
  onFiltersChange: (filters: IAnalyticsFilters) => void;
  expenseCategories: ICategory[];
  incomeCategories: ICategory[];
}

const PERIOD_LABELS: Record<FilterPeriod, string> = {
  [FilterPeriod.THIS_MONTH]: "Este Mês",
  [FilterPeriod.LAST_MONTH]: "Mês Passado",
  [FilterPeriod.LAST_3_MONTHS]: "Últimos 3 Meses",
  [FilterPeriod.LAST_6_MONTHS]: "Últimos 6 Meses",
  [FilterPeriod.THIS_YEAR]: "Este Ano",
  [FilterPeriod.LAST_YEAR]: "Ano Passado",
  [FilterPeriod.CUSTOM]: "Período Personalizado",
  [FilterPeriod.ALL]: "Todos",
};

const TRANSACTION_TYPE_LABELS: Record<TransactionTypeFilter, string> = {
  [TransactionTypeFilter.ALL]: "Todos",
  [TransactionTypeFilter.EXPENSES]: "Despesas",
  [TransactionTypeFilter.INCOMES]: "Receitas",
};

export function AnalyticsFilters({
  filters,
  onFiltersChange,
  expenseCategories,
  incomeCategories,
}: IAnalyticsFiltersProps) {
  const handlePeriodChange = (period: string) => {
    onFiltersChange({
      ...filters,
      period: period as FilterPeriod,
      customStartDate: undefined,
      customEndDate: undefined,
    });
  };

  const handleTransactionTypeChange = (type: string) => {
    onFiltersChange({
      ...filters,
      transactionType: type as TransactionTypeFilter,
      categoryIds: [], // Reset categories when changing transaction type
    });
  };

  const handleCategoryToggle = (categoryId: number) => {
    const isSelected = filters.categoryIds.includes(categoryId);
    const newCategoryIds = isSelected
      ? filters.categoryIds.filter((id) => id !== categoryId)
      : [...filters.categoryIds, categoryId];

    onFiltersChange({
      ...filters,
      categoryIds: newCategoryIds,
    });
  };

  const handleCustomDateChange = (
    type: "start" | "end",
    date: Date | undefined
  ) => {
    if (!date) return;

    const formattedDate = format(date, "yyyy-MM-dd");

    onFiltersChange({
      ...filters,
      period: FilterPeriod.CUSTOM,
      [type === "start" ? "customStartDate" : "customEndDate"]: formattedDate,
    });
  };

  const handleResetFilters = () => {
    onFiltersChange({
      period: FilterPeriod.ALL,
      transactionType: TransactionTypeFilter.ALL,
      categoryIds: [],
    });
  };

  const availableCategories =
    filters.transactionType === TransactionTypeFilter.EXPENSES
      ? expenseCategories
      : filters.transactionType === TransactionTypeFilter.INCOMES
        ? incomeCategories
        : [...expenseCategories, ...incomeCategories];

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Filtros</h2>

        <div className="flex flex-wrap gap-4 items-end">
          {/* Period Filter */}
          <div className="flex flex-col gap-2 w-[240px]">
            <label htmlFor="period-select" className="text-sm font-medium">
              Período
            </label>
            <Select value={filters.period} onValueChange={handlePeriodChange}>
              <SelectTrigger id="period-select" className="w-full">
                <SelectValue placeholder="Selecione o período" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(PERIOD_LABELS).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Transaction Type Filter */}
          <div className="flex flex-col gap-2 w-[240px]">
            <label htmlFor="type-select" className="text-sm font-medium">
              Tipo de Transação
            </label>
            <Select
              value={filters.transactionType}
              onValueChange={handleTransactionTypeChange}
            >
              <SelectTrigger id="type-select" className="w-full">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(TRANSACTION_TYPE_LABELS).map(
                  ([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Custom Date Range - Start */}
          {filters.period === FilterPeriod.CUSTOM && (
            <>
              <div className="flex flex-col gap-2 w-[240px]">
                <label className="text-sm font-medium">Data Inicial</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !filters.customStartDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {filters.customStartDate ? (
                        format(new Date(filters.customStartDate), "PPP", {
                          locale: ptBR,
                        })
                      ) : (
                        <span>Selecione a data</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={
                        filters.customStartDate
                          ? new Date(filters.customStartDate)
                          : undefined
                      }
                      onSelect={(date) => handleCustomDateChange("start", date)}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Custom Date Range - End */}
              <div className="flex flex-col gap-2 w-[240px]">
                <label className="text-sm font-medium">Data Final</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !filters.customEndDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {filters.customEndDate ? (
                        format(new Date(filters.customEndDate), "PPP", {
                          locale: ptBR,
                        })
                      ) : (
                        <span>Selecione a data</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={
                        filters.customEndDate
                          ? new Date(filters.customEndDate)
                          : undefined
                      }
                      onSelect={(date) => handleCustomDateChange("end", date)}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </>
          )}

          {/* Clear Filters Button */}
          <div className="flex items-end w-[240px]">
            <Button
              variant="default"
              className="w-full font-bold"
              onClick={handleResetFilters}
            >
              Limpar Filtros
            </Button>
          </div>
        </div>

        {/* Category Filter */}
        {filters.transactionType !== TransactionTypeFilter.ALL && (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Categorias</label>
            <div className="flex flex-wrap gap-2">
              {availableCategories.map((category) => {
                const isSelected = filters.categoryIds.includes(category.id);
                return (
                  <Button
                    key={category.id}
                    variant={isSelected ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleCategoryToggle(category.id)}
                  >
                    {category.name}
                  </Button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
