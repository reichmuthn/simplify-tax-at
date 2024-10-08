import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@ui/components/ui/sheet";
import React from "react";
import { ExampleContentForm } from "@ui/views/content/example/form";

interface ExampleContentSheetProps
  extends React.ComponentPropsWithRef<typeof Sheet> {
  content?: string;
}

export function ExampleContentSheet({
  content,
  onOpenChange,
  ...props
}: ExampleContentSheetProps) {
  return (
    <Sheet onOpenChange={onOpenChange} {...props} modal={false}>
      <SheetContent
        className="flex flex-col gap-6 w-full sm:max-w-md overflow-y-auto"
        onInteractOutside={(event) => event.preventDefault()}
      >
        <SheetHeader className="text-left">
          <SheetTitle>Text bearbeiten</SheetTitle>
        </SheetHeader>
        <ExampleContentForm
          content={content}
          onClose={() => {
            onOpenChange?.(false);
          }}
          key={"key"}
        />
      </SheetContent>
    </Sheet>
  );
}
