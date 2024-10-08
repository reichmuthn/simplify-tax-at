export type CreateEmailTemplateCommand = {
  tag?: string;
  sender: {
    name: string;
    email: string;
  };
  templateName: string;
  htmlContent: string;
  subject: string;
  isActive: boolean;
};
