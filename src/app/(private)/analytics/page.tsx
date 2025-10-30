import { AppLayout } from "@/components/layout/AppLayout";
import { getUserProfile } from "@/actions/profile";
import AnalyticsContent from "@/components/analytics/AnalyticsContent";

export default async function AnalyticsPage() {
  const { data: user } = await getUserProfile();

  return (
    <AppLayout user={user || undefined}>
      <AnalyticsContent />
    </AppLayout>
  );
}
