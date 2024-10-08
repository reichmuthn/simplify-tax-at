import {Prisma} from "@prisma/client";

export type ActiveBookingSlot = Prisma.BookingSlotGetPayload<{
  select: typeof getAllActiveBookingSlotsSelect
}>

export type ActiveBookingSlots = {[key: string]: string[]};

export const getAllActiveBookingSlotsSelect = {
  id: true,
  dateFrom: true,
  dateTo: true,
  availableTimes: true,
  availableWeekdays: true,
}