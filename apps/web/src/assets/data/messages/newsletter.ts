export const getNewsletterMessages = (tNewsletter: any) => {
  return {
    title: tNewsletter("title"),
    subtitle: tNewsletter("subtitle"),
    description: tNewsletter("description"),
    form: {
      firstName: {
        label: tNewsletter("Form.FirstName.label"),
        error: tNewsletter("Form.FirstName.error"),
      },
      lastName: {
        label: tNewsletter("Form.LastName.label"),
        error: tNewsletter("Form.LastName.error"),
      },
      eMail: {
        label: tNewsletter("Form.EMail.label"),
        error: tNewsletter("Form.EMail.error"),
      },
      button: tNewsletter("Form.button"),
      concent: tNewsletter("Form.concent"),
      concentLink: tNewsletter("Form.concentLink"),
      statusMessages: {
        submitSuccessful: {
          headline: "",
          message: ""
        },
        contactExists: {
          headline: "",
          message: ""
        },
        emailConfirmed: {
          headline: "",
          message: ""
        }
      }
    }
  };
}