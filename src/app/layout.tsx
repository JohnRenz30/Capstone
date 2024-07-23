import type { Metadata } from "next";
import { Pangolin } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";

import ReactQueryProvider from "@/components/provider/ReactQueryProvider";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonny } from "@/components/ui/sonner";
import Navbar from "@/components/app/Navbar";
import { ThemeProvider } from "@/components/app/ThemeProvider";
import AuthProvider from "@/components/provider/AuthProvider";

const pangolin = Pangolin({ weight: ["400"], subsets: [] });

export const metadata: Metadata = {
  title: {
    default: "PRIMAleveling - Enjoy Learning, Learning to Enjoy",
    template: `%s - PRIMAleveling`,
  },
  description:
    "A web-based playground to level up the learnings and level-up the fun",
  keywords: [
    "PRIMAleveling",
    "PRIMAleveling fun",
    "PRIMAleveling games",
    "PRIMAleveling lesson",
    "PRIMAleveling grade 1",
    "PRIMAleveling grade 2",
    "PRIMAleveling materials",
  ],
  authors: [{ name: "TheUndoZ" }],
  openGraph: {
    type: "website",
    description:
      "A web-based playground to level up the learnings and level-up the fun",
    images: [""],
    url: "",
    title: "PRIMAleveling",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <TooltipProvider>
        <body
          className={cn(
            "min-h-screen h-full max-w-[100vw] w-screen overflow-x-hidden antialiased relative",
            pangolin.className
          )}
          id="voiceflow-widget-container"
        >
          <div className="relative w-full flex h-full">
            <ReactQueryProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
              >
                <AuthProvider>
                  <Navbar />
                  <NextTopLoader
                    color="#7c3bed"
                    shadow="0 0 10px #2299DD,0 0 5px #2299DD"
                    showSpinner={false}
                    // easing="ease"
                    // speed={200}
                  />

                  <main
                    className={cn(
                      "h-full min-h-screen flex flex-col relative w-full scrollbarGutterStable",

                      "bg-background bg-[linear-gradient(to_right,#766c8933_1px,transparent_1px),linear-gradient(to_bottom,#766c8933_1px,transparent_1px)] bg-[size:5rem_5rem]"
                    )}
                  >
                    {children}

                    <Toaster />
                    <Sonny />
                  </main>
                </AuthProvider>
              </ThemeProvider>
            </ReactQueryProvider>
          </div>
        </body>
      </TooltipProvider>
    </html>
  );
}
