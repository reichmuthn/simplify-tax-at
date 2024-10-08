export type SendTransactionalEmailCommand = {
  sender: {
    name?: string;
    email: string;
  };
  to: {
    email: string;
  }[];
  bcc?: {
    email: string;
  }[];
  cc?: {
    email: string;
  }[];
  htmlContent?: string;
  textContent?: string;
  subject?: string;
  replyTo?: {
    email: string;
    name?: string;
  };
  attachment?: {
    url: string;
    content: string;
    name: string;
  }[];
  headers?: {
    "X-Automatic-Platform-Mail"?: string;
  };
  templateId?: number;
  params?: { [key: string]: string | undefined };
  tags?: string[];
  scheduledAt?: string;
  batchId?: string;
};
