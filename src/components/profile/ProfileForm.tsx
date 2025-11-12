"use client";

import { IProfileSchema, profileSchema } from "@/schemas/profile";
import { IUserProfile } from "@/types/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { User, Image, Calendar1 } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ProfileAvatar } from "./ProfileAvatar";

interface ProfileFormProps {
  user: IUserProfile;
}

export function ProfileForm({ user }: ProfileFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IProfileSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: user.full_name,
      avatar_url: user.avatar_url,
      invoice_payment_day: user.invoice_payment_day,
      invoice_closing_day: user.invoice_closing_day,
    },
  });

  const fullName = watch("full_name");
  const avatarUrl = watch("avatar_url");

  const onSubmit = async (data: IProfileSchema) => {
    setIsLoading(true);
    setError(null);
    try {
      const { updateUserProfile } = await import("@/actions/profile");

      const result = await updateUserProfile(data);

      if (!result.success) {
        setError(result.error || "Erro ao atualizar perfil");
        setIsLoading(false);
        return;
      }

      router.refresh();
    } catch {
      setError("Erro ao atualizar perfil. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informações Pessoais</CardTitle>
        <CardDescription>Atualize suas informações de perfil</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-950/50 dark:text-red-400 border border-red-200 dark:border-red-900 rounded-lg">
              {error}
            </div>
          )}

          <div className="space-y-4 pb-6 border-b">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Image className="w-4 h-4 text-primary" />
              </div>
              <h3 className="text-sm font-semibold">Preview do Avatar</h3>
            </div>
            <div className="flex justify-center py-4">
              <ProfileAvatar
                avatarUrl={avatarUrl}
                fullName={fullName}
                size="lg"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="full_name">Nome Completo</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="full_name"
                type="text"
                placeholder="Roger Bertan"
                className="pl-10"
                {...register("full_name")}
                disabled={isLoading}
              />
            </div>
            {errors.full_name && (
              <p className="text-sm text-red-600 dark:text-red-400">
                {errors.full_name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="avatar_url">URL do Avatar</Label>
            <div className="relative">
              <Image className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="avatar_url"
                type="text"
                placeholder="https://example.com/avatar.jpg"
                className="pl-10"
                {...register("avatar_url")}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="invoice_closing_day">
              Dia de Fechamento da Fatura
            </Label>
            <div className="relative">
              <Calendar1 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="invoice_closing_day"
                type="number"
                placeholder="20"
                className="pl-10"
                {...register("invoice_closing_day", { valueAsNumber: true })}
                disabled={isLoading}
              />
            </div>
            {errors.invoice_closing_day && (
              <p className="text-sm text-red-600 dark:text-red-400">
                {errors.invoice_closing_day.message}
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              Compras feitas no dia de fechamento ou depois vão para a próxima
              fatura.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="invoice_payment_day">
              Dia de Pagamento da Fatura
            </Label>
            <div className="relative">
              <Calendar1 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="invoice_payment_day"
                type="number"
                placeholder="5"
                className="pl-10"
                {...register("invoice_payment_day", { valueAsNumber: true })}
                disabled={isLoading}
              />
            </div>
            {errors.invoice_payment_day && (
              <p className="text-sm text-red-600 dark:text-red-400">
                {errors.invoice_payment_day.message}
              </p>
            )}
          </div>

          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={isLoading} className="px-8">
              {isLoading ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
