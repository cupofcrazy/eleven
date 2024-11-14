import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { Header } from "@/components/header";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import { ActionBar } from "@/components/ui/action-bar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MARQ",
  description: "MARQ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Header />
          <main>{children}</main>
          <ActionBar />
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
