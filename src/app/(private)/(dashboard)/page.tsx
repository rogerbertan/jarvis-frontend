import { AppLayout } from "@/components/layout/AppLayout";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { getSession } from "@/actions/auth";
import { getUserProfile } from "@/actions/profile";

export default async function Home() {
  const { user } = await getSession();
  const { data: userProfile } = await getUserProfile();

  const userName =
    user?.user_metadata?.name.split(" ")[0] ||
    user?.user_metadata?.display_name.split(" ")[0] ||
    user?.email?.split("@")[0] ||
    "Usuário";

  return (
    <AppLayout user={userProfile || "Usuario"}>
      <DashboardContent userName={userName} />
    </AppLayout>
  );
}
