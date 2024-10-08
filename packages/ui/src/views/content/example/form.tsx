"use client";
import React from "react";
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
import { ServerAlert } from "@ui/components/ui/alert";
import { toast } from "sonner";
import { saveContent } from "@ui/views/content/example/actions";
import { Textarea } from "@ui/components/ui/textarea";

interface ExampleContentFormProps {
  key: string;
  content?: string;
  onClose?: () => void;
}

export function ExampleContentForm({
  key,
  content,
  onClose,
}: ExampleContentFormProps) {
  const [isPending, startTransition] = React.useTransition();

  const form = useForm({
    //resolver: zodResolver(createPostCommandSchema),
    defaultValues: {
      content: content,
    },
  });

  function onSubmit(values: { content?: string }) {
    startTransition(async () => {
      const toastId = toast.loading("Speichere...");

      const result = await saveContent(values.content ?? "", key);

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
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Zusammenfassung</FormLabel>
              <FormControl>
                <Textarea className="resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/*<FormField*/}
        {/*  control={form.control}*/}
        {/*  name="content"*/}
        {/*  render={({ field }) => (*/}
        {/*    <FormItem>*/}
        {/*      <FormLabel>Inhalt</FormLabel>*/}
        {/*      <FormControl>*/}
        {/*        <AdvancedEditor*/}
        {/*          onChange={field.onChange}*/}
        {/*          defaultValue={field.value ?? null}*/}
        {/*        />*/}
        {/*      </FormControl>*/}
        {/*      <FormMessage />*/}
        {/*    </FormItem>*/}
        {/*  )}*/}
        {/*/>*/}
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
