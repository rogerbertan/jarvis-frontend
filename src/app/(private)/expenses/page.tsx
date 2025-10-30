import { AppLayout } from "@/components/layout/AppLayout";
import ExpensesContent from "@/components/expenses/ExpensesContent";
import { getUserProfile } from "@/actions/profile";

export default async function ExpensesPage() {
  const { data: user } = await getUserProfile();

  return (
    <AppLayout user={user || undefined}>
      <ExpensesContent />
    </AppLayout>
  );
}
