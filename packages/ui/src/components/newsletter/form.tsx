"use client";
import {useForm} from "react-hook-form";
import {newsletterSignUp} from "./actions";
import {useSearchParams} from "next/navigation";
import {zodResolver} from "@hookform/resolvers/zod";
import React from "react";
import {
  CreateEmailContactCommand,
  createEmailContactCommandSchema,
} from "@app/email/commands/createEmailContact/schemas";
import {Input} from "@ui/components/ui/input";
import {toast} from "sonner";
import {newsletterMessages, NewsletterThankYou,} from "@ui/components/newsletter/thankYou";
import {NewsletterViewProps} from "@ui/components/newsletter/view";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@ui/components/ui-app/form";
import {Button} from "@ui/components/ui-app/button";

export function NewsletterForm({messages}: NewsletterViewProps) {
  const searchParams = useSearchParams();

  const isEmailConfirmed = searchParams.has("doi");

  const [isPending, startTransition] = React.useTransition();

  const form = useForm<CreateEmailContactCommand>({
    resolver: zodResolver(createEmailContactCommandSchema),
    defaultValues: {
      listId: "2",
      firstName: "",
      lastName: "",
      eMail: "",
    },
  });

  function onSubmit(values: CreateEmailContactCommand) {
    startTransition(async () => {
      const toastId = toast.loading("Anmelden...");
      const result = await newsletterSignUp(values);

      if (result === "CONTACT_EXISTS") {
        form.setError("root.contactExists", {
          message: "Kontakt existiert bereits!",
        });
        toast.error("Anmelden fehlgeschlagen.", {id: toastId});
      } else {
        toast.success("Anmelden erfolgreich.", {id: toastId});
      }
    });
  }

  if (isEmailConfirmed) {
    const firstName = searchParams.get("firstName");
    const lastName = searchParams.get("lastName");

    return (
      <NewsletterThankYou
        {...newsletterMessages.emailConfirmed}
        headline={`Danke ${firstName} ${lastName}!`}
      />
    );
  }

  if (form.formState.errors.root?.contactExists && !isPending) {
    return (
      <NewsletterThankYou
        {...newsletterMessages.contactExists}
        reset={form.reset}
      />
    );
  }

  if (form.formState.isSubmitSuccessful && !isPending) {
    return (
      <NewsletterThankYou
        {...newsletterMessages.submitSuccessful}
        reset={form.reset}
      />
    );
  }

  console.log(form.formState);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-8">
          <div className="space-y-4 relative">
            <div className={"grid grid-cols-2 gap-x-4"}>
              <FormField
                control={form.control}
                name="firstName"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>{messages.form.firstName.label}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>{messages.form.lastName.label}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="eMail"
              render={({field}) => (
                <FormItem>
                  <FormLabel>{messages.form.eMail.label}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2 sm:space-y-3">
            <Button
              type="submit"
              size="sm"
              disabled={isPending}
              className={"w-full"}
            >
              {messages.form.button}
            </Button>
            <div className="text-left text-xs text-body tracking-tight">
              {messages.form.concent}&nbsp;
              <a
                href={"/simplify-tax-datenschutzerklärung-für-klienten-2018.pdf"}
                target="_blank"
                className="hover:underline"
              >
                {messages.form.concentLink}
              </a>
              .
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
