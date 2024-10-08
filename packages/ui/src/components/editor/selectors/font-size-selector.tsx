import { ALargeSmallIcon, Check, ChevronDown } from "lucide-react";
import { EditorBubbleItem, useEditor } from "novel";

import { Button } from "@ui/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@ui/components/ui/popover";

export interface BubbleFontSizeMenuItem {
  title: string;
  fontSize: string;
  lineHeight: string;
}

const SIZES = [
  {
    title: "xs",
    fontSize: "0.75rem",
    lineHeight: "1rem",
  },
  {
    title: "sm",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
  },
  {
    title: "auto",
    fontSize: "1rem",
    lineHeight: "1.5rem",
  },
  {
    title: "lg",
    fontSize: "1.125rem",
    lineHeight: "1.75rem",
  },
  {
    title: "xl",
    fontSize: "1.25rem",
    lineHeight: "1.75rem",
  },
  {
    title: "2xl",
    fontSize: "1.5rem",
    lineHeight: "2rem",
  },
];

interface FontSizeSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const FontSizeSelector = ({
  open,
  onOpenChange,
}: FontSizeSelectorProps) => {
  const { editor } = useEditor();

  if (!editor) return null;

  const activeFontSizeItem = SIZES.find(({ fontSize }) =>
    editor.isActive("textStyle", { fontSize }),
  );

  return (
    <Popover modal={true} open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button size="sm" className="gap-2 rounded-none" variant="ghost">
          <ALargeSmallIcon className={"w-4 h-4"} />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        sideOffset={5}
        className="my-1 flex max-h-80 w-48 flex-col overflow-hidden overflow-y-auto rounded border p-1 shadow-xl "
        align="start"
      >
        <div className="flex flex-col">
          <div className="my-1 px-2 text-sm font-semibold text-muted-foreground">
            Größe
          </div>
          {SIZES.map(({ title, fontSize }) => (
            <EditorBubbleItem
              key={title}
              onSelect={() => {
                editor.commands.unsetFontSize();
                title !== "auto" &&
                  editor.chain().focus().setFontSize(fontSize).run();
              }}
              className="flex cursor-pointer items-center justify-between px-2 py-1 text-sm hover:bg-accent"
            >
              <div className="flex items-center gap-2">
                <div className="rounded-sm border px-2 py-px font-medium">
                  {title}
                </div>
              </div>
            </EditorBubbleItem>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
