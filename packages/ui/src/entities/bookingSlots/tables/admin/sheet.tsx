import React from "react";
import {Sheet, SheetContent, SheetHeader, SheetTitle,} from "@ui/components/ui/sheet";
import {AdminBookingSlotItemForm} from "@ui/entities/bookingSlots/forms/admin/form";
import {AdminBookingSlotItem} from "@app/entities/bookingSlots/queries/getAdminBookingSlotItems/schemas";

interface AdminBookingSlotItemsSheetProps
  extends React.ComponentPropsWithRef<typeof Sheet> {
  bookingSlot?: AdminBookingSlotItem;
}

export function AdminBookingSlotItemsSheet({ bookingSlot, onOpenChange, ...props}: AdminBookingSlotItemsSheetProps) {
  return (
    <Sheet onOpenChange={onOpenChange} {...props} modal={false}>
      <SheetContent
        className="flex flex-col gap-6 w-full sm:max-w-md overflow-y-auto"
        onInteractOutside={(event) => event.preventDefault()}
        onOpenAutoFocus={(event) => event.preventDefault()}
      >
        <SheetHeader className="text-left">
          <SheetTitle>Termin { bookingSlot ? "bearbeiten" : "erstellen"}</SheetTitle>
        </SheetHeader>
        <AdminBookingSlotItemForm
          bookingSlot={ bookingSlot }
          onClose={() => {
            onOpenChange?.(false);
          }}
        />
      </SheetContent>
    </Sheet>
  );
}
