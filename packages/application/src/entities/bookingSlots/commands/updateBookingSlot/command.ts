import { prisma } from "@simplifytax/database";
import "server-only";
import { CreateBookingSlotCommand } from "@app/entities/bookingSlots/commands/createBookingSlot/schemas";

export async function updateBookingSlotCommand(id: string, values: CreateBookingSlotCommand) {
    await prisma.bookingSlot.update({
        where: { id },
        data: values
    });
}
