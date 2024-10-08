import { ListItem } from "@tiptap/extension-list-item";
import { mergeAttributes } from "@tiptap/core";

export const ImageListItem = ListItem.extend({
  HTMLAttributes: {
    class: "leading-normal -mb-2",
  },
  addAttributes() {
    return {
      ...this.parent?.(),
      imgSrc: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-imgsrc"),
        renderHTML: (attributes) => {
          return {
            "data-imgsrc": attributes.imgSrc,
          };
        },
      },
    };
  },
  renderHTML({ HTMLAttributes }) {
    if (HTMLAttributes["data-imgsrc"])
      return [
        "li",
        mergeAttributes(this.options.HTMLAttributes, {
          class: "leading-normal flex gap-2 items-start not-prose py-1.5 line",
        }),
        ["img", { class: "w-5 h-5 -ml-5", src: HTMLAttributes["data-imgsrc"] }],
        ["div", 0],
      ];

    return [
      "li",
      mergeAttributes(this.options.HTMLAttributes, {
        class: "leading-normal -mb-2",
      }),
      0,
    ];
  },
});
