import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@ui/components/ui/sheet";
import { AdminPostItemForm } from "@ui/entities/posts/forms/admin/form";
import { AdminPostItem } from "@app/entities/posts/queries/getAdminPostItems/schemas";

interface AdminPostItemsSheetProps
  extends React.ComponentPropsWithRef<typeof Sheet> {
  post?: AdminPostItem;
}

export function AdminPostItemsSheet({
  post,
  onOpenChange,
  ...props
}: AdminPostItemsSheetProps) {
  return (
    <Sheet onOpenChange={onOpenChange} {...props} modal={false}>
      <SheetContent
        className="flex flex-col gap-6 w-full sm:max-w-4xl overflow-y-auto"
        onInteractOutside={(event) => event.preventDefault()}
        onOpenAutoFocus={(event) => event.preventDefault()}
      >
        <SheetHeader className="text-left">
          <SheetTitle>Beitrag {post ? "bearbeiten" : "erstellen"}</SheetTitle>
        </SheetHeader>
        <AdminPostItemForm
          post={post}
          onClose={() => {
            onOpenChange?.(false);
          }}
        />
      </SheetContent>
    </Sheet>
  );
}