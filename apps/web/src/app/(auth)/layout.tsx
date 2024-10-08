import "@ui/globals.css";
import "@ui/prosemirror.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@ui/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@ui/components/ui/sonner";
import { TooltipProvider } from "@ui/components/ui/tooltip";
import { AuthProvider } from "@ui/views/dashboard/login/provider";

const asmFont = Inter({
  weight: "variable",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="de">
      <body
        className={cn(
          "dashboard-body min-h-screen bg-background font-sans antialiased",
          asmFont.variable,
        )}
      >
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TooltipProvider>{children}</TooltipProvider>
          </ThemeProvider>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
