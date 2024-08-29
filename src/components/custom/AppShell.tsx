"use client";
import { ReactNode } from "react";
import Icon from "@/components/custom/Icon";
import Sidebar from "./sidebar/Sidebar";
import { ThemeToggle } from "./ThemeToggle";
import Image from "next/image";
import FlintLogo from "@/public/assets/FlintLogo.svg";
import useIsMobile from "@/hooks/useIsMobile";

const AppShell = ({
  children,
  childrenTopBar,
}: {
  children: ReactNode;
  childrenTopBar: ReactNode;
}) => {
  const isMobile = useIsMobile();
  return (
    <div className="w-screen min-h-screen flex-1 flex">
      <div className="flex flex-1">
        {/*------------------------Sidebar--------------------*/}
        <div className="hidden md:block">
          <Sidebar logo="/public/assets/flint_logo.svg" />
        </div>

        {/*------------------------Sidebar Ends--------------------*/}
        <div className="flex flex-col flex-1 ">
          {/*------------------------Top Bar--------------------*/}
          <div className="px-[22px]   py-4   border-[0.5px] dark:border-[#1E293B] flex items-center justify-between  text  text-center ">
            <Image src={FlintLogo} alt="Flint Logo" className="w-16 h-10" />

            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center justify-center">
                {childrenTopBar}
              </div>
              <div className="flex items-center justify-center">
                <ThemeToggle />
              </div>
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
