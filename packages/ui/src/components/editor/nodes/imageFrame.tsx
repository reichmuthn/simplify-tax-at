import { mergeAttributes, Node } from "@tiptap/core";

export interface ImageFrameOptions {
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    imageFrame: {
      setImageFrame: () => ReturnType;
      toggleImageFrame: () => ReturnType;
      unsetImageFrame: () => ReturnType;
    };
  }
}

const ImageFrame = Node.create<ImageFrameOptions>({
  name: "imageFrame",

  group: "block",

  content: "image block+",

  draggable: true,

  isolating: false,

  defining: false,

  addOptions() {
    return {
      HTMLAttributes: {
        class:
          "w-full flex [&>*]:mt-0 [&>*]:mb-0 flex flex-col md:flex-row gap-2 items-center mt-6 [&>img]:w-full [&>img]:md:w-1/3 shrink-0",
      },
    };
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },
  addCommands() {
    return {
      setImageFrame:
        () =>
        ({ commands }) => {
          return commands.insertContent({
            type: "imageFrame",
            content: [
              {
                type: "image",
                attrs: {
                  type: "photo-frame",
                  src: "https://res.cloudinary.com/angelstone/image/upload/v1715206697/asm-dashboard/editor/Placeholder_Image.jpg",
                  alt: "Bild",
                },
              },
              {
                type: "frame",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text: "Bild mit Text",
                      },
                    ],
                  },
                ],
              },
            ],
          });
        },
    };
  },
  addKeyboardShortcuts() {
    return {
      Enter: ({ editor }) => {
        const { state } = editor;
        const { selection } = state;
        const { $from, empty } = selection;

        if (!empty || $from.parent.type !== this.type) {
          return false;
        }

        const isAtEnd = $from.parentOffset === $from.parent.nodeSize - 2;
        const endsWithDoubleNewline = $from.parent.textContent.endsWith("\n\n");

        if (!isAtEnd || !endsWithDoubleNewline) {
          return false;
        }

        return editor
          .chain()
          .command(({ tr }) => {
            tr.delete($from.pos - 2, $from.pos);

            return true;
          })
          .exitCode()
          .run();
      },
    };
  },
});
export { ImageFrame };
