import { z } from "zod";

export const createTagCommandSchema = z.object({
  title: z.string().min(1, "Der Titel darf nicht leer sein"),
  description: z.string().optional(),
  image: z.string().optional(),
  tagGroup: z.string().optional(),
});

export type CreateTagCommand = z.infer<typeof createTagCommandSchema>;
