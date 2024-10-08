import { Check, ChevronDown } from "lucide-react";
import { EditorBubbleItem, useEditor } from "novel";

import { Button } from "@ui/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@ui/components/ui/popover";

export interface BubbleFrameColorMenuItem {
  name: string;
  color: string;
}

const BORDER_COLORS: BubbleFrameColorMenuItem[] = [
  {
    name: "Standard",
    color: "hsl(var(--app-accent))",
  },
  {
    name: "Akzent",
    color: "hsl(var(--accent))",
  },
];

const BACKGROUND_COLORS: BubbleFrameColorMenuItem[] = [
  {
    name: "Standard",
    color: "hsl(var(--background))",
  },
  {
    name: "Akzent",
    color: "hsl(var(--accent))",
  },
];

interface FrameColorSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const FrameColorSelector = ({
  open,
  onOpenChange,
}: FrameColorSelectorProps) => {
  const { editor } = useEditor();

  if (!editor) return null;

  if (!editor.isActive("frame")) return;

  const activeBorderColorItem = BORDER_COLORS.find(({ color }) =>
    editor.isActive("frame", { frameBorderColor: color }),
  );

  const activeBackgroundColorItem = BACKGROUND_COLORS.find(({ color }) =>
    editor.isActive("frame", { frameBackgroundColor: color }),
  );

  return (
    <Popover modal={true} open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button size="sm" className="gap-2 rounded-none" variant="ghost">
          <div
            className="w-5 h-5 flex items-center justify-center border border-stone-200 rounded-sm"
            style={{
              backgroundColor: activeBorderColorItem?.color,
            }}
          >
            <div
              className="w-3 h-3 border border-stone-200 rounded-sm"
              style={{
                backgroundColor: activeBackgroundColorItem?.color,
              }}
            ></div>
          </div>
        </Button>
      </PopoverTrigger>

      <PopoverContent
        sideOffset={5}
        className="my-1 flex max-h-80 w-48 flex-col overflow-hidden overflow-y-auto rounded border p-1 shadow-xl "
        align="start"
      >
        <div className="flex flex-col">
          <div className="my-1 px-2 text-sm font-semibold text-muted-foreground">
            Rahmen
          </div>
          {BORDER_COLORS.map(({ name, color }) => (
            <EditorBubbleItem
              key={name}
              onSelect={() => {
                editor.commands.unsetFrameBorderColor();
                name !== "Standard" &&
                  editor.commands.setFrameBorderColor(color);
              }}
              className="flex cursor-pointer items-center justify-between px-2 py-1 text-sm hover:bg-accent"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-5 h-5 flex items-center justify-center border border-stone-200 rounded-sm"
                  style={{
                    backgroundColor: color,
                  }}
                >
                  <div
                    className="w-3 h-3 border border-stone-200 rounded-sm"
                    style={{
                      backgroundColor: activeBackgroundColorItem?.color,
                    }}
                  ></div>
                </div>
                <span>{name}</span>
              </div>
            </EditorBubbleItem>
          ))}
        </div>
        <div>
          <div className="my-1 px-2 text-sm font-semibold text-muted-foreground">
            Hintergrund
          </div>
          {BACKGROUND_COLORS.map(({ name, color }) => (
            <EditorBubbleItem
              key={name}
              onSelect={() => {
                editor.commands.unsetFrameBackgroundColor();
                name !== "Standard" &&
                  editor.commands.setFrameBackgroundColor(color);
              }}
              className="flex cursor-pointer items-center justify-between px-2 py-1 text-sm hover:bg-accent"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-5 h-5 flex items-center justify-center border border-stone-200 rounded-sm"
                  style={{
                    backgroundColor: activeBorderColorItem?.color,
                  }}
                >
                  <div
                    className="w-3 h-3 border border-stone-200 rounded-sm"
                    style={{
                      backgroundColor: color,
                    }}
                  ></div>
                </div>
                <span>{name}</span>
              </div>
              {editor.isActive("highlight", { color }) && (
                <Check className="h-4 w-4" />
              )}
            </EditorBubbleItem>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
