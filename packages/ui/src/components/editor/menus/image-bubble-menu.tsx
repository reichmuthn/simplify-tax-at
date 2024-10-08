import { EditorBubble, useEditor } from "novel";
import { type ReactNode } from "react";

interface ImageBubbleMenuProps {
  children: ReactNode;
}

const ImageBubbleMenu = ({ children }: ImageBubbleMenuProps) => {
  const { editor } = useEditor();

  if (!editor) return;

  return (
    <EditorBubble
      shouldShow={({ editor }) => {
        return (
          editor.isEditable &&
          (editor.isActive("image") || editor.isActive("figure"))
        );
      }}
      className="flex w-fit max-w-[90vw] overflow-hidden rounded-md border border-muted bg-background shadow-xl"
    >
      {children}
    </EditorBubble>
  );
};

export { ImageBubbleMenu };
