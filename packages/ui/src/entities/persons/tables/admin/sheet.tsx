import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@ui/components/ui/sheet";
import { AdminPersonItemForm } from "@ui/entities/persons/forms/admin/form";
import { AdminPersonItem } from "@app/entities/persons/queries/getAdminPersonItems/schemas";

interface AdminPersonItemsSheetProps
  extends React.ComponentPropsWithRef<typeof Sheet> {
  person?: AdminPersonItem;
}

export function AdminPersonItemsSheet({
  person,
  onOpenChange,
  ...props
}: AdminPersonItemsSheetProps) {
  return (
    <Sheet onOpenChange={onOpenChange} {...props} modal={false}>
      <SheetContent
        className="flex flex-col gap-6 w-full sm:max-w-md overflow-y-auto"
        onInteractOutside={(event) => event.preventDefault()}
        onOpenAutoFocus={(event) => event.preventDefault()}
      >
        <SheetHeader className="text-left">
          <SheetTitle>Author {person ? "bearbeiten" : "erstellen"}</SheetTitle>
        </SheetHeader>
        <AdminPersonItemForm
          person={person}
          onClose={() => {
            onOpenChange?.(false);
          }}
        />
      </SheetContent>
    </Sheet>
  );
}
