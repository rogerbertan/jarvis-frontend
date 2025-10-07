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
 * Get category name by ID
 */
export function getCategoryName(categoryId: number): string {
  const category = EXPENSE_CATEGORIES.find((cat) => cat.id === categoryId);
  return category?.name ?? "Desconhecido";
}
