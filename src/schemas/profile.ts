import { z } from "zod";

export const profileSchema = z.object({
  full_name: z
    .string()
    .min(1, { message: "Nome completo é obrigatório" })
    .min(3, { message: "Nome completo deve ter no mínimo 3 caracteres" })
    .max(100, { message: "Nome muito longo" }),
  avatar_url: z
    .string()
    .url({ message: "URL invalida" })
    .optional()
    .or(z.literal("")),
});

export type IProfileSchema = z.infer<typeof profileSchema>;
