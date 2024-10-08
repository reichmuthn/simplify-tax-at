import React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { cn } from "@ui/lib/utils";
import { Magic } from "@ui/components/editor/icons/magic";

const AiCommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
    <Magic className="text-purple-500 mr-2 h-4 w-4 shrink-0 opacity-50" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  </div>
));

AiCommandInput.displayName = CommandPrimitive.Input.displayName;

export { AiCommandInput };
