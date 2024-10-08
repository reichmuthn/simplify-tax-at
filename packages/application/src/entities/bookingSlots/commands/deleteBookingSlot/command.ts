import { prisma } from "@simplifytax/database";
import "server-only";

export async function deleteBookingSlotCommand(id: string) {
    await prisma.bookingSlot.delete({
        where: {
            id: id,
        },
    });
}
