import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@ui/components/ui/sheet";
import { AdminQuestionGroupItemForm } from "@ui/entities/questionGroups/forms/admin/form";
import { AdminQuestionGroupItem } from "@app/entities/questionGroups/queries/getAdminQuestionGroupItems/schemas";

interface AdminQuestionGroupItemsSheetProps
  extends React.ComponentPropsWithRef<typeof Sheet> {
  questionGroup?: AdminQuestionGroupItem;
}

export function AdminQuestionGroupItemsSheet({
  questionGroup,
  onOpenChange,
  ...props
}: AdminQuestionGroupItemsSheetProps) {
  return (
    <Sheet onOpenChange={onOpenChange} {...props} modal={false}>
      <SheetContent
        className="flex flex-col gap-6 w-full sm:max-w-2xl overflow-y-auto"
        onInteractOutside={(event) => event.preventDefault()}
        onOpenAutoFocus={(event) => event.preventDefault()}
      >
        <SheetHeader className="text-left">
          <SheetTitle>
            QuestionGroup {questionGroup ? "bearbeiten" : "erstellen"}
          </SheetTitle>
        </SheetHeader>
        <AdminQuestionGroupItemForm
          questionGroup={questionGroup}
          onClose={() => {
            onOpenChange?.(false);
          }}
        />
      </SheetContent>
    </Sheet>
  );
}
