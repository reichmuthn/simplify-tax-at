import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@ui/components/ui/sheet";
import { AdminTagGroupItemForm } from "@ui/entities/tagGroups/forms/admin/form";
import { AdminTagGroupItem } from "@app/entities/tagGroups/queries/getAdminTagGroupItems/schemas";

interface AdminTagGroupItemsSheetProps
  extends React.ComponentPropsWithRef<typeof Sheet> {
  tagGroup?: AdminTagGroupItem;
}

export function AdminTagGroupItemsSheet({
  tagGroup,
  onOpenChange,
  ...props
}: AdminTagGroupItemsSheetProps) {
  return (
    <Sheet onOpenChange={onOpenChange} {...props} modal={false}>
      <SheetContent
        className="flex flex-col gap-6 w-full sm:max-w-md overflow-y-auto"
        onInteractOutside={(event) => event.preventDefault()}
        onOpenAutoFocus={(event) => event.preventDefault()}
      >
        <SheetHeader className="text-left">
          <SheetTitle>
            TagGroup {tagGroup ? "bearbeiten" : "erstellen"}
          </SheetTitle>
        </SheetHeader>
        <AdminTagGroupItemForm
          tagGroup={tagGroup}
          onClose={() => {
            onOpenChange?.(false);
          }}
        />
      </SheetContent>
    </Sheet>
  );
}
