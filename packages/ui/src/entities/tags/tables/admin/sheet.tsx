import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@ui/components/ui/sheet";
import { AdminTagItemForm } from "@ui/entities/tags/forms/admin/form";
import { AdminTagItem } from "@app/entities/tags/queries/getAdminTagItems/schemas";

interface AdminTagItemsSheetProps
  extends React.ComponentPropsWithRef<typeof Sheet> {
  tag?: AdminTagItem;
}

export function AdminTagItemsSheet({
  tag,
  onOpenChange,
  ...props
}: AdminTagItemsSheetProps) {
  return (
    <Sheet onOpenChange={onOpenChange} {...props} modal={false}>
      <SheetContent
        className="flex flex-col gap-6 w-full sm:max-w-md overflow-y-auto"
        onInteractOutside={(event) => event.preventDefault()}
        onOpenAutoFocus={(event) => event.preventDefault()}
      >
        <SheetHeader className="text-left">
          <SheetTitle>Tag {tag ? "bearbeiten" : "erstellen"}</SheetTitle>
        </SheetHeader>
        <AdminTagItemForm
          tag={tag}
          onClose={() => {
            onOpenChange?.(false);
          }}
        />
      </SheetContent>
    </Sheet>
  );
}
