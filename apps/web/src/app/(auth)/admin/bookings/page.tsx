import React from "react";
import {AdminBookingSlotItemsView} from "@ui/entities/bookingSlots/tables/admin/view";
import {
  GetAdminBookingSlotItemsSearchParams
} from "@app/entities/bookingSlots/queries/getAdminBookingSlotItems/schemas";

export default function Page({
                               searchParams,
                             }: {
  searchParams?: GetAdminBookingSlotItemsSearchParams;
}) {
  return <AdminBookingSlotItemsView searchParams={searchParams}/>;
}
