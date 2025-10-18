"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  DollarSign,
  Wallet,
  TrendingUp,
  Settings,
  LogOut,
} from "lucide-react";
import type { INavigationItem } from "@/types/navigation";
import { cn } from "@/lib/utils";
import { signOut } from "@/lib/auth";
import { useState } from "react";

export function NavigationPanel() {
  const pathname = usePathname();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await signOut();
    } catch (err) {
      console.error("Erro ao fazer logout:", err);
      setIsLoggingOut(false);
    }
  };

  const navigationItems: INavigationItem[] = [
    {
      id: "home",
      icon: Home,
      href: "/",
    },
    {
      id: "expenses",
      icon: DollarSign,
      href: "/expenses",
    },
    {
      id: "incomes",
      icon: Wallet,
      href: "/incomes",
    },
    {
      id: "analytics",
      icon: TrendingUp,
      href: "/analytics",
    },
  ];

  const footerItems: INavigationItem[] = [
    {
      id: "settings",
      icon: Settings,
      href: "/settings",
    },
    {
      id: "logout",
      icon: LogOut,
    },
  ];

  return (
    <aside
      className="fixed left-0 top-0 h-screen w-[88px] flex flex-col bg-sidebar"
      aria-label="Menu de navegação"
    >
      {/* Header */}
      <div className="relative w-[200px] h-[200px] -ml-14 -mt-10 -mb-10">
        <Image
          src="/jarvis_logo_nobg.svg"
          alt="Jarvis Logo"
          fill
          priority
          className="object-contain"
          style={{
            filter:
              "brightness(0) saturate(100%) invert(18%) sepia(100%) saturate(6500%) hue-rotate(270deg) brightness(100%) contrast(105%)",
          }}
        />
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 flex px-3" aria-label="Menu principal">
        <ul className="w-full space-y-6 flex flex-col items-center">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <li key={item.id} className="relative z-10">
                <Link
                  href={item.href || "#"}
                  className={cn(
                    "w-15 h-15 flex items-center justify-center rounded-full transition-all",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
                      : "bg-gray-700 hover:bg-sidebar-accent group"
                  )}
                  aria-current={isActive ? "page" : undefined}
                  aria-label={item.label}
                >
                  <Icon
                    className={cn(
                      "h-7 w-7",
                      isActive
                        ? "text-sidebar-primary-foreground"
                        : "text-sidebar-foreground group-hover:text-sidebar-primary"
                    )}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="px-3 py-6" aria-label="Menu secundário">
        <ul className="space-y-6 flex flex-col items-center">
          {footerItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <li key={item.id}>
                {item.href ? (
                  <Link
                    href={item.href}
                    className={cn(
                      "w-15 h-15 flex items-center justify-center rounded-full transition-all",
                      isActive
                        ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
                        : "bg-gray-700 hover:bg-sidebar-accent group"
                    )}
                    aria-current={isActive ? "page" : undefined}
                    aria-label={item.label}
                  >
                    <Icon
                      className={cn(
                        "h-7 w-7",
                        isActive
                          ? "text-sidebar-primary-foreground"
                          : "text-sidebar-foreground group-hover:text-sidebar-primary"
                      )}
                    />
                  </Link>
                ) : (
                  <button
                    onClick={item.id === "logout" ? handleLogout : undefined}
                    disabled={isLoggingOut}
                    className={cn(
                      "w-15 h-15 flex items-center justify-center rounded-full transition-all",
                      "bg-gray-700 hover:bg-sidebar-accent text-sidebar-foreground group",
                      isLoggingOut && "opacity-50 cursor-not-allowed"
                    )}
                    aria-label={item.id === "logout" ? "Sair" : item.label}
                  >
                    <Icon className="h-7 w-7 text-sidebar-foreground group-hover:text-sidebar-primary" />
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
