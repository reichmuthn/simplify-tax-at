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
import { saveTag } from "@ui/entities/tags/forms/admin/actions";
import { ServerAlert } from "@ui/components/ui/alert";
import {
  CreateTagCommand,
  createTagCommandSchema,
} from "@app/entities/tags/commands/createTag/schemas";
import { toast } from "sonner";
import { AdminTagItem } from "@app/entities/tags/queries/getAdminTagItems/schemas";
import { PersonSelectField } from "@ui/entities/persons/fields/personSelectField/field";
import { TagGroupSelectField } from "@ui/entities/tagGroups/fields/tagGroupSelectField/field";

interface AdminTagItemFormProps {
  tag?: AdminTagItem;
  onClose?: () => void;
}

export function AdminTagItemForm({ tag, onClose }: AdminTagItemFormProps) {
  const [isPending, startTransition] = React.useTransition();

  const form = useForm<CreateTagCommand>({
    resolver: zodResolver(createTagCommandSchema),
    defaultValues: {
      title: tag?.title ?? undefined,
      tagGroup: tag?.tagGroup?.id ?? undefined,
    },
  });

  function onSubmit(values: CreateTagCommand) {
    startTransition(async () => {
      const toastId = toast.loading("Speichere...");

      const result = await saveTag(values, tag?.id);

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
        <FormField
          control={form.control}
          name="tagGroup"
          render={({ field }) => (
            <FormItem>
              <FormLabel>TagGroup</FormLabel>
              <FormControl>
                <TagGroupSelectField
                  maxSelected={1}
                  onChange={(values) => {
                    field.onChange(values[0]);
                  }}
                  defaultValue={
                    tag?.tagGroup
                      ? [
                          {
                            value: tag?.tagGroup?.id,
                            label: tag?.tagGroup?.title,
                          },
                        ]
                      : []
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div
          className={"bottom-0 left-0 right-0 sticky flex items-center gap-2"}
        >
          <Button type="submit" disabled={isPending}>
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
  );
}
