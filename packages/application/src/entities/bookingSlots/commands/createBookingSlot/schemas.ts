import { z } from "zod";
import {statusEnum} from "@app/enums/status/enum";

export const createBookingSlotCommandSchema = z.object({
    title: z.string().min(1, "Der Titel darf nicht leer sein"),
    status: statusEnum.optional(),
    dateFrom: z.date().optional(),
    dateTo: z.date().optional(),
    availableTimes: z.string().optional(),
    availableWeekdays: z.string().optional(),
});

export type CreateBookingSlotCommand = z.infer<typeof createBookingSlotCommandSchema>;