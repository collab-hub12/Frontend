import type { Metadata } from "next";
import "../../styles/globals.css";
import "reactflow/dist/style.css";
import { Card } from "@/components/ui/card";
// import { ThemeProvider } from "@/components/theme-provider";
// import Navbar from "@/components/custom/Navbar";
import { Inter } from "next/font/google";
import Footer from "@/components/custom/Footer";
import AppShell from "@/components/custom/AppShell";
import { ThemeProvider } from "next-themes";
import { spaceGrotesk } from "@/utilities/font";
import LandingFooter from "@/components/custom/LandingFooter";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Collabhub",
  description: "Code.Create.Collaborate.",
};

export default function ChildrenLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <body
          className={`${spaceGrotesk.className} min-h-screen flex flex-col dark:bg-[#13111C]`}
        >
          <AppShell>{children}</AppShell>
        </body>
        <LandingFooter />
      </ThemeProvider>
    </html>
  );
}
