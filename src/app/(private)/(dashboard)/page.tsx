import { AppLayout } from "@/components/layout/AppLayout";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { getSession } from "@/actions/auth";

export default async function Home() {
  const { user } = await getSession();

  const userName =
    user?.user_metadata?.name.split(" ")[0] ||
    user?.user_metadata?.display_name.split(" ")[0] ||
    user?.email?.split("@")[0] ||
    "Usuário";

  return (
    <AppLayout>
      <DashboardContent userName={userName} />
    </AppLayout>
  );
}
