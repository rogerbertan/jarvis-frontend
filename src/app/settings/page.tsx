import { requireAuth } from "@/lib/auth";
import SettingsPage from "@/components/settings/SettingsPage";

export default async function Page() {
  await requireAuth();
  return <SettingsPage />;
}
