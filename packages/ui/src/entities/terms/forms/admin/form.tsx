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
import { saveTerm } from "@ui/entities/terms/forms/admin/actions";
import { ServerAlert } from "@ui/components/ui/alert";
import {
  CreateTermCommand,
  createTermCommandSchema,
} from "@app/entities/terms/commands/createTerm/schemas";
import { toast } from "sonner";
import { AdminTermItem } from "@app/entities/terms/queries/getAdminTermItems/schemas";
import { Textarea } from "@ui/components/ui/textarea";
import { TagSelectField } from "@ui/entities/tags/fields/tagSelectField/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui/components/ui/select";
import { StatusEnums } from "@app/enums/status/enum";
import { getStatusIcon } from "@ui/lib/utils";

interface AdminTermItemFormProps {
  term?: AdminTermItem;
  onClose?: () => void;
}

export function AdminTermItemForm({ term, onClose }: AdminTermItemFormProps) {
  const [isPending, startTransition] = React.useTransition();

  const form = useForm<CreateTermCommand>({
    resolver: zodResolver(createTermCommandSchema),
    defaultValues: {
      title: term?.title ?? undefined,
      description: term?.description ?? undefined,
      status: term?.status ?? StatusEnums.Draft,
      tags: term?.tags?.map((tag) => tag.id) ?? [],
    },
  });

  function onSubmit(values: CreateTermCommand) {
    startTransition(async () => {
      const toastId = toast.loading("Speichere...");

      const result = await saveTerm(values, term?.id);

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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Beschreibung</FormLabel>
              <FormControl>
                <Textarea className="resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(StatusEnums).map((x) => {
                    const Icon = getStatusIcon(x);

                    return (
                      <SelectItem key={x} value={x}>
                        <div className="flex w-[6.25rem] items-center">
                          <Icon
                            className="mr-2 size-4 text-muted-foreground"
                            aria-hidden="true"
                          />
                          <span className="capitalize">{x}</span>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <TagSelectField
                  tagGroupSlugs={["termcategories"]}
                  onChange={field.onChange}
                  defaultValue={
                    term?.tags?.map((x) => ({
                      value: x.id,
                      label: x.title,
                    })) ?? []
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
