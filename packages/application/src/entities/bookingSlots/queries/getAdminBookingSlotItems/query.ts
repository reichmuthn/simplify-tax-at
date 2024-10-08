import {
  GetAdminBookingSlotItemsSearchParams,
  getAdminBookingSlotItemsSelect,
  getAdminBookingSlotItemsWhere,
} from "@app/entities/bookingSlots/queries/getAdminBookingSlotItems/schemas";
import "server-only";
import {prisma} from "@simplifytax/database";

export async function getAdminBookingSlotItemsQuery(
  props?: GetAdminBookingSlotItemsSearchParams,
) {
  const whereQuery = props ? getAdminBookingSlotItemsWhere.parse(props) : {};

  const result = await prisma.bookingSlot.paginate(
    {
      where: {
      ...whereQuery,
      },
      select: getAdminBookingSlotItemsSelect,
      orderBy: {
        title: "asc",
      },
    },
    {
      page: props?.page ? parseInt(props.page) : 1,
      limit: props?.per_page ? parseInt(props.per_page) : 20,
    },
  );

  return {
    data: result.result,
    pageCount: result.totalPages
  };
}
