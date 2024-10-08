import {Row} from "@tanstack/react-table";
import {AdminBookingSlotItem} from "@app/entities/bookingSlots/queries/getAdminBookingSlotItems/schemas";
import {toast} from "sonner";
import {deleteBookingSlot } from "@ui/entities/bookingSlots/forms/admin/actions";

export function deleteBookingSlots({rows, onSuccess}: {
  rows: Row<AdminBookingSlotItem>[];
  onSuccess?: () => void;
}) {
  toast.promise(
    Promise.all(rows.map(async (row) => deleteBookingSlot(row.original.id))),
    {
      loading: "Lösche...",
      success: () => {
        onSuccess?.();
        return "BookingSlots gelöscht";
      },
      error: (err) => "Fehler beim Löschen",
    },
  );
}
