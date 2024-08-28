import React, { ComponentProps } from "react";
import SidebarSection from "./SidebarSection";
import Icon from "@/components/custom/Icon";
import { motion } from "framer-motion";

interface SidebarProps {
  logo: string;
}

type SidebarSection = {
  title: string;
  items: Array<{
    icon: ComponentProps<typeof Icon>["name"];
    label: string;
  }>;
};

const Sidebar: React.FC<SidebarProps> = ({ logo }) => {
  const sections: Array<SidebarSection> = [
    {
      title: "",
      items: [
        {
          icon: "home",
          label: "Home",
        },
      ],
    },
  ];

  return (
    <motion.nav
      onHoverStart={() => {}}
      className="group dark:border-[0.5px] dark:border-[#1E293B] dark:bg-[#181622] hover:delay-75 relative flex h-screen flex-col w-[125px] transition-[width] duration-500 hover:w-[294px] py-[22px] px-4 border border-interface-line"
    >
      <div className="relative h-[35px] mb-9 -ml-2">
        <div className="group/navItem absolute inset-y-0 left-1/2 -translate-x-1/2 p-2 flex  transition-all items-center duration-500  group-hover:w-full data-[active=true]:bg-red-200 w-9   hover:w-full rounded-lg group-hover:left-0 group-hover:translate-x-0">
          <Icon name="flame" size={33} className="shrink-0" />

          <div className="flex items-center h-full overflow-hidden ml-3">
            <p className="text-nowrap opacity-0 duration-500 text-[21px] font-semibold text-text-primary group-hover:opacity-100 ">
              Flint
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start flex-1 pb-[144px] no-scrollbar overflow-y-scroll">
        <div className="flex flex-col w-full gap-8">
          {sections.map((section, index) => (
            <SidebarSection
              key={index}
              title={section.title}
              items={section.items}
            />
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default Sidebar;