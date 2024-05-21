import type { Metadata } from "next";
import "../styles/globals.css";
import { Card } from "@/components/ui/card";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/custom/Navbar";
import { Inter } from "next/font/google";
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

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
    <html lang='en'>
      <ThemeProvider>
        <body
          className={`${inter.className} min-h-screen flex flex-col h-auto`}
        >
          <Navbar />
          <Card className='flex-1 border-none rounded-none flex h-auto'>
            {children}
          </Card>
        </body>
      </ThemeProvider>
    </html>
  );
}
