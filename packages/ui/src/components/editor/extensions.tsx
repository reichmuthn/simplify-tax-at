import {
  AIHighlight,
  HorizontalRule,
  StarterKit,
  TaskItem,
  TaskList,
  TiptapImage,
  UpdatedImage,
} from "novel/extensions";
import { TextAlign } from "@tiptap/extension-text-align";
import { UploadImagesPlugin } from "novel/plugins";

import { cx } from "class-variance-authority";
import { FontSize } from "@ui/components/editor/extensions/font-size";
import { EditorNodeFrame } from "@ui/components/editor/nodes/frame";
import { AdvancedLink } from "@ui/components/editor/extensions/advanced-link";
import { Placeholder } from "@tiptap/extension-placeholder";
import { ImageListItem } from "@ui/components/editor/extensions/image-list-item";
import { FlexBox } from "@ui/components/editor/nodes/flexBox";
import { Figure } from "@ui/components/editor/nodes/figure";
import { cn } from "@ui/lib/utils";
import { ImageFrame } from "@ui/components/editor/nodes/imageFrame";
import { QuestionGroup } from "@ui/components/editor/nodes/question-group";
import { CldVideo } from "@ui/components/editor/nodes/cld-video";

const aiHighlight = AIHighlight;
const placeholder = Placeholder.configure({
  placeholder: ({ editor, node }) => {
    if (node.type.name === "heading") {
      return `Überschrift ${node.attrs.level}`;
    }

    if (editor.isActive("imageFrame")) return "";

    return "Drücke '/' für Kommandos";
  },
  includeChildren: true,
});

const advancedLink = AdvancedLink;

const tiptapImage = TiptapImage.extend({
  addProseMirrorPlugins() {
    return [
      UploadImagesPlugin({
        imageClass: cx("opacity-40 rounded-lg border border-stone-200"),
      }),
    ];
  },
  addAttributes() {
    return {
      ...this.parent?.(),
      imageLink: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-image-link"),
        renderHTML: (attributes) => {
          return {
            "data-image-link": attributes.imageLink,
          };
        },
      },
      type: {
        default: "normal",
        parseHTML: (element) => element.getAttribute("data-type"),
        renderHTML: (attributes) => {
          return {
            "data-type": attributes.type,
            class: cn(
              (!attributes.type || attributes.type === "photo-frame") &&
                "p-2 bg-white md:-rotate-6 shadow-md",
              attributes.type === "normal" && "rounded",
            ),
          };
        },
      },
    };
  },
}).configure({
  allowBase64: true,
  HTMLAttributes: {
    class: cx("rounded-lg border border-muted"),
  },
});

const updatedImage = UpdatedImage.configure({
  HTMLAttributes: {
    class: cx("rounded-lg border border-muted"),
  },
});

const taskList = TaskList.configure({
  HTMLAttributes: {
    class: cx("not-prose pl-2 "),
  },
});
const taskItem = TaskItem.configure({
  HTMLAttributes: {
    class: cx("flex gap-2 items-start my-4"),
  },
  nested: true,
});

const horizontalRule = HorizontalRule.configure({
  HTMLAttributes: {
    class: cx("mt-4 mb-6 border-t border-muted-foreground"),
  },
});

const textAlign = TextAlign.configure({
  types: ["heading", "paragraph"],
});

const fontSize = FontSize;

const frame = EditorNodeFrame;

const imageListItem = ImageListItem;

const starterKit = StarterKit.configure({
  bulletList: {
    HTMLAttributes: {
      class: cx("list-disc list-outside leading-3 -mt-2"),
    },
  },
  orderedList: {
    HTMLAttributes: {
      class: cx("list-decimal list-outside leading-3 -mt-2"),
    },
  },
  listItem: false,
  blockquote: {
    HTMLAttributes: {
      class: cx(
        "border-l-4 border-appAccent bg-[#eef2fb] p-4 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
      ),
    },
  },
  codeBlock: {
    HTMLAttributes: {
      class: cx(
        "rounded-md bg-slate-200 text-display border p-5 font-mono font-medium",
      ),
    },
  },
  code: {
    HTMLAttributes: {
      class: cx(
        "rounded-md bg-slate-200 text-display px-1.5 py-1 font-mono font-medium",
      ),
      spellcheck: "false",
    },
  },
  horizontalRule: false,
  dropcursor: {
    color: "#DBEAFE",
    width: 4,
  },
  gapcursor: false,
});

const flexBox = FlexBox;
const figure = Figure;
const imageFrame = ImageFrame;
const questionGroup = QuestionGroup;
const cldVideo = CldVideo;

export const defaultExtensions = [
  starterKit,
  placeholder,
  tiptapImage,
  updatedImage,
  taskList,
  taskItem,
  horizontalRule,
  aiHighlight,
  fontSize,
  textAlign,
  frame,
  advancedLink,
  imageListItem,
  flexBox,
  figure,
  imageFrame,
  questionGroup,
  cldVideo,
];
