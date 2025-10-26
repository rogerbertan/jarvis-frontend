"use client";

import { User, Settings, HelpCircle, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const handleMenuAction = (action: string) => {
    console.log(`${action} clicked`);
    // TODO: Implement actual actions
  };

  const handleLogout = () => {
    // TODO: Implement logout logic
    console.log("Logout clicked");
  };

  return (
    <header className="fixed top-0 left-[88px] right-0 h-18 bg-sidebar/50 backdrop-blur-md border-b border-sidebar-border/10 shadow-sm">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Left: Application Title */}
        <div>
          <h1 className="text-xl font-bold text-foreground mt-2 pl-3.5 font-heading">
            Jarvis - Assistente Financeiro
          </h1>
        </div>

        {/* Right: User Avatar with Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="flex items-center gap-3 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-full"
              aria-label="Menu do usuário"
            >
              <Avatar className="h-10 w-10 cursor-pointer mt-2">
                <AvatarImage src="/avatar.jpeg" alt="User" />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  RB
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => handleMenuAction("profile")}
              className="cursor-pointer"
            >
              <User className="mr-2 h-4 w-4" />
              <span>Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleMenuAction("settings")}
              className="cursor-pointer"
            >
              <Settings className="mr-2 h-4 w-4" />
              <span>Configurações</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleMenuAction("help")}
              className="cursor-pointer"
            >
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>Ajuda</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer text-destructive focus:text-destructive"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
