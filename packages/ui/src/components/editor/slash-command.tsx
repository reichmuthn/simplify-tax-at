import {
  CheckSquare,
  Code,
  Columns3Icon,
  FrameIcon,
  Heading1,
  Heading2,
  Heading3,
  ImageIcon,
  ImagePlusIcon,
  List,
  ListOrdered,
  MessageCircleQuestionIcon,
  TextIcon,
  TextQuote,
  VideoIcon,
} from "lucide-react";
import { Command, createSuggestionItems, renderItems } from "novel/extensions";

export const suggestionItems = createSuggestionItems([
  {
    title: "Text",
    description: "Erstelle einen Paragraph.",
    searchTerms: ["p", "paragraph"],
    icon: <TextIcon size={18} />,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .toggleNode("paragraph", "paragraph")
        .run();
    },
  },
  {
    title: "To-do List",
    description: "Track tasks with a to-do list.",
    searchTerms: ["todo", "task", "list", "check", "checkbox"],
    icon: <CheckSquare size={18} />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleTaskList().run();
    },
  },
  {
    title: "Überschrift 1",
    description: "Große Überschrift.",
    searchTerms: ["h1"],
    icon: <Heading1 size={18} />,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 1 })
        .run();
    },
  },
  {
    title: "Überschrift 2",
    description: "Mittlere Überschrift.",
    searchTerms: ["h2"],
    icon: <Heading2 size={18} />,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 2 })
        .run();
    },
  },
  {
    title: "Überschrift 3",
    description: "Kleine Überschrift.",
    searchTerms: ["h3"],
    icon: <Heading3 size={18} />,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 3 })
        .run();
    },
  },
  {
    title: "Aufzählung",
    description: "Erstelle eine Aufzählungsliste.",
    searchTerms: ["bullet", "list"],
    icon: <List size={18} />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run();
    },
  },
  {
    title: "Nummerierung",
    description: "Erstelle eine nummerierte Liste.",
    searchTerms: ["numbered", "list"],
    icon: <ListOrdered size={18} />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleOrderedList().run();
    },
  },
  {
    title: "Zitat",
    description: "Erstelle ein Zitat.",
    searchTerms: ["quote"],
    icon: <TextQuote size={18} />,
    command: ({ editor, range }) =>
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .toggleNode("paragraph", "paragraph")
        .toggleBlockquote()
        .run(),
  },
  {
    title: "Code",
    description: "Erfasse ein Code-Snippet.",
    searchTerms: ["codeblock"],
    icon: <Code size={18} />,
    command: ({ editor, range }) =>
      editor.chain().focus().deleteRange(range).toggleCodeBlock().run(),
  },
  {
    title: "Rahmen",
    description: "Erstelle einen Rahmen.",
    searchTerms: ["frame"],
    icon: <FrameIcon size={18} />,
    command: ({ editor, range }) =>
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .toggleNode("paragraph", "paragraph")
        .toggleFrame()
        .run(),
  },
  {
    title: "Spalten",
    description: "Erstelle ein Spalten Layout.",
    searchTerms: ["layout"],
    icon: <Columns3Icon size={18} />,
    command: ({ editor, range }) =>
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .toggleNode("paragraph", "paragraph")
        .toggleFlexBox()
        .run(),
  },
  {
    title: "Bild",
    description: "Lade ein Bild hoch.",
    searchTerms: ["photo", "picture", "media"],
    icon: <ImageIcon size={18} />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).run();
      editor.commands.setImage({
        src: "https://res.cloudinary.com/angelstone/image/upload/v1715206697/asm-dashboard/editor/Placeholder_Image.jpg",
        alt: "Bild",
      });
    },
  },
  {
    title: "Bild mit Text",
    description: "Erstelle ein Bild mit Text.",
    searchTerms: ["imagetext"],
    icon: <ImagePlusIcon size={18} />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setImageFrame().run();
    },
  },
  {
    title: "Umfrage",
    description: "Bette eine Umfrage ein.",
    searchTerms: ["poll", "question"],
    icon: <MessageCircleQuestionIcon size={18} />,
    command: ({ editor, range }) => {
      const questionGroupId = prompt("Question group ID eingeben");

      if (questionGroupId) {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setQuestionGroup({
            questionGroupId,
          })
          .run();
      }
    },
  },
  {
    title: "Video",
    description: "Lade ein Video hoch.",
    searchTerms: ["video"],
    icon: <VideoIcon size={18} />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).run();
      const width = prompt("Breite");
      const height = prompt("Höhe");
      const publicId = prompt("PublicId");

      editor.commands.setCldVideo({
        publicId: publicId!,
        width: parseInt(width!),
        height: parseInt(height!),
      });
    },
  },
]);

export const slashCommand = Command.configure({
  suggestion: {
    items: () => suggestionItems,
    render: renderItems,
  },
});
