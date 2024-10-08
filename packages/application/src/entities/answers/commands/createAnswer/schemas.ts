import { z } from "zod";

export const createAnswerCommandSchema = z.object({
  title: z.string().min(1, "Der Titel darf nicht leer sein"),
});

export type CreateAnswerCommand = z.infer<typeof createAnswerCommandSchema>;
