"use client";
import { defaultEditorContent } from "@ui/lib/content";
import {
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
  EditorContent,
  type EditorInstance,
  EditorRoot,
  type JSONContent,
} from "novel";
import { handleCommandNavigation, ImageResizer } from "novel/extensions";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { defaultExtensions } from "./extensions";
import { ColorSelector } from "./selectors/color-selector";
import { LinkSelector } from "./selectors/link-selector";
import { NodeSelector } from "./selectors/node-selector";
import { Separator } from "@ui/components/ui/separator";

import { handleImageDrop, handleImagePaste } from "novel/plugins";
import { GenerativeMenuSwitch } from "./generative/generative-menu-switch";
import { uploadFn } from "./image-upload";
import { TextButtons } from "./selectors/text-buttons";
import { slashCommand, suggestionItems } from "./slash-command";
import { FrameColorSelector } from "@ui/components/editor/selectors/frame-color-selector";
import { FontSizeSelector } from "@ui/components/editor/selectors/font-size-selector";
import { TextAlignSelector } from "@ui/components/editor/selectors/text-align-selector";
import { BulletTypeSelector } from "@ui/components/editor/selectors/bullet-type-selector";
import { ImageSelector } from "@ui/components/editor/selectors/image-selector";
import { ImageBubbleMenu } from "@ui/components/editor/menus/image-bubble-menu";
import { ImageTypeSelector } from "@ui/components/editor/selectors/image-type-selector";

const extensions = [...defaultExtensions, slashCommand];

type AdvancedEditorProps = {
  onChange: (newValue: string) => void;
  defaultValue: string | null;
};

export const AdvancedEditor = ({
  onChange,
  defaultValue,
}: AdvancedEditorProps) => {
  const [initialContent, setInitialContent] = useState<null | JSONContent>(
    null,
  );
  //const [saveStatus, setSaveStatus] = useState("Gespeichert");

  const [openNode, setOpenNode] = useState(false);
  const [openColor, setOpenColor] = useState(false);
  const [openLink, setOpenLink] = useState(false);
  const [openImageLink, setOpenImageLink] = useState(false);
  const [openImageType, setOpenImageType] = useState(false);
  const [openAI, setOpenAI] = useState(false);
  const [openFrameColor, setOpenFrameColor] = useState(false);
  const [openFontSize, setOpenFontSize] = useState(false);
  const [openTextAlign, setOpenTextAlign] = useState(false);

  const [openBulletType, setOpenBulletType] = useState(false);
  const [openImage, setOpenImage] = useState(false);

  const debouncedUpdates = useDebouncedCallback(
    async (editor: EditorInstance) => {
      const json = editor.getJSON();
      const jsonString = JSON.stringify(json);
      onChange(jsonString);
    },
    500,
  );

  useEffect(() => {
    if (defaultValue) {
      try {
        const json = JSON.parse(defaultValue);
        setInitialContent(json);
      } catch (e) {
        setInitialContent(defaultEditorContent);
      }
    } else setInitialContent(defaultEditorContent);
  }, [defaultValue]);

  if (!initialContent) return null;

  return (
    <div className="relative w-full max-w-screen-lg">
      <div className="hidden absolute right-5 top-5 z-10 mb-5 rounded-lg bg-accent px-2 py-1 text-sm text-muted-foreground"></div>
      <EditorRoot>
        <EditorContent
          initialContent={initialContent}
          extensions={extensions}
          className="relative min-h-[500px] w-full max-w-screen-lg border-muted bg-white sm:rounded-lg sm:border sm:shadow-lg"
          editorProps={{
            handleDOMEvents: {
              keydown: (_view, event) => handleCommandNavigation(event),
            },
            handlePaste: (view, event) =>
              handleImagePaste(view, event, uploadFn),
            handleDrop: (view, event, _slice, moved) =>
              handleImageDrop(view, event, moved, uploadFn),
            attributes: {
              class:
                "prose prose-base prose-headings:font-normal prose-headings:text-display prose-p:text-body prose-p:tracking-tight focus:outline-none max-w-full",
            },
          }}
          onUpdate={({ editor }) => {
            debouncedUpdates(editor);
          }}
          slotAfter={<ImageResizer />}
        >
          <EditorCommand className="z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
            <EditorCommandEmpty className="px-2 text-muted-foreground">
              Keine Resultate
            </EditorCommandEmpty>
            <EditorCommandList>
              {suggestionItems.map((item) => (
                <EditorCommandItem
                  value={item.title}
                  onCommand={(val) => item.command?.(val)}
                  className="flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent"
                  key={item.title}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </EditorCommandItem>
              ))}
            </EditorCommandList>
          </EditorCommand>

          <ImageBubbleMenu>
            <ImageSelector open={openImage} onOpenChange={setOpenImage} />
            <Separator orientation="vertical" />
            <ImageTypeSelector
              open={openImageType}
              onOpenChange={setOpenImageType}
            />
            <Separator orientation="vertical" />
            <LinkSelector
              open={openImageLink}
              onOpenChange={setOpenImageLink}
            />
          </ImageBubbleMenu>

          <GenerativeMenuSwitch open={openAI} onOpenChange={setOpenAI}>
            <Separator orientation="vertical" />
            <NodeSelector open={openNode} onOpenChange={setOpenNode} />
            <FrameColorSelector
              open={openFrameColor}
              onOpenChange={setOpenFrameColor}
            />
            <BulletTypeSelector
              open={openBulletType}
              onOpenChange={setOpenBulletType}
            />
            <Separator orientation="vertical" />

            <LinkSelector open={openLink} onOpenChange={setOpenLink} />

            <Separator orientation="vertical" />
            <TextButtons />
            <TextAlignSelector
              open={openTextAlign}
              onOpenChange={setOpenTextAlign}
            />
            <FontSizeSelector
              open={openFontSize}
              onOpenChange={setOpenFontSize}
            />
            <Separator orientation="vertical" />
            <ColorSelector open={openColor} onOpenChange={setOpenColor} />
          </GenerativeMenuSwitch>
        </EditorContent>
      </EditorRoot>
    </div>
  );
};
