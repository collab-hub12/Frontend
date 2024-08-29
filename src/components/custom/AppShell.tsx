"use client";
import { ReactNode } from "react";
import Icon from "@/components/custom/Icon";
import Sidebar from "./sidebar/Sidebar";
import { ThemeToggle } from "./ThemeToggle";
import Image from "next/image";
import FlintLogo from "@/public/assets/FlintLogo.svg";
import useIsMobile from "@/hooks/useIsMobile";

const AppShell = ({ children }: { children: ReactNode }) => {
  const isMobile = useIsMobile();
  return (
    <div className="w-screen min-h-screen flex-1 flex">
      <div className="flex flex-1">
        {/*------------------------Sidebar--------------------*/}
        {!isMobile && <Sidebar logo="/public/assets/flint_logo.svg" />}

        {/*------------------------Sidebar Ends--------------------*/}
        <div className="flex flex-col flex-1">
          {/*------------------------Top Bar--------------------*/}
          <div className="px-[22px]   py-4 relative  border-[0.5px] dark:border-[#1E293B] flex items-center  text  text-center">
            {/* <Icon
              name="celo"
              size={22}
              className="stroke-text-secondary fill-text-secondary"
            /> */}
            {/* <p className="font-bold text-xl text-text-secondary ml-3">Flint</p> */}
            <Image src={FlintLogo} alt="Flint Logo" className="w-16 h-10" />

            <div className="absolute right-6">
              <ThemeToggle />
            </div>
          </div>
          {/*------------------------Top Bar Ends--------------------*/}

          {/*------------------------Page Container--------------------*/}
          <div className="w-screen md:flex-1 md:w-auto">{children}</div>
          {/*------------------------Page Container Ends--------------------*/}
        </div>
      </div>
    </div>
  );
};

export default AppShell;
