import * as z from "zod";

export const submitContactFormSchema = z.object({
  fullName: z.string().min(1, "Der Name darf nicht leer sein"),
  eMail: z
    .string()
    .min(1, "Die E-Mail Adresse darf nicht leer sein")
    .email("Bitte geben Sie eine gülte E-Mail Adresse an"),
  phone: z.string().optional(),
  message: z.string().min(1, "Die Nachricht darf nicht leer sein"),
});

export type SubmitContactFormCommand = z.infer<typeof submitContactFormSchema>;
