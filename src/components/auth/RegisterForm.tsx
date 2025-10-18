"use client";

import { useSearchParams } from "next/navigation";
import { signUp } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function RegisterForm() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <form action={signUp} className="space-y-4">
      {error && (
        <div className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-950/50 dark:text-red-400 border border-red-200 dark:border-red-900 rounded-md">
          {error}
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="full_name">Nome Completo</Label>
        <Input
          id="full_name"
          name="full_name"
          type="text"
          placeholder="Seu nome"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="seu@email.com"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Senha</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          required
          minLength={6}
        />
      </div>
      <Button type="submit" className="w-full">
        Criar Conta
      </Button>
    </form>
  );
}
