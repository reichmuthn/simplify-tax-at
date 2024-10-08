import { mergeAttributes, Node } from "@tiptap/core";

export interface CldVideoOptions {
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    cldVideo: {
      setCldVideo: (options: {
        publicId: string;
        width: number;
        height: number;
      }) => ReturnType;
    };
  }
}

export const CldVideo = Node.create<CldVideoOptions>({
  name: "cldVideo",

  group: "block",

  draggable: true,

  addOptions() {
    return {
      HTMLAttributes: {
        class: "w-full asm-cld-video-embed",
      },
    };
  },

  addAttributes() {
    return {
      publicId: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-public-id"),
        renderHTML: (attributes) => {
          return {
            "data-public-id": attributes.publicId,
          };
        },
      },
      width: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-width"),
        renderHTML: (attributes) => {
          return {
            "data-width": attributes.width,
          };
        },
      },
      height: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-height"),
        renderHTML: (attributes) => {
          return {
            "data-height": attributes.height,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "div[data-public-id] iframe",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const embedUrl = `/embed/cld-video?width=${HTMLAttributes["data-width"]}&height=${HTMLAttributes["data-height"]}&publicId=${HTMLAttributes["data-public-id"]}`;

    const id = HTMLAttributes["data-public-id"]
      ?.replaceAll("/", "-")
      ?.replaceAll(".", "-");

    return [
      "div",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      [
        "iframe",
        {
          src: embedUrl,
          class: "w-full",
          id: `asm-cld-video-${id}`,
        },
      ],
      [
        "script",
        {
          src: "/js/embed.js",
        },
      ],
    ];
  },

  addCommands() {
    return {
      setCldVideo:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },
});
