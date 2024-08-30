import "../../styles/globals.css";
import "reactflow/dist/style.css";

import { Inter } from "next/font/google";

import AppShell from "@/components/custom/AppShell";
import { spaceGrotesk } from "@/utilities/font";
import LandingFooter from "@/components/custom/LandingFooter";
import AvatarUsage from "@/components/custom/AvatarUsage";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function ChildrenLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${spaceGrotesk.className} min-h-screen flex flex-col bg-[#13111C] text-white`}
    >
      <AppShell childrenTopBar={<AvatarUsage />}>{children}</AppShell>
      <LandingFooter />
    </div>
  );
}
