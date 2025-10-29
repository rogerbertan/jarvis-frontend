import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { getUserProfile } from "@/actions/profile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { redirect } from "next/navigation";
import { ProfileForm } from "@/components/profile/ProfileForm";

export default async function ProfilePage() {
  const { success, data } = await getUserProfile();

  if (!success || !data) {
    redirect("/login");
  }

  return (
    <AppLayout>
      <PageHeader
        title="Perfil"
        description="Gerencie suas informações de perfil"
      ></PageHeader>
      <div className="grid gap-6 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>Informações do Perfil</CardTitle>
          </CardHeader>
          <CardContent>
            <ProfileForm user={data} />
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
