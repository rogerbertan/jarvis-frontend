import { requireAuth } from "@/lib/auth";
import ExpensesPage from "@/components/expenses/ExpensesPage";

export default async function Page() {
  await requireAuth();
  return <ExpensesPage />;
}
