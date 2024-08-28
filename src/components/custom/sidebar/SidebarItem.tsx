"use client";
import React, { ComponentProps } from "react";
import Icon from "@/components/custom/Icon";

interface SidebarItemProps {
  icon: ComponentProps<typeof Icon>["name"];
  label: string;
  isAccount?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  isAccount = false,
}) => {
  return (
    <div className="relative h-9">
      <div className="group/navItem delay-0 absolute inset-y-0 left-1/2 -translate-x-1/2 p-2 flex transition-[transform,width,left] duration-500  items-center stroke-uiColors-neutrals-blue-gray cursor-pointer fill-uiColors-neutrals-blue-gray hover:stroke-company-blue hover:fill-company-blue data-[active=true]:stroke-company-blue data-[active=true]:fill-company-blue group-hover:w-full data-[active=true]:bg-navigation-navItemBackSelected w-9  hover:bg-navigation-navItemBackSelected hover:w-full rounded-lg group-hover:left-0 group-hover:translate-x-0">
        <Icon name={icon} size={20} className="shrink-0" />

        <div className="flex items-center justify-between w-full h-full overflow-hidden ml-3">
          <p className="text-nowrap opacity-0 transition-opacity duration-500 text-base font-medium leading-[13.2px] text-text-secondary group-hover:opacity-100 group-hover/navItem:text-company-blue group-data-[active=true]/navItem:text-company-blue">
            {label}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SidebarItem;
