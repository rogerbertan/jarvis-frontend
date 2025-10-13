import { NavigationPanel } from "@/components/layout/NavigationPanel";
import { Header } from "@/components/layout/Header";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <NavigationPanel />
      <Header />
      <main className="ml-[88px] pt-24 pb-8 px-4 sm:px-6 md:px-8 lg:px-10 max-w-7xl">
        {children}
      </main>
    </div>
  );
}
