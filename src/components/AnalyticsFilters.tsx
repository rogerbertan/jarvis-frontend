"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  FilterPeriod,
  TransactionTypeFilter,
  type IAnalyticsFilters,
} from "@/types/analytics";
import type { ICategory } from "@/types/category";

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

  const handleCustomDateChange = (type: "start" | "end", value: string) => {
    onFiltersChange({
      ...filters,
      period: FilterPeriod.CUSTOM,
      [type === "start" ? "customStartDate" : "customEndDate"]: value,
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
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Filtros</h2>
          <Button variant="outline" size="sm" onClick={handleResetFilters}>
            Limpar Filtros
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Period Filter */}
          <div className="flex flex-col gap-2">
            <label htmlFor="period-select" className="text-sm font-medium">
              Período
            </label>
            <Select value={filters.period} onValueChange={handlePeriodChange}>
              <SelectTrigger id="period-select">
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
          <div className="flex flex-col gap-2">
            <label htmlFor="type-select" className="text-sm font-medium">
              Tipo de Transação
            </label>
            <Select
              value={filters.transactionType}
              onValueChange={handleTransactionTypeChange}
            >
              <SelectTrigger id="type-select">
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
              <div className="flex flex-col gap-2">
                <label htmlFor="start-date" className="text-sm font-medium">
                  Data Inicial
                </label>
                <Input
                  id="start-date"
                  type="date"
                  value={filters.customStartDate || ""}
                  onChange={(e) =>
                    handleCustomDateChange("start", e.target.value)
                  }
                />
              </div>

              {/* Custom Date Range - End */}
              <div className="flex flex-col gap-2">
                <label htmlFor="end-date" className="text-sm font-medium">
                  Data Final
                </label>
                <Input
                  id="end-date"
                  type="date"
                  value={filters.customEndDate || ""}
                  onChange={(e) =>
                    handleCustomDateChange("end", e.target.value)
                  }
                />
              </div>
            </>
          )}
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
