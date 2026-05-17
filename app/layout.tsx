import type { Metadata } from "next";
import { Anton, Rubik_Glitch, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/providers/app-providers";

const headingFont = Anton({
  variable: "--font-heading",
  weight: "400",
  subsets: ["latin"],
});

const bodyFont = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
});

const countdownFont = Rubik_Glitch({
  variable: "--font-countdown",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "$BEASTSOL",
  description: "Born in the Cortex Vortex. Unleashed on pump.fun.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${headingFont.variable} ${bodyFont.variable} ${countdownFont.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-beast-void text-zinc-100 font-sans">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
