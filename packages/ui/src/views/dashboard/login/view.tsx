import {SignIn} from "@clerk/nextjs";
import React from "react";
import Link from "next/link";

export function DashboardLoginView() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link
            href="#"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 md:h-8 md:w-8"
          >
            <img
              className="block h-6 w-6 dark:invert dark:saturate-0"
              src={"/icons/icon-72x72.png"}
              alt="Logo"
            />
            <span className="sr-only">Simplify Tax</span>
          </Link>
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 overflow-x-auto">
          <div className={"w-full max-w-4xl mx-auto py-6 sm:py-12 md:py-24"}>
            <SignIn
              path="/login"
              routing="path"
              fallbackRedirectUrl={`/admin`}
              appearance={{
                elements: {
                  rootBox: "w-full",
                  cardBox: "w-full",
                  logoBox: "h-16",
                  main: "max-w-2xl w-full mx-auto",
                  card: "w-full shadow-none rounded",
                  formButtonPrimary:
                    "bg-appPrimary hover:bg-appPrimary rounded text-sm normal-case text-white",
                  formFieldInput:
                    "rounded bg-gray-100 border-none focus:ring-appPrimary",
                  footer: "hidden",
                },
              }}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
