import { mergeAttributes, Node, nodeInputRule } from "@tiptap/core";
import { cn } from "@ui/lib/utils";

export interface FigureOptions {
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    figure: {
      /**
       * Add a figure element
       */
      setFigure: (options: { src: string; alt?: string }) => ReturnType;

      updateFigureImage: (options: { src: string; alt?: string }) => ReturnType;

      toggleFigure: () => ReturnType;

      /**
       * Converts an image to a figure
       */
      imageToFigure: () => ReturnType;

      /**
       * Converts a figure to an image
       */
      figureToImage: () => ReturnType;
    };
  }
}

export const inputRegex = /!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\)/;

export const Figure = Node.create<FigureOptions>({
  name: "figure",

  addOptions() {
    return {
      HTMLAttributes: {
        class: "w-full flex flex-col md:flex-row gap-2 items-center mt-6",
      },
    };
  },

  group: "block",

  content: "block+",

  draggable: true,

  addAttributes() {
    return {
      src: {
        default: null,
        parseHTML: (element) =>
          element.querySelector("img")?.getAttribute("src"),
      },

      alt: {
        default: null,
        parseHTML: (element) =>
          element.querySelector("img")?.getAttribute("alt"),
      },

      title: {
        default: null,
        parseHTML: (element) =>
          element.querySelector("img")?.getAttribute("title"),
      },

      width: {
        default: null,
        parseHTML: (element) =>
          element.querySelector("img")?.getAttribute("width"),
      },

      height: {
        default: null,
        parseHTML: (element) =>
          element.querySelector("img")?.getAttribute("height"),
      },

      figureImageStyle: {
        default: "photo-frame",
        parseHTML: (element) => element.getAttribute("data-image-style"),
        renderHTML: (attributes) => {
          return {
            "data-image-style": attributes.figureImageStyle,
            class: cn(
              (!attributes.figureImageStyle ||
                attributes.figureImageStyle === "photo-frame") &&
                "p-2 bg-white md:-rotate-6 shadow-md",
              attributes.figureImageStyle === "normal" && "rounded",
            ),
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "figure",
        contentElement: "figcaption",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "figure",
      this.options.HTMLAttributes,
      [
        "img",
        mergeAttributes(HTMLAttributes, {
          src: HTMLAttributes.src,
          class: "w-full md:w-1/3 shrink-0",
        }),
      ],
      [
        "figcaption",
        {
          class:
            "w-full border-gray-300 border-dashed border [&>p:first-child]:mt-0 [&>p:last-child]:mb-0 [&>ul]:mb-0",
        },
        0,
      ],
    ];
  },

  addCommands() {
    return {
      setFigure:
        ({ ...attrs }) =>
        ({ chain }) => {
          return (
            chain()
              .insertContent({
                type: this.name,
                attrs,
                content: [
                  {
                    type: "paragraph",
                    content: [],
                  },
                ],
              })
              //set cursor at end of caption field
              .command(({ tr, commands }) => {
                const { doc, selection } = tr;
                const position = doc.resolve(selection.to - 1).end();

                return commands.setTextSelection(position);
              })
              .run()
          );
        },
    };
  },

  addInputRules() {
    return [
      nodeInputRule({
        find: inputRegex,
        type: this.type,
        getAttributes: (match) => {
          const [, src, alt, title] = match;

          return { src, alt, title };
        },
      }),
    ];
  },
});
