import { Button } from "@ui/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@ui/components/ui/popover";
import { cn } from "@ui/lib/utils";
import { Check, LucideExternalLink, Trash } from "lucide-react";
import { useEditor } from "novel";
import { useEffect, useRef, useState } from "react";
import { LinkTypeSelector } from "@ui/components/editor/selectors/link-type-selector";
import { LinkColorSelector } from "@ui/components/editor/selectors/link-color-selector";

export function isValidUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch (_e) {
    return false;
  }
}

export function getUrlFromString(str: string) {
  if (isValidUrl(str)) return str;
  try {
    if (str.includes(".") && !str.includes(" ")) {
      return new URL(`https://${str}`).toString();
    }
  } catch (_e) {
    return null;
  }
}

interface LinkSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const LinkSelector = ({ open, onOpenChange }: LinkSelectorProps) => {
  const { editor } = useEditor();

  if (!editor) return;

  const inputRef = useRef<HTMLInputElement>(null);
  const [openLinkType, setOpenLinkType] = useState(false);
  const [openLinkColor, setOpenLinkColor] = useState(false);

  useEffect(() => {
    inputRef.current?.focus();
  });
  if (!editor) return null;

  return (
    <Popover modal={true} open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          className="gap-2 rounded-none border-none"
        >
          <LucideExternalLink
            className={cn("h-4 w-4", {
              "text-blue-500":
                editor.isActive("link") ||
                editor.getAttributes("image").imageLink,
            })}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="min-w-60 w-90 p-1 bg-background"
        sideOffset={10}
      >
        <div className={"flex items-center gap-2"}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Link einfügen"
            className="flex-1 bg-white p-1 text-sm outline-none border-none focus:outline-none ring-0 focus:ring-0"
            defaultValue={
              editor.getAttributes("link").href ||
              editor.getAttributes("image").imageLink ||
              ""
            }
          />
          <div className={"flex items-center"}>
            {editor.getAttributes("link").href ||
            editor.getAttributes("image").imageLink ? (
              <Button
                size="sm"
                className="gap-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-800 rounded-none"
                variant="ghost"
                onClick={() => {
                  !editor.isActive("image") &&
                    editor.chain().focus().unsetLink().run();
                  editor.isActive("image") &&
                    editor
                      .chain()
                      .focus()
                      .updateAttributes("image", { imageLink: null })
                      .run();
                }}
              >
                <Trash className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                size="icon"
                className="h-8"
                onClick={() => {
                  const input = inputRef.current?.value || "";
                  const url = getUrlFromString(input);
                  url &&
                    !editor.isActive("image") &&
                    editor.chain().focus().setLink({ href: url }).run();
                  url &&
                    editor.isActive("image") &&
                    editor
                      .chain()
                      .focus()
                      .updateAttributes("image", { imageLink: url })
                      .run();
                }}
              >
                <Check className="h-4 w-4" />
              </Button>
            )}
            <LinkTypeSelector
              open={openLinkType}
              onOpenChange={setOpenLinkType}
            />
            <LinkColorSelector
              open={openLinkColor}
              onOpenChange={setOpenLinkColor}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
