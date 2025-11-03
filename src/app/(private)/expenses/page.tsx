import { AppLayout } from "@/components/layout/AppLayout";
import ExpensesContent from "@/components/expenses/ExpensesContent";
import { getUserProfile } from "@/actions/profile";
import { getExpenses } from "@/actions/expenses";

export default async function ExpensesPage() {
  const { data: user } = await getUserProfile();

  const { data: expenses } = await getExpenses();

  return (
    <AppLayout user={user || undefined}>
      <ExpensesContent initialExpenses={expenses || []} />
    </AppLayout>
  );
}
