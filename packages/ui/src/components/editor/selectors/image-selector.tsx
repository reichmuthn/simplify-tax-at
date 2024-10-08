import { Button } from "@ui/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@ui/components/ui/popover";
import { cn } from "@ui/lib/utils";
import { useEditor } from "novel";
import { ImageSelectField } from "@ui/assets/images/fields/imageSelectField/field";
import { getCldImageUrl } from "next-cloudinary";
import { ImageIcon } from "lucide-react";

interface ImageSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ImageSelector = ({ open, onOpenChange }: ImageSelectorProps) => {
  const { editor } = useEditor();

  if (!editor) return;

  return (
    <Popover modal={true} open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          className="gap-2 rounded-none border-none"
        >
          <ImageIcon
            className={cn("h-4 w-4", {
              "text-blue-500": editor.isActive("link"),
            })}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-48 p-1 bg-background"
        sideOffset={10}
      >
        <div className={"flex items-center gap-2"}>
          <span className={"whitespace-nowrap font-medium w-full text-sm"}>
            Bild ändern
          </span>
          <div>
            <ImageSelectField
              onChange={(publicId) => {
                const cloudinaryUrl = getCldImageUrl({
                  src: publicId,
                });
                cloudinaryUrl &&
                  editor.commands.updateAttributes("image", {
                    src: cloudinaryUrl,
                  });
              }}
              defaultValue={editor.getAttributes("image").src}
              folder={"editor"}
              maxSelected={1}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
