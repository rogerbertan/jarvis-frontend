/**
 * Category type for expense categorization
 */
export interface ICategory {
  id: number;
  name: string;
}

/**
 * Predefined expense categories in Portuguese
 */
export const EXPENSE_CATEGORIES: ICategory[] = [
  { id: 1, name: "Alimentação" },
  { id: 2, name: "Transporte" },
  { id: 3, name: "Lazer" },
  { id: 4, name: "Saúde" },
  { id: 5, name: "Educação" },
  { id: 6, name: "Compras" },
  { id: 7, name: "Contas" },
  { id: 8, name: "Outros" },
];

/**
 * Predefined income categories in Portuguese
 */
export const INCOME_CATEGORIES: ICategory[] = [
  { id: 1, name: "Salário" },
  { id: 2, name: "Freelance" },
  { id: 3, name: "Investimentos" },
  { id: 4, name: "Aluguel" },
  { id: 5, name: "Vendas" },
  { id: 6, name: "Bônus" },
  { id: 7, name: "Presentes" },
  { id: 8, name: "Outros" },
];

/**
 * Get expense category name by ID
 */
export function getExpenseCategoryName(categoryId: number): string {
  const category = EXPENSE_CATEGORIES.find((cat) => cat.id === categoryId);
  return category?.name ?? "Desconhecido";
}

/**
 * Get income category name by ID
 */
export function getIncomeCategoryName(categoryId: number): string {
  const category = INCOME_CATEGORIES.find((cat) => cat.id === categoryId);
  return category?.name ?? "Desconhecido";
}

/**
 * Get category name by ID (legacy, uses expense categories)
 * @deprecated Use getExpenseCategoryName or getIncomeCategoryName instead
 */
export function getCategoryName(categoryId: number): string {
  return getExpenseCategoryName(categoryId);
}
