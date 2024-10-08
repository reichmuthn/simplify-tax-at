import { Check } from "lucide-react";
import { EditorBubbleItem, useEditor } from "novel";

import { Button } from "@ui/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@ui/components/ui/popover";
import { ChangeEvent } from "react";

const BACKGROUND_COLORS = [
  {
    name: "Standard",
    color: "hsl(var(--primary))",
  },
  {
    name: "Akzent",
    color: "hsl(var(--accent))",
  },
];

interface LinkColorSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const LinkColorSelector = ({
  open,
  onOpenChange,
}: LinkColorSelectorProps) => {
  const { editor } = useEditor();

  if (!editor) return null;

  if (!editor.isActive("link", { type: "button" })) return;

  const activeBackgroundColorItem = BACKGROUND_COLORS.find(({ color }) =>
    editor.isActive("link", { backgroundColor: color }),
  );

  return (
    <Popover modal={true} open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button size="sm" className="gap-2 rounded-none" variant="ghost">
          <div
            className="w-5 h-5 flex items-center justify-center rounded-sm"
            style={{
              backgroundColor:
                activeBackgroundColorItem?.color || "var(--custom-primary)",
            }}
          >
            <div
              className="rounded-full w-3 h-3 border border-stone-200"
              style={{
                backgroundColor: "#fff",
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
        <div className="my-1 px-2 text-sm text-stone-500 flex items-center justify-between">
          <label htmlFor={"customBackgroundColor"}>Hintergrund</label>
          <input
            id={"customBackgroundColor"}
            type="color"
            onInput={(event: ChangeEvent<HTMLInputElement>) => {
              editor.commands.updateAttributes("link", {
                backgroundColor: event.target.value,
              });
            }}
            value={editor.getAttributes("link").backgroundColor}
            className={"w-6 h-4 shrink-0 cursor-pointer"}
          />
        </div>
        {BACKGROUND_COLORS.map(({ name, color }) => (
          <EditorBubbleItem
            key={name}
            onSelect={() => {
              editor.commands.updateAttributes("link", {
                backgroundColor: color,
              });
            }}
            className="flex cursor-pointer items-center justify-between px-2 py-1 text-sm hover:bg-accent"
          >
            <div className="flex items-center gap-2">
              <div className="flex items-center space-x-2">
                <div
                  className="w-5 h-5 flex items-center justify-center rounded-sm"
                  style={{ backgroundColor: color }}
                >
                  <div
                    className="rounded-full w-3 h-3 border border-stone-200"
                    style={{ backgroundColor: "#fff" }}
                  ></div>
                </div>
                <span>{name}</span>
              </div>
              {editor.isActive("link", { backgroundColor: color }) && (
                <Check className="h-4 w-4" />
              )}
            </div>
          </EditorBubbleItem>
        ))}
      </PopoverContent>
    </Popover>
  );
};
