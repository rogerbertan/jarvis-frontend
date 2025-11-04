import { AppLayout } from "@/components/layout/AppLayout";
import { getUserProfile } from "@/actions/profile";
import AnalyticsContent from "@/components/analytics/AnalyticsContent";
import { getExpenses } from "@/actions/expenses";
import { getIncomes } from "@/actions/incomes";
import { getCategories } from "@/actions/categories";

export default async function AnalyticsPage() {
  const { data: user } = await getUserProfile();
  const { data: expenses } = await getExpenses();
  const { data: incomes } = await getIncomes();
  const { data: expenseCategories } = await getCategories("expense");
  const { data: incomeCategories } = await getCategories("income");

  return (
    <AppLayout user={user || undefined}>
      <AnalyticsContent
        initialExpenses={expenses || []}
        initialIncomes={incomes || []}
        initialExpenseCategories={expenseCategories || []}
        initialIncomeCategories={incomeCategories || []}
      />
    </AppLayout>
  );
}
