import { CaseLowerIcon, RectangleHorizontalIcon } from "lucide-react";
import { EditorBubbleItem, useEditor } from "novel";

import { Button } from "@ui/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@ui/components/ui/popover";
import { FC } from "react";

export interface BubbleLinkTypeMenuItem {
  title: string;
  linkType: string;
  Icon: FC;
}

const TYPES = [
  {
    title: "Text",
    linkType: "text",
    Icon: CaseLowerIcon,
  },
  {
    title: "Button",
    linkType: "button",
    Icon: RectangleHorizontalIcon,
  },
];

interface LinkTypeSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const LinkTypeSelector = ({
  open,
  onOpenChange,
}: LinkTypeSelectorProps) => {
  const { editor } = useEditor();

  if (!editor) return null;

  if (!editor.isActive("link")) return;

  const activeLinkTypeItem = TYPES.find(({ linkType }) =>
    editor.isActive("link", { type: linkType }),
  );

  const ActiveIcon = activeLinkTypeItem?.Icon || CaseLowerIcon;

  return (
    <Popover modal={true} open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button size="sm" className="gap-2 rounded-none" variant="ghost">
          <ActiveIcon className={"w-4 h-4"} />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        sideOffset={5}
        className="my-1 flex max-h-80 w-48 flex-col overflow-hidden overflow-y-auto rounded border p-1 shadow-xl "
        align="start"
      >
        <div className="flex flex-col">
          <div className="my-1 px-2 text-sm font-semibold text-muted-foreground">
            Link Typ
          </div>
          {TYPES.map(({ title, linkType, Icon }) => (
            <EditorBubbleItem
              key={title}
              onSelect={() => {
                activeLinkTypeItem?.linkType !== linkType &&
                  editor!
                    .chain()
                    .extendMarkRange("link")
                    .updateAttributes("link", { type: linkType })
                    .run();
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
