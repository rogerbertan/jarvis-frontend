/**
 * Category type aligned with Supabase schema
 */
export interface ICategory {
  id: number;
  user_id: string;
  name: string;
  type: "income" | "expense";
  color: string;
  icon: string;
  created_at: string;
}

/**
 * Form data for creating a new category
 */
export interface ICategoryFormData {
  name: string;
  type: "income" | "expense";
  color: string;
  icon: string;
}

/**
 * Predefined expense category names in Portuguese
 * These will be used to seed the database for new users
 */
export const EXPENSE_CATEGORY_NAMES = [
  "Alimentação",
  "Transporte",
  "Lazer",
  "Saúde",
  "Educação",
  "Compras",
  "Contas",
  "Outros",
] as const;

/**
 * Predefined income category names in Portuguese
 * These will be used to seed the database for new users
 */
export const INCOME_CATEGORY_NAMES = [
  "Salário",
  "Freelance",
  "Investimentos",
  "Aluguel",
  "Vendas",
  "Bônus",
  "Presentes",
  "Outros",
] as const;
