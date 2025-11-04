import { AppLayout } from "@/components/layout/AppLayout";
import IncomesContent from "@/components/incomes/IncomesContent";
import { getUserProfile } from "@/actions/profile";
import { getIncomes } from "@/actions/incomes";
import { getCategories } from "@/actions/categories";

export default async function IncomesPage() {
  const { data: user } = await getUserProfile();
  const { data: incomes } = await getIncomes();
  const { data: categories } = await getCategories("income");

  return (
    <AppLayout user={user || undefined}>
      <IncomesContent
        initialIncomes={incomes || []}
        initialCategories={categories || []}
      />
    </AppLayout>
  );
}
