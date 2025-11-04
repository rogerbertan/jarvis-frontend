import { AppLayout } from "@/components/layout/AppLayout";
import ExpensesContent from "@/components/expenses/ExpensesContent";
import { getUserProfile } from "@/actions/profile";
import { getExpenses } from "@/actions/expenses";
import { getCategories } from "@/actions/categories";

export default async function ExpensesPage() {
  const { data: user } = await getUserProfile();
  const { data: expenses } = await getExpenses();
  const { data: categories } = await getCategories("expense");

  return (
    <AppLayout user={user || undefined}>
      <ExpensesContent
        initialExpenses={expenses || []}
        initialCategories={categories || []}
      />
    </AppLayout>
  );
}
