"use client";

import { IProfileSchema, profileSchema } from "@/schemas/profile";
import { IUserProfile } from "@/types/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

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
    formState: { errors },
  } = useForm<IProfileSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: user.full_name,
      avatar_url: user.avatar_url,
    },
  });

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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <div className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-950/50 dark:text-red-400 border border-red-200 dark:border-red-900 rounded-md">
          {error}
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="full_name">Nome</Label>
        <Input
          id="full_name"
          type="text"
          placeholder="Roger Bertan"
          {...register("full_name")}
          disabled={isLoading}
        />
        {errors.full_name && (
          <p className="text-sm text-red-600 dark:text-red-400">
            {errors.full_name.message}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="avatar_url">Avatar URL</Label>
        <Input
          id="avatar_url"
          type="text"
          placeholder="https://example.com/avatar.jpg"
          {...register("avatar_url")}
          disabled={isLoading}
        />
        {errors.avatar_url && (
          <p className="text-sm text-red-600 dark:text-red-400">
            {errors.avatar_url.message}
          </p>
        )}
      </div>
      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Salvando..." : "Salvar Alterações"}
      </Button>
    </form>
  );
}
