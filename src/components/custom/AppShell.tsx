"use client";
import { ReactNode, useState, useEffect } from "react";
import Sidebar from "./sidebar/Sidebar";
import Image from "next/image";
import FlintLogo from "@/public/assets/FlintLogo.svg";

const AppShell = ({
  children,
  childrenTopBar,
}: {
  children: ReactNode;
  childrenTopBar: ReactNode;
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="w-screen min-h-screen flex-1 flex bg-[#13111C]">
      <div className="flex flex-1">
        {/*------------------------Sidebar--------------------*/}
        {isMounted && (
          <div className="hidden md:block">
            <Sidebar logo="/public/assets/flint_logo.svg" />
          </div>
        )}

        {/*------------------------Sidebar Ends--------------------*/}
        <div className="flex flex-col flex-1 ">
          {/*------------------------Top Bar--------------------*/}
          <div className="px-[22px]   py-4   border-[0.5px] border-[#1E293B] flex items-center justify-between  text  text-center ">
            <Image src={FlintLogo} alt="Flint Logo" className="w-16 h-10" />

            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center justify-center">
                {childrenTopBar}
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
