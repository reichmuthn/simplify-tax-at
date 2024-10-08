import { mergeAttributes, Node } from "@tiptap/core";

export interface QuestionGroupOptions {
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    questionGroup: {
      setQuestionGroup: (options: { questionGroupId: string }) => ReturnType;
    };
  }
}

export const QuestionGroup = Node.create<QuestionGroupOptions>({
  name: "questionGroup",

  group: "block",

  draggable: true,

  addOptions() {
    return {
      HTMLAttributes: {
        class: "w-full asm-question-group-embed",
      },
    };
  },

  addAttributes() {
    return {
      questionGroupId: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-question-group-id"),
        renderHTML: (attributes) => {
          return {
            "data-question-group-id": attributes.questionGroupId,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "div[data-question-group-id] iframe",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const embedUrl = `/embed/polls/${HTMLAttributes["data-question-group-id"]}`;

    return [
      "div",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      [
        "iframe",
        {
          src: embedUrl,
          class: "w-full",
          id: `asm-question-group-${HTMLAttributes["data-question-group-id"]}`,
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
      setQuestionGroup:
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
