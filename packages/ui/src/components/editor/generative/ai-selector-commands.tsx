import {
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@ui/components/ui/command";
import {
  ArrowDownWideNarrow,
  CheckCheck,
  RefreshCcwDot,
  StepForward,
  WrapText,
} from "lucide-react";
import { useEditor } from "novel";
import { getPrevText } from "novel/extensions";

const options = [
  {
    value: "improve",
    label: "Geschriebenes verbessern",
    icon: RefreshCcwDot,
  },

  {
    value: "fix",
    label: "Grammatik korrigieren",
    icon: CheckCheck,
  },
  {
    value: "shorter",
    label: "Kürzer machen",
    icon: ArrowDownWideNarrow,
  },
  {
    value: "longer",
    label: "Länger machen",
    icon: WrapText,
  },
];

interface AISelectorCommandsProps {
  onSelect: (value: string, option: string) => void;
}

const AISelectorCommands = ({ onSelect }: AISelectorCommandsProps) => {
  const { editor } = useEditor();
  if (!editor) return;
  return (
    <>
      <CommandGroup heading="Auswahl bearbeiten oder überprüfen">
        {options.map((option) => (
          <CommandItem
            onSelect={(value) => {
              const slice = editor.state.selection.content();
              const text = editor.storage.markdown.serializer.serialize(
                slice.content,
              );
              onSelect(text, value);
            }}
            className="flex gap-2 px-4"
            key={option.value}
            value={option.value}
          >
            <option.icon className="h-4 w-4 text-purple-500" />
            {option.label}
          </CommandItem>
        ))}
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="Nutze die AI, um mehr zu erreichen">
        <CommandItem
          onSelect={() => {
            const text = getPrevText(editor, { chars: 5000 });
            onSelect(text, "continue");
          }}
          value="continue"
          className="gap-2 px-4"
        >
          <StepForward className="h-4 w-4 text-purple-500" />
          Weiter schreiben
        </CommandItem>
      </CommandGroup>
    </>
  );
};

export { AISelectorCommands };
