"use client";
import { ReactNode } from "react";
import Icon from "@/components/custom/Icon";
import Sidebar from "./sidebar/Sidebar";
import { ThemeToggle } from "./ThemeToggle";

const AppShell = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-screen min-h-screen flex-1 flex">
      <div className="flex flex-1">
        {/*------------------------Sidebar--------------------*/}
        <Sidebar logo="/images/icons/lucid-logo.svg" />

        {/*------------------------Sidebar Ends--------------------*/}
        <div className="flex flex-col flex-1">
          {/*------------------------Top Bar--------------------*/}
          <div className="px-[22px]   py-4 relative bg-navigation-navBackground border-[0.5px] dark:border-[#1E293B] flex items-center  text  text-center">
            {/* <Icon
              name="celo"
              size={22}
              className="stroke-text-secondary fill-text-secondary"
            /> */}
            <p className="font-bold text-xl text-text-secondary ml-3">Flint</p>

            <div className="absolute right-6">
              <ThemeToggle />
            </div>
          </div>
          {/*------------------------Top Bar Ends--------------------*/}

          {/*------------------------Page Container--------------------*/}
          <div className="flex-1 bg-interface-background">{children}</div>
          {/*------------------------Page Container Ends--------------------*/}
        </div>
      </div>
    </div>
  );
};

export default AppShell;
