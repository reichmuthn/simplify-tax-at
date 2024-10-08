"use server";

import { unstable_noStore as noStore, revalidateTag } from "next/cache";
import {
  CreateBookingSlotCommand,
  createBookingSlotCommandSchema,
} from "@app/entities/bookingSlots/commands/createBookingSlot/schemas";
import { createBookingSlotCommand } from "@app/entities/bookingSlots/commands/createBookingSlot/command";
import { updateBookingSlotCommand } from "@app/entities/bookingSlots/commands/updateBookingSlot/command";
import { deleteBookingSlotCommand } from "@app/entities/bookingSlots/commands/deleteBookingSlot/command";

export async function saveBookingSlot(values: CreateBookingSlotCommand, id?: string) {
  noStore();
  const validatedFields = createBookingSlotCommandSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      data: null,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    id
      ? await updateBookingSlotCommand(id, validatedFields.data)
      : await createBookingSlotCommand(validatedFields.data);
    revalidateTag("bookingSlots");
  } catch (err: any) {
    return {
      data: null,
      errors: { root: [err.message] },
    };
  }
}

export async function deleteBookingSlot(id: string) {
  noStore();
  try {
    await deleteBookingSlotCommand(id);
  } catch (err: any) {
    return {
      data: null,
      errors: { root: [err.message] },
    };
  }

  revalidateTag("bookingSlots");
}