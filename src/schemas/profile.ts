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
  invoice_payment_day: z
    .number()
    .min(1, { message: "Dia deve ser entre 1 e 28" })
    .max(28, { message: "Dia deve ser entre 1 e 28" })
    .optional(),
});

export type IProfileSchema = z.infer<typeof profileSchema>;
