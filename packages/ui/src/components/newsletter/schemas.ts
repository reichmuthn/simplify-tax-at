export type NewsletterFormMessages = {
  title: string;
  subtitle: string;
  description: string;
  form: {
    firstName: {
      label: string;
      error: string;
    },
    lastName: {
      label: string;
      error: string;
    },
    eMail: {
      label: string;
      error: string;
    },
    button: string;
    concent: string;
    concentLink: string;
    statusMessages: {
      submitSuccessful: {
        headline: string,
        message: string
      },
      contactExists: {
        headline: string,
        message: string
      },
      emailConfirmed: {
        headline: string,
        message: string
      }
    },
  },
}