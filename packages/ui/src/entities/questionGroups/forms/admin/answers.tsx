import { useFieldArray, useFormContext } from "react-hook-form";
import { Label } from "@ui/components/ui/label";
import { Button } from "@ui/components/ui/button";
import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/components/ui/form";
import { Input } from "@ui/components/ui/input";
import { XIcon } from "lucide-react";
import { Card, CardContent } from "@ui/components/ui/card";
import { deleteAnswer } from "@ui/entities/questionGroups/forms/admin/actions";
import { toast } from "sonner";

type AdminNestedAnswerFormProps = {
  questionIndex: number;
};

export const emptyAnswer = {
  id: "",
  title: "",
};

export function AdminNestedAnswerForm({
  questionIndex,
}: AdminNestedAnswerFormProps) {
  const [isPending, startTransition] = React.useTransition();

  const form = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: `questions.${questionIndex}.answers`,
  });

  function removeAnswer(id: string, index: number) {
    if (id) {
      startTransition(async () => {
        const toastId = toast.loading("Lösche...");

        const result = await deleteAnswer(id);

        if (result?.errors) {
          Object.keys(result?.errors).forEach((value) => {
            // @ts-ignore
            form.setError(value, { message: result.errors[value][0] });
          });
          toast.error("Löschen fehlgeschlagen.", { id: toastId });
        } else {
          toast.success("Löschen erfolgreich.", {
            id: toastId,
            action: {
              label: "Vorschau",
              onClick: () => console.log("Vorschau!"),
            },
          });
          remove(index);
        }
      });
    } else {
      remove(index);
    }
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Label htmlFor="answer-1">Antworten</Label>
        <Button
          className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          size="sm"
          type="button"
          variant="ghost"
          onClick={() => append(emptyAnswer)}
        >
          + Antwort hinzufügen
        </Button>
      </div>
      {fields.length > 0 && (
        <Card>
          <CardContent className={"py-6 space-y-4"}>
            {fields.map((arrayField, index) => (
              <div className={"flex gap-2 items-end"} key={arrayField.id}>
                <FormField
                  control={form.control}
                  name={`questions.${questionIndex}.answers.${index}.title`}
                  render={({ field }) => (
                    <FormItem className={"flex-1"}>
                      <FormLabel>Titel</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  variant={"secondary"}
                  type={"button"}
                  disabled={isPending}
                  onClick={() =>
                    removeAnswer(
                      form.getValues(
                        `questions.${questionIndex}.answers.${index}.id`,
                      ),
                      index,
                    )
                  }
                >
                  <XIcon className={"w-4 h-4"} />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </>
  );
}
