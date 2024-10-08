"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitContactFormCommand, submitContactFormSchema } from "./schemas";
import { submitContactForm } from "./actions";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/components/ui-app/form";
import { ServerAlert } from "@ui/components/ui/alert";
import { Input } from "@ui/components/ui-app/input";
import { Textarea } from "@ui/components/ui-app/textarea";
import { Button } from "@ui/components/ui-app/button";

export function ContactForm() {
  const form = useForm<SubmitContactFormCommand>({
    resolver: zodResolver(submitContactFormSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      eMail: "",
      message: "",
    },
  });

  const [isPending, startTransition] = React.useTransition();

  function onSubmit(values: SubmitContactFormCommand) {
    startTransition(async () => {
      const toastId = toast.loading("Sende...");
      try {
        await submitContactForm(values);
        toast.success("Senden erfolgreich.", { id: toastId });
        close();
      } catch (e: any) {
        toast.error("Senden fehlgeschlagen", { id: toastId });
        form.setError("root", {
          message: e?.message ?? "Fehler beim Absenden",
        });
      }
    });
  }

  if (form.formState.isSubmitSuccessful && !isPending)
    return (
      <div className="p-10 bg-white shadow relative mt-8">
        <div className="text-2xl font-semibold mb-6">
          Nachricht erfolgreich versendet!
        </div>
        <div className="text-lg mb-6">
          Wir haben deine Nachricht erhalten und bemühen uns um eine umgehende
          Bearbeitung.
        </div>
        <button
          onClick={() => form.reset()}
          className="h-10 p-2 text-sm bg-green-600 text-gray-50 flex items-center gap-2 relative rounded-md outline-none border-0 disabled:bg-opacity-80"
        >
          Weitere Nachricht senden
        </button>
      </div>
    );

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
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={"text-display"}>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={"text-display"}>Telefon</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="eMail"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={"text-display"}>E-Mail</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={"text-display"}>Nachricht</FormLabel>
              <FormControl>
                <Textarea className="resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-14 flex justify-center">
          <Button
            type="submit"
            disabled={isPending}
            className={"w-full"}
          >
            Formular absenden
          </Button>
        </div>
      </form>
    </Form>
  );
}
