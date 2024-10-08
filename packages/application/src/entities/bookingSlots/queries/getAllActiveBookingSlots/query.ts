import {prisma} from "@simplifytax/database";
import "server-only";
import {
  ActiveBookingSlots,
  getAllActiveBookingSlotsSelect
} from "@app/entities/bookingSlots/queries/getAllActiveBookingSlots/schemas";
import {eachDayOfInterval, format, formatISO} from "date-fns";
import {deAT} from "date-fns/locale";
import {StatusEnums} from "@app/enums/status/enum";
import {fromZonedTime} from "date-fns-tz/fromZonedTime";

export async function getAllActiveBookingSlotsQuery() {
  const result = await prisma.bookingSlot.findMany({
    where: {
      status: StatusEnums.Active,
    },
    select: getAllActiveBookingSlotsSelect
  });

  /*
  * {
  *   "2024-06-01": ["11:00", "12:00"],
  *   "2024-06-02": ["11:00", "12:00"]
  * }
  * */
  const bookingSlots: ActiveBookingSlots = {};

  for (const bookingSlot of result) {
    if (!bookingSlot.dateFrom || !bookingSlot.dateTo || !bookingSlot.availableWeekdays || !bookingSlot.availableTimes) continue;

    const days = eachDayOfInterval({start: bookingSlot.dateFrom, end: bookingSlot.dateTo});
    const availableWeekdays = bookingSlot.availableWeekdays.split(";").map(x => x.trim().toLowerCase());

    for (const day of days) {
      const weekday = format(day, 'cccccc', {locale: deAT}).toLowerCase();

      if (!availableWeekdays.includes(weekday)) continue;

      const dayIso = (fromZonedTime(day, "Europe/Berlin")).toISOString();

      bookingSlots[dayIso] = bookingSlot.availableTimes.split(";").map(x => x.trim());
    }

  }

  return bookingSlots;
}