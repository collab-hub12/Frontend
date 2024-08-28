import type { Metadata } from "next";
import "../styles/globals.css";
import "reactflow/dist/style.css";
import { Card } from "@/components/ui/card";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "Collabhub",
  description: "Code.Create.Collaborate.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`min-h-screen flex flex-col h-auto`}>{children}</body>
    </html>
  );
}
