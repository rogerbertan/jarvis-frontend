import { NavigationPanel } from "@/components/NavigationPanel";
import { Header } from "@/components/Header";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <NavigationPanel />
      <Header />
      <main className="ml-[88px] pt-16 px-4 sm:px-6 md:px-8 lg:px-10 py-8 max-w-7xl">
        {children}
      </main>
    </div>
  );
}
