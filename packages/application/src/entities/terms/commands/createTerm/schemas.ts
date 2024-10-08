import { z } from "zod";
import { statusEnum } from "@app/enums/status/enum";

export const createTermCommandSchema = z.object({
  title: z.string().min(1, "Der Titel darf nicht leer sein"),
  description: z.string().optional(),
  tags: z.array(z.string()),
  status: statusEnum.optional(),
});

export type CreateTermCommand = z.infer<typeof createTermCommandSchema>;
