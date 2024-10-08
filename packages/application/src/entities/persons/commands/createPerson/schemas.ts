import { z } from "zod";

export const createPersonCommandSchema = z.object({
  title: z.string().min(1, "Der Titel darf nicht leer sein"),
  image: z.string().optional(),
  description: z.string().optional(),
  position: z.string().optional(),
  eMail: z.string().optional(),
  phone: z.string().optional(),
  socialLinks: z.string().optional(),
});

export type CreatePersonCommand = z.infer<typeof createPersonCommandSchema>;
