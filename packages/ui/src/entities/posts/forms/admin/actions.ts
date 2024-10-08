"use server";

import { revalidateTag, unstable_noStore as noStore } from "next/cache";
import {
  CreatePostCommand,
  createPostCommandSchema,
} from "@app/entities/posts/commands/createPost/schemas";
import { createPostCommand } from "@app/entities/posts/commands/createPost/command";
import { updatePostCommand } from "@app/entities/posts/commands/updatePost/command";
import { deletePostCommand } from "@app/entities/posts/commands/deletePost/command";

export async function savePost(values: CreatePostCommand, id?: string) {
  noStore();
  const validatedFields = createPostCommandSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      data: null,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    id
      ? await updatePostCommand(id, validatedFields.data)
      : await createPostCommand(validatedFields.data);
    revalidateTag("posts");
  } catch (err: any) {
    return {
      data: null,
      errors: { root: [err.message] },
    };
  }
}

export async function deletePost(id: string) {
  noStore();
  try {
    await deletePostCommand(id);
  } catch (err: any) {
    return {
      data: null,
      errors: { root: [err.message] },
    };
  }

  revalidateTag("posts");
}
