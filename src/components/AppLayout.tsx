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
      <div className="ml-[88px] pt-16 container mx-auto py-8 pl-10 max-w-6xl">
        {children}
      </div>
    </div>
  );
}
