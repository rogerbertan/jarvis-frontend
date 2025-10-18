import { requireAuth } from "@/lib/auth";
import AnalyticsPage from "@/components/analytics/AnalyticsPage";

export default async function Page() {
  await requireAuth();
  return <AnalyticsPage />;
}
