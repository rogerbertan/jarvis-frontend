import { AppLayout } from "@/components/layout/AppLayout";
import IncomesContent from "@/components/incomes/IncomesContent";
import { getUserProfile } from "@/actions/profile";

export default async function IncomesPage() {
  const { data: user } = await getUserProfile();

  return (
    <AppLayout user={user || undefined}>
      <IncomesContent />
    </AppLayout>
  );
}
