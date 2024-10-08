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
import { savePerson } from "@ui/entities/persons/forms/admin/actions";
import { ServerAlert } from "@ui/components/ui/alert";
import {
  CreatePersonCommand,
  createPersonCommandSchema,
} from "@app/entities/persons/commands/createPerson/schemas";
import { toast } from "sonner";
import { AdminPersonItem } from "@app/entities/persons/queries/getAdminPersonItems/schemas";
import { ImageSelectField } from "@ui/assets/images/fields/imageSelectField/field";
import { Textarea } from "@ui/components/ui/textarea";

interface AdminPersonItemFormProps {
  person?: AdminPersonItem;
  onClose?: () => void;
}

export function AdminPersonItemForm({
  person,
  onClose,
}: AdminPersonItemFormProps) {
  const [isPending, startTransition] = React.useTransition();

  const form = useForm<CreatePersonCommand>({
    resolver: zodResolver(createPersonCommandSchema),
    defaultValues: {
      title: person?.title ?? undefined,
      image: person?.image ?? undefined,
      position: person?.position ?? undefined,
      socialLinks: person?.socialLinks ?? undefined,
      description: person?.description ?? undefined,
    },
  });

  function onSubmit(values: CreatePersonCommand) {
    startTransition(async () => {
      const toastId = toast.loading("Speichere...");

      const result = await savePerson(values, person?.id);

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
        <div className={"grid grid-cols-[1fr,_100px] gap-2"}>
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
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bild</FormLabel>
                <FormControl>
                  <ImageSelectField
                    folder={"persons"}
                    defaultValue={field.value}
                    onChange={field.onChange}
                    maxSelected={1}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="socialLinks"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Soziale Links</FormLabel>
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
