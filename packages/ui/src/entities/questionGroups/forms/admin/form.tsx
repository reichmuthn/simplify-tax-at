"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/components/ui/form";
import { Button } from "@ui/components/ui/button";
import { Input } from "@ui/components/ui/input";
import { saveQuestionGroup } from "@ui/entities/questionGroups/forms/admin/actions";
import { ServerAlert } from "@ui/components/ui/alert";
import {
  CreateQuestionGroupCommand,
  createQuestionGroupCommandSchema,
} from "@app/entities/questionGroups/commands/createQuestionGroup/schemas";
import { toast } from "sonner";
import { AdminQuestionGroupItem } from "@app/entities/questionGroups/queries/getAdminQuestionGroupItems/schemas";
import {
  AdminNestedQuestionForm,
  emptyQuestion,
} from "@ui/entities/questionGroups/forms/admin/questions";

interface AdminQuestionGroupItemFormProps {
  questionGroup?: AdminQuestionGroupItem;
  onClose?: () => void;
}

export function AdminQuestionGroupItemForm({
  questionGroup,
  onClose,
}: AdminQuestionGroupItemFormProps) {
  const [isPending, startTransition] = React.useTransition();

  const form = useForm<CreateQuestionGroupCommand>({
    resolver: zodResolver(createQuestionGroupCommandSchema),
    defaultValues: {
      title: questionGroup?.title ?? "",
      questions: questionGroup?.questions ?? [emptyQuestion],
    },
  });

  function onSubmit(values: CreateQuestionGroupCommand) {
    startTransition(async () => {
      const toastId = toast.loading("Speichere...");

      const result = await saveQuestionGroup(values, questionGroup?.id);

      if (result?.errors) {
        Object.keys(result?.errors).forEach((value) => {
          // @ts-ignore
          form.setError(value, { message: result.errors[value][0] });
        });
        toast.error("Speichern fehlgeschlagen.", { id: toastId });
      } else {
        toast.success("Speichern erfolgreich.", {
          id: toastId,
          action: {
            label: "Vorschau",
            onClick: () => console.log("Vorschau!"),
          },
        });
        onClose?.();
      }
    });
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 relative"
        >
          {form.formState.errors.root && (
            <ServerAlert message={form.formState.errors.root.message} />
          )}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Titel</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <AdminNestedQuestionForm />
          <div
            className={"bottom-0 left-0 right-0 sticky flex items-center gap-2"}
          >
            <Button onClick={form.handleSubmit(onSubmit)} disabled={isPending}>
              Speichern
            </Button>
            <Button
              variant={"secondary"}
              type={"button"}
              onClick={() => {
                onClose?.();
              }}
            >
              Abbrechen
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
