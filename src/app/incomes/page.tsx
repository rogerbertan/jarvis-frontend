import { requireAuth } from "@/lib/auth";
import IncomesPage from "@/components/incomes/IncomesPage";

export default async function Page() {
  await requireAuth();
  return <IncomesPage />;
}
