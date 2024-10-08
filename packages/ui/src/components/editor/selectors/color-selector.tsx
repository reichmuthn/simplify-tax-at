import { Check } from "lucide-react";
import { EditorBubbleItem, useEditor } from "novel";

import { Button } from "@ui/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@ui/components/ui/popover";
import { ChangeEvent } from "react";

export interface BubbleColorMenuItem {
  name: string;
  color: string;
}

const TEXT_COLORS: BubbleColorMenuItem[] = [
  {
    name: "Standard",
    color: "currentcolor",
  },
  {
    name: "Weiß",
    color: "#fff",
  },
  {
    name: "Primär",
    color: "var(--custom-primary)",
  },
  {
    name: "Sekondär",
    color: "var(--custom-secondary)",
  },
  {
    name: "Tertiär",
    color: "var(--custom-tertiary)",
  },
];

const HIGHLIGHT_COLORS: BubbleColorMenuItem[] = [
  {
    name: "Standard",
    color: "var(--novel-highlight-default)",
  },
  {
    name: "Primär",
    color: "var(--custom-primary)",
  },
  {
    name: "Sekondär",
    color: "var(--custom-secondary)",
  },
  {
    name: "Tertiär",
    color: "var(--custom-tertiary)",
  },
];

interface ColorSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ColorSelector = ({ open, onOpenChange }: ColorSelectorProps) => {
  const { editor } = useEditor();

  if (!editor) return null;
  const activeColorItem = TEXT_COLORS.find(({ color }) =>
    editor.isActive("textStyle", { color }),
  );

  const activeHighlightItem = HIGHLIGHT_COLORS.find(({ color }) =>
    editor.isActive("highlight", { color }),
  );

  return (
    <Popover modal={true} open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button size="sm" className="gap-2 rounded-none" variant="ghost">
          <span className="rounded-sm px-1">
            <div
              className="w-5 h-5 flex items-center justify-center rounded-sm"
              style={{
                backgroundColor: activeHighlightItem?.color,
              }}
            >
              <div
                className="rounded-full w-3 h-3 border border-stone-200"
                style={{
                  backgroundColor: activeColorItem?.color || "currentcolor",
                }}
              ></div>
            </div>
          </span>
        </Button>
      </PopoverTrigger>

      <PopoverContent
        sideOffset={5}
        className="my-1 flex max-h-80 w-48 flex-col overflow-hidden overflow-y-auto rounded border p-1 shadow-xl "
        align="start"
      >
        <div className="my-1 px-2 text-sm text-stone-500 flex items-center justify-between">
          <label htmlFor={"customTextColor"}>Farbe</label>
          <input
            id={"customTextColor"}
            type="color"
            onInput={(event: ChangeEvent<HTMLInputElement>) => {
              editor.commands.unsetColor();
              editor.chain().focus().setColor(event.target.value).run();
            }}
            value={editor.getAttributes("textStyle").color}
            className={"w-6 h-4 shrink-0 cursor-pointer"}
          />
        </div>
        {TEXT_COLORS.map(({ name, color }) => (
          <EditorBubbleItem
            key={name}
            onSelect={() => {
              editor.commands.unsetColor();
              name !== "Default" &&
                editor
                  .chain()
                  .focus()
                  .setColor(color || "")
                  .run();
            }}
            className="flex cursor-pointer items-center justify-between px-2 py-1 text-sm hover:bg-accent"
          >
            <div className="flex items-center gap-2">
              <div className="flex items-center space-x-2">
                <div
                  className="rounded-full w-4 h-4 border border-stone-200"
                  style={{ backgroundColor: color }}
                ></div>
                <span>{name}</span>
              </div>
            </div>
          </EditorBubbleItem>
        ))}
        <div className="my-1 px-2 text-sm text-stone-500 flex items-center justify-between">
          <label htmlFor={"customBackgroundColor"}>Hintergrund</label>
          <input
            id={"customBackgroundColor"}
            type="color"
            onInput={(event: ChangeEvent<HTMLInputElement>) => {
              editor.commands.unsetHighlight();
              editor.commands.setHighlight({ color: event.target.value });
            }}
            value={editor.getAttributes("textStyle").color}
            className={"w-6 h-4 shrink-0 cursor-pointer"}
          />
        </div>
        {HIGHLIGHT_COLORS.map(({ name, color }) => (
          <EditorBubbleItem
            key={name}
            onSelect={() => {
              editor.commands.unsetHighlight();
              name !== "Default" && editor.commands.setHighlight({ color });
            }}
            className="flex cursor-pointer items-center justify-between px-2 py-1 text-sm hover:bg-accent"
          >
            <div className="flex items-center gap-2">
              <div
                className="w-5 h-5 flex items-center justify-center rounded-sm"
                style={{ backgroundColor: color }}
              >
                <div
                  className="rounded-full w-3 h-3 border border-stone-200"
                  style={{
                    backgroundColor: activeColorItem?.color || "currentcolor",
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
      </PopoverContent>
    </Popover>
  );
};
