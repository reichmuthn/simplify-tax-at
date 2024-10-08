import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon } from "lucide-react";
import { EditorBubbleItem, useEditor } from "novel";

import { Button } from "@ui/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@ui/components/ui/popover";
import { FC } from "react";

export interface BubbleTextAlignMenuItem {
  title: string;
  value: string;
  Icon: FC;
}

const ALIGNMENTS = [
  {
    title: "Links",
    textAlign: "left",
    Icon: AlignLeftIcon,
  },
  {
    title: "Mittig",
    textAlign: "center",
    Icon: AlignCenterIcon,
  },
  {
    title: "Rechts",
    textAlign: "right",
    Icon: AlignRightIcon,
  },
];

interface TextAlignSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TextAlignSelector = ({
  open,
  onOpenChange,
}: TextAlignSelectorProps) => {
  const { editor } = useEditor();

  if (!editor) return null;

  const activeTextAlignItem = ALIGNMENTS.find(({ textAlign }) =>
    editor.isActive({ textAlign }),
  );

  const ActiveIcon = activeTextAlignItem?.Icon || AlignLeftIcon;

  return (
    <Popover modal={true} open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button size="sm" className="gap-2 rounded-none" variant="ghost">
          <ActiveIcon className={"h-4 w-4"} />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        sideOffset={5}
        className="my-1 flex max-h-80 w-48 flex-col overflow-hidden overflow-y-auto rounded border p-1 shadow-xl "
        align="start"
      >
        <div className="flex flex-col">
          <div className="my-1 px-2 text-sm font-semibold text-muted-foreground">
            Ausrichtung
          </div>
          {ALIGNMENTS.map(({ title, textAlign, Icon }) => (
            <EditorBubbleItem
              key={title}
              onSelect={() => {
                editor.commands.unsetFontSize();
                title !== "left" &&
                  editor.chain().focus().setTextAlign(textAlign).run();
              }}
              className="flex cursor-pointer items-center justify-between px-2 py-1 text-sm hover:bg-accent"
            >
              <div className="flex items-center gap-2">
                <div className="rounded-sm border px-2 py-px font-medium">
                  <Icon className={"w-4 h-4"} />
                </div>
                <span>{title}</span>
              </div>
            </EditorBubbleItem>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
