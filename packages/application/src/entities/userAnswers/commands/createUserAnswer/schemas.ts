import { z } from "zod";

export const createUserAnswerCommandSchema = z.object({
  answerId: z.string().min(1, "Die Answer-ID darf nicht leer sein"),
});

export type CreateUserAnswerCommand = z.infer<
  typeof createUserAnswerCommandSchema
>;
