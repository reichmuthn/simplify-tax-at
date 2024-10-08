import { ListTodoIcon } from "lucide-react";
import { EditorBubbleItem, useEditor } from "novel";

import { Button } from "@ui/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@ui/components/ui/popover";

const BULLET_TYPES = [
  {
    title: "Bullet",
    imgSrc: null,
  },
  {
    title: "Checkmark",
    imgSrc: "/img/checkmark.svg",
  },
];

interface BulletTypeSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const BulletTypeSelector = ({
  open,
  onOpenChange,
}: BulletTypeSelectorProps) => {
  const { editor } = useEditor();

  if (!editor) return null;

  if (!editor.isActive("listItem")) return;

  const activeBulletTypeItem = BULLET_TYPES.find(({ imgSrc }) =>
    editor.isActive("listItem", { imgSrc }),
  );

  return (
    <Popover modal={true} open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button size="sm" className="gap-2 rounded-none" variant="ghost">
          <ListTodoIcon className={"w-4 h-4"} />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        sideOffset={5}
        className="my-1 flex max-h-80 w-48 flex-col overflow-hidden overflow-y-auto rounded border p-1 shadow-xl "
        align="start"
      >
        <div className="flex flex-col">
          <div className="my-1 px-2 text-sm font-semibold text-muted-foreground">
            Typ
          </div>
          {BULLET_TYPES.map(({ title, imgSrc }) => (
            <EditorBubbleItem
              key={title}
              onSelect={() => {
                activeBulletTypeItem?.imgSrc !== imgSrc &&
                  editor!
                    .chain()
                    .updateAttributes("listItem", { imgSrc })
                    .run();
              }}
              className="flex cursor-pointer items-center justify-between px-2 py-1 text-sm hover:bg-accent"
            >
              <div className="flex items-center gap-2">
                <div className="rounded-sm border px-2 py-px font-medium">
                  {imgSrc ? (
                    <img
                      src={imgSrc}
                      className={"w-5 h-5"}
                      alt={"Aufzählungszeichen"}
                    />
                  ) : (
                    <span>&bull;</span>
                  )}
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
