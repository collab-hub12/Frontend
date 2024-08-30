import type { Metadata } from "next";
import "../styles/globals.css";
import "reactflow/dist/style.css";

export const metadata: Metadata = {
  title: "Flint",
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
