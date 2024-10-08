import * as z from "zod";

export const submitMultiStepFormSchema = z.object({
  firstName: z.string().min(1, "Der Vorname darf nicht leer sein"),
  lastName: z.string().min(1, "Der Nachname darf nicht leer sein"),
  eMail: z
    .string()
    .min(1, "Die E-Mail-Adresse darf nicht leer sein")
    .email("Bitte geben Sie eine gülte E-Mail-Adresse an"),
  phone: z.string().min(1, "Die Rufnummer darf nicht leer sein"),
  date: z.date(),
  time: z.string(),
  appointmentType: z.string(),
  additionalInfos: z.string().optional(),
});

export type SubmitMultiStepFormCommand = z.infer<typeof submitMultiStepFormSchema>;

export type MultiStepFormMessages = {
  form: {
    firstName: {
      label: string;
      error: string,
    },
    lastName: {
      label: string,
      error: string,
    },
    eMail: {
      label: string,
      error: string,
    },
    phone: {
      label: string,
      error: string,
    },
    appointmentType: {
      label: string,
      placeholder: string,
      options: string[],
      error: string,
    },
    additionalInfos: {
      label: string,
      description: string,
      error: string,
    },
    button: {
      ghost: {
        label: string
      },
      appPrimary: {
        label: string
      }
    },
    date: {
      label: string,
    },
    time: {
      label: string,
      timeFormat: string,
    },
    appointmentDetails: {
      label: string,
    },
    contactDetails: {
      label: string,
    }
    concent: string,
    concentLink: string,
    optional: string,
  },
  statusMessages: {
    submitSuccessful: {
      headline: string,
      message: string,
      button: string,
    }
  },
}