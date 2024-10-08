import { z } from "zod";

export const createQuestionGroupCommandSchema = z.object({
  title: z.string().min(1, "Der Titel darf nicht leer sein"),
  questions: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      answers: z.array(
        z.object({
          id: z.string(),
          title: z.string(),
        }),
      ),
    }),
  ),
});

export type CreateQuestionGroupCommand = z.infer<
  typeof createQuestionGroupCommandSchema
>;
