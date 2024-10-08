import { z } from "zod";

export const createQuestionCommandSchema = z.object({
  title: z.string().min(1, "Der Titel darf nicht leer sein"),
});

export type CreateQuestionCommand = z.infer<typeof createQuestionCommandSchema>;
