"use client";

import { Command, CommandList } from "@ui/components/ui/command";

import { useCompletion } from "ai/react";
import { ArrowUp } from "lucide-react";
import { useEditor } from "novel";
import { addAIHighlight } from "novel/extensions";
import { useState } from "react";
import Markdown from "react-markdown";
import { toast } from "sonner";
import { Button } from "@ui/components/ui/button";
import { CrazySpinner } from "../icons/crazy-spinner";
import { Magic } from "../icons/magic";
import { ScrollArea } from "@ui/components/ui/scroll-area";
import { AICompletionCommands } from "./ai-completion-command";
import { AISelectorCommands } from "./ai-selector-commands";
import { AiCommandInput } from "@ui/components/editor/generative/ai-selector-command-input";

interface AISelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AISelector({ onOpenChange }: AISelectorProps) {
  const { editor } = useEditor();
  if (!editor) return;
  const [inputValue, setInputValue] = useState("");

  const { completion, complete, isLoading } = useCompletion({
    // id: "novel",
    api: "/api/generate",
    onResponse: (response) => {
      if (response.status === 429) {
        toast.error("You have reached your request limit for the day.");
        return;
      }
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  const hasCompletion = completion.length > 0;

  return (
    <Command className="w-[350px]">
      <CommandList>
        {hasCompletion && (
          <div className="flex max-h-[400px]">
            <ScrollArea>
              <div className="prose p-2 px-4 prose-sm">
                <Markdown>{completion}</Markdown>
              </div>
            </ScrollArea>
          </div>
        )}

        {isLoading && (
          <div className="flex h-12 w-full items-center px-4 text-sm font-medium text-muted-foreground text-purple-500">
            <Magic className="mr-2 h-4 w-4 shrink-0  " />
            AI schreibt
            <div className="ml-2 mt-1">
              <CrazySpinner />
            </div>
          </div>
        )}
        {!isLoading && (
          <>
            <div className="relative">
              <AiCommandInput
                value={inputValue}
                onValueChange={setInputValue}
                autoFocus
                placeholder={
                  hasCompletion
                    ? "Was soll als nächstes getan werden?"
                    : "Was soll editiert werden..."
                }
                onFocus={() => addAIHighlight(editor)}
              />
              <Button
                size="icon"
                className="absolute right-2 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-purple-500 hover:bg-purple-900"
                onClick={() => {
                  if (completion)
                    return complete(completion, {
                      body: { option: "zap", command: inputValue },
                    }).then(() => setInputValue(""));

                  const slice = editor.state.selection.content();
                  const text = editor.storage.markdown.serializer.serialize(
                    slice.content,
                  );

                  complete(text, {
                    body: { option: "zap", command: inputValue },
                  }).then(() => setInputValue(""));
                }}
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
            </div>
            {hasCompletion ? (
              <AICompletionCommands
                onDiscard={() => {
                  editor.chain().unsetHighlight().focus().run();
                  onOpenChange(false);
                }}
                completion={completion}
              />
            ) : (
              <AISelectorCommands
                onSelect={(value, option) =>
                  complete(value, { body: { option } })
                }
              />
            )}
          </>
        )}
      </CommandList>
    </Command>
  );
}
