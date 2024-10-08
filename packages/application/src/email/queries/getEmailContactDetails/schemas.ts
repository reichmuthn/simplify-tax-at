export type EmailContactDetails = {
  email: string;
  id: number;
  emailBlacklisted: boolean;
  smsBlacklisted: boolean;
  createdAt: string;
  modifiedAt: string;
  attributes: { [key: string]: string };
  listIds: number[];
};
