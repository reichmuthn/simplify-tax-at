import {Prisma} from "@prisma/client";
import {z} from "zod";

export type AdminBookingSlotItem = Prisma.BookingSlotGetPayload<{
  select: typeof getAdminBookingSlotItemsSelect;
}>;

export type GetAdminBookingSlotItemsSearchParams = {
  page?: string;
  per_page?: string;
  title?: string;
};

export const getAdminBookingSlotItemsWhere = z
.object({
  title: z.string().optional(),
})
.transform((searchParams) => {
  let query: Prisma.BookingSlotWhereInput = {};

  if (searchParams.title) {
    query = {
      title: {
        contains: searchParams.title,
      },
    }
  }

  return query;
});

export const getAdminBookingSlotItemsSelect = {
  id: true,
  title: true,
  status: true,
  dateFrom: true,
  dateTo: true,
  availableTimes: true,
  availableWeekdays: true
} satisfies Prisma.BookingSlotSelect;
