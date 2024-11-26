import "@/app/globals.css";
import { AuthProvider, QueryProvider, ThemeProvider } from "@/app/providers";
import { Header } from "@/components/header";
import { NextUIProvider } from "@nextui-org/react";
import type { Metadata } from "next";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "NerdIF 2024",
  description: "NerdIF 2024",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/logo.png" />
        </head>
        <QueryProvider>
          <ThemeProvider defaultTheme="system" attribute="class">
            <NextUIProvider>
              <body className="relative antialiased min-h-screen min-w-screen">
                <Header />
                {children}
                <Toaster theme="system" closeButton richColors />
              </body>
            </NextUIProvider>
          </ThemeProvider>
        </QueryProvider>
      </html>
    </AuthProvider>
  );
}
