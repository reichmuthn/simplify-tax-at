import { mergeAttributes, Node } from "@tiptap/core";

export interface FrameOptions {
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    frame: {
      setFrame: () => ReturnType;
      toggleFrame: () => ReturnType;
      unsetFrame: () => ReturnType;
      setFrameBorderColor: (color: string) => ReturnType;
      unsetFrameBorderColor: () => ReturnType;
      setFrameBackgroundColor: (color: string) => ReturnType;
      unsetFrameBackgroundColor: () => ReturnType;
    };
  }
}

export const EditorNodeFrame = Node.create<FrameOptions>({
  name: "frame",

  group: "block",

  content: "block+",

  draggable: true,

  defining: true,

  isolating: false,

  addOptions() {
    return {
      HTMLAttributes: {
        class:
          "w-full border-solid p-4 md:p-6 border-8 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
      },
    };
  },

  addAttributes() {
    return {
      frame: {
        default: "true",
        parseHTML: (element) => element.getAttribute("data-frame"),
        renderHTML: (attributes) => {
          return {
            "data-frame": attributes.frame,
          };
        },
      },
      frameBorderColor: {
        default: "hsl(var(--app-accent))",
        parseHTML: (element) => element.getAttribute("data-border-color"),
        renderHTML: (attributes) => {
          return {
            "data-border-color": attributes.frameBorderColor,
            style: `border-color: ${attributes.frameBorderColor}`,
          };
        },
      },
      frameBackgroundColor: {
        default: "hsl(var(--background))",
        parseHTML: (element) => element.getAttribute("data-background-color"),
        renderHTML: (attributes) => {
          return {
            "data-background-color": attributes.frameBackgroundColor,
            style: `background-color: ${attributes.frameBackgroundColor}`,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "div",
        getAttrs: (node) => (node as HTMLElement).getAttribute("data-frame") === "true" && null,
      },
    ];
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
      setFrame:
        () =>
        ({ commands }) => {
          return commands.wrapIn(this.name!);
        },
      toggleFrame:
        () =>
        ({ commands }) => {
          return commands.toggleWrap(this.name!);
        },
      unsetFrame:
        () =>
        ({ commands }) => {
          return commands.lift(this.name!);
        },
      setFrameBorderColor:
        (color) =>
        ({ chain }) => {
          return chain()
            .updateAttributes(this.name!, { frameBorderColor: color })
            .run();
        },
      unsetFrameBorderColor:
        () =>
        ({ chain }) => {
          return chain()
            .resetAttributes(this.name!, "frameBorderColor")
            .removeEmptyTextStyle()
            .run();
        },
      setFrameBackgroundColor:
        (color) =>
        ({ chain }) => {
          return chain()
            .updateAttributes(this.name!, { frameBackgroundColor: color })
            .run();
        },
      unsetFrameBackgroundColor:
        () =>
        ({ chain }) => {
          return chain()
            .resetAttributes(this.name!, "frameBackgroundColor")
            .removeEmptyTextStyle()
            .run();
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      "Mod-Shift-f": () => this.editor.commands.toggleFrame(),
    };
  },
});
