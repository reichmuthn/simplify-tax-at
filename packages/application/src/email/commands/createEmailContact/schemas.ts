import { z } from "zod";

export const createEmailContactCommandSchema = z.object({
  firstName: z.string().min(1, "Der Vorname darf nicht leer sein"),
  lastName: z.string().min(1, "Der Nachname darf nicht leer sein"),
  eMail: z
    .string()
    .min(1, "Die E-Mail-Adresse darf nicht leer sein")
    .email("Die E-Mail-Adresse ist ungültig"),
  listId: z.string().min(1),
});

export type CreateEmailContactCommand = z.infer<
  typeof createEmailContactCommandSchema
>;
