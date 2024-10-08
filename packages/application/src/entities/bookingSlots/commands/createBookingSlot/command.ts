import { prisma } from "@simplifytax/database";
import "server-only";
import { CreateBookingSlotCommand } from "@app/entities/bookingSlots/commands/createBookingSlot/schemas";

export async function createBookingSlotCommand(values: CreateBookingSlotCommand) {
    await prisma.bookingSlot.create({
        data: values,
    });
}