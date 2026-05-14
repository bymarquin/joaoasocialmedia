import type { Metadata } from "next";
import LenisProvider from "@/components/providers/lenis-provider";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";

const headingFont = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
});

const bodyFont = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "J.A Videomaker | Portfólio",
  description: "Estrutura base em Next.js para o portfólio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${headingFont.variable} ${bodyFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-950">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
