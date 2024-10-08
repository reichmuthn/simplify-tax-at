import { mergeAttributes, Node } from "@tiptap/core";

export interface FlexBoxOptions {
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    flexbox: {
      setFlexBox: () => ReturnType;
      toggleFlexBox: () => ReturnType;
      unsetFlexBox: () => ReturnType;
    };
  }
}

const FlexBox = Node.create<FlexBoxOptions>({
  name: "flexbox",

  group: "block",

  content: "block+",

  draggable: true,

  isolating: false,

  defining: true,

  addOptions() {
    return {
      HTMLAttributes: {
        class:
          "w-full flex [&>*]:mt-0 [&>*]:mb-0 gap-4 items-center flex-wrap border-gray-300 border border-dashed divide-gray-300 divide-x divide-dashed",
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
      setFlexBox:
        () =>
        ({ commands }) => {
          return commands.wrapIn(this.name!);
        },
      toggleFlexBox:
        () =>
        ({ commands }) => {
          return commands.toggleWrap(this.name!);
        },
      unsetFlexBox:
        () =>
        ({ commands }) => {
          return commands.lift(this.name!);
        },
    };
  },
});
export { FlexBox };
