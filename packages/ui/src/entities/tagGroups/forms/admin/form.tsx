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
import { saveTagGroup } from "@ui/entities/tagGroups/forms/admin/actions";
import { ServerAlert } from "@ui/components/ui/alert";
import {
  CreateTagGroupCommand,
  createTagGroupCommandSchema,
} from "@app/entities/tagGroups/commands/createTagGroup/schemas";
import { toast } from "sonner";
import { AdminTagGroupItem } from "@app/entities/tagGroups/queries/getAdminTagGroupItems/schemas";

interface AdminTagGroupItemFormProps {
  tagGroup?: AdminTagGroupItem;
  onClose?: () => void;
}

export function AdminTagGroupItemForm({
  tagGroup,
  onClose,
}: AdminTagGroupItemFormProps) {
  const [isPending, startTransition] = React.useTransition();

  const form = useForm<CreateTagGroupCommand>({
    resolver: zodResolver(createTagGroupCommandSchema),
    defaultValues: {
      title: tagGroup?.title ?? undefined,
      tags: [],
    },
  });

  function onSubmit(values: CreateTagGroupCommand) {
    startTransition(async () => {
      const toastId = toast.loading("Speichere...");

      const result = await saveTagGroup(values, tagGroup?.id);

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
