import { z } from "zod";

export const createTagGroupCommandSchema = z.object({
  title: z.string().min(1, "Der Titel darf nicht leer sein"),
  description: z.string().optional(),
  tags: z.array(z.string()),
});

export type CreateTagGroupCommand = z.infer<typeof createTagGroupCommandSchema>;
