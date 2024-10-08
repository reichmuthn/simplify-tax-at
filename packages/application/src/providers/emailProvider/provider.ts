export const brevoEmailProvider = {
  baseUrl: "https://api.brevo.com/v3",
  defaultHeaders: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "API-Key": process.env.BREVO_API_KEY ?? "",
  },
};
