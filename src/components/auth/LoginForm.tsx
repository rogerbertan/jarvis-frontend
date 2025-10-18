"use client";

import { useSearchParams } from "next/navigation";
import { signIn } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const message = searchParams.get("message");

  return (
    <form action={signIn} className="space-y-4">
      {error && (
        <div className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-950/50 dark:text-red-400 border border-red-200 dark:border-red-900 rounded-md">
          {error}
        </div>
      )}
      {message && (
        <div className="p-3 text-sm text-green-600 bg-green-50 dark:bg-green-950/50 dark:text-green-400 border border-green-200 dark:border-green-900 rounded-md">
          {message}
        </div>
      )}
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
        Entrar
      </Button>
    </form>
  );
}
