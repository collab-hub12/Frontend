import type { Metadata } from "next";
import "../styles/globals.css";
import { Card } from "@/components/ui/card";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/custom/Navbar";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <ThemeProvider>
        <body>
          <Navbar />
          <Card className='min-h-screen border-none rounded-none flex'>
            {children}
          </Card>
        </body>
      </ThemeProvider>
    </html>
  );
}
