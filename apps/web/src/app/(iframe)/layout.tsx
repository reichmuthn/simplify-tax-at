import {Metadata, Viewport} from "next";
import "@ui/globals.css";
import React from "react";
import Script from "next/script";
import {cn} from "@ui/lib/utils";
import {Montserrat} from "next/font/google";
import {sharedRootMetadata} from "@/assets/data/sharedMetadata";
import {Analytics} from "@vercel/analytics/react";
import {TooltipProvider} from "@ui/components/ui/tooltip";
import {Toaster} from "@ui/components/ui/sonner";
import {SpeedInsights} from "@vercel/speed-insights/next";

const asmFont = Montserrat({weight: "variable", subsets: ['latin'], display: "swap", variable: "--font-sans"});

export const viewport: Viewport = {
  themeColor: "#0f172a",
};

export const metadata: Metadata = sharedRootMetadata;

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
    <body
      className={cn(
        "app-body min-h-screen font-sans antialiased",
        asmFont.variable,
      )}
    >
    <Script src="/js/iframeResizer.contentWindow.min.js"/>
    <TooltipProvider>
      <main className="min-h-screen">{children}</main>
      <Toaster/>
    </TooltipProvider>
    <Analytics/>
    <SpeedInsights/>
    </body>
    </html>
  );
}
