import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { getUserProfile } from "@/actions/profile";
import { redirect } from "next/navigation";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { ProfileAvatarCard } from "@/components/profile/ProfileAvatarCard";
import { AccountDetailsCard } from "@/components/profile/AccountDetailsCard";

export default async function ProfilePage() {
  const { success, data } = await getUserProfile();

  if (!success || !data) {
    redirect("/login");
  }

  return (
    <AppLayout user={data}>
      <PageHeader
        title="Perfil"
        description="Gerencie suas informações de perfil"
      />
      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6">
        <div className="space-y-6">
          <ProfileAvatarCard user={data} />
          <AccountDetailsCard user={data} />
        </div>
        <div>
          <ProfileForm user={data} />
        </div>
      </div>
    </AppLayout>
  );
}
