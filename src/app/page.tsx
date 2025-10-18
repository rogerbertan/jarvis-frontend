import { requireAuth } from "@/lib/auth";
import HomePage from "@/components/dashboard/HomePage";

export default async function Page() {
  await requireAuth();

  return <HomePage />;
}