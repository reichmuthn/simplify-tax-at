import { z } from "zod";
import { statusEnum } from "@app/enums/status/enum";

export const createPostCommandSchema = z.object({
  title: z.string().min(1, "Der Titel darf nicht leer sein"),
  content: z.string().optional(),
  summary: z.string().optional(),
  status: statusEnum.optional(),
  publishedAt: z.date().optional(),
  titleImage: z.string().optional(),
  tags: z.array(z.string()),
  author: z.string().optional(),
});

export type CreatePostCommand = z.infer<typeof createPostCommandSchema>;
