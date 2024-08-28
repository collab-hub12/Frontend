"use client";
import React, { ComponentProps } from "react";
import SidebarItem from "@/components/custom/sidebar/SidebarItem";
import Icon from "@/components/custom/Icon";

interface SidebarSectionProps {
  title: string;
  items: Array<{ icon: ComponentProps<typeof Icon>["name"]; label: string }>;
  isAccount?: boolean;
}

const SidebarSection: React.FC<SidebarSectionProps> = ({
  title,
  items,
  isAccount = false,
}) => {
  return (
    <section className="flex flex-col gap-4 ">
      <div className="relative h-[14px] w-full ">
        <h2 className="text-xs absolute left-[46px] w-fit   group-hover:delay-0 -translate-x-1/2 transition-all group-hover:translate-x-0 duration-500 group-hover:left-0  text-text-secondary inset-y-0  font-semibold tracking-wide leading-[13.2px]">
          {title}
        </h2>
      </div>
      <div className="flex flex-col gap-2 relative">
        {items.map((item, index) => (
          <SidebarItem
            isAccount={isAccount}
            key={index}
            icon={item.icon}
            label={item.label}
          />
        ))}
      </div>
    </section>
  );
};

export default SidebarSection;
