import { ClerkProvider } from "@clerk/nextjs";
import { deDE } from "@clerk/localizations";
import { ReactNode } from "react";

export function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider
      localization={{
        ...deDE,
        userButton: {
          action__manageAccount: "Mein Dashboard",
          action__signOut: "Logout",
        },
      }}
      appearance={{
        layout: {
          logoPlacement: "inside",
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}
