import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@ui/components/ui/sheet";
import { AdminTermItemForm } from "@ui/entities/terms/forms/admin/form";
import { AdminTermItem } from "@app/entities/terms/queries/getAdminTermItems/schemas";

interface AdminTermItemsSheetProps
  extends React.ComponentPropsWithRef<typeof Sheet> {
  term?: AdminTermItem;
}

export function AdminTermItemsSheet({
  term,
  onOpenChange,
  ...props
}: AdminTermItemsSheetProps) {
  return (
    <Sheet onOpenChange={onOpenChange} {...props} modal={false}>
      <SheetContent
        className="flex flex-col gap-6 w-full sm:max-w-md overflow-y-auto"
        onInteractOutside={(event) => event.preventDefault()}
        onOpenAutoFocus={(event) => event.preventDefault()}
      >
        <SheetHeader className="text-left">
          <SheetTitle>Begriff {term ? "bearbeiten" : "erstellen"}</SheetTitle>
        </SheetHeader>
        <AdminTermItemForm
          term={term}
          onClose={() => {
            onOpenChange?.(false);
          }}
        />
      </SheetContent>
    </Sheet>
  );
}
