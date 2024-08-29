import React from "react";
import { OrganisationTable } from "@/components/custom/OrganisationTable";
import { getCookieValue, getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { Org } from "@/utilities/types";
import { getOrgDetails } from "@/lib/orgs.query";
import { getUsers } from "@/lib/users.query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LogoutHandler } from "@/actions/auth.action";
import { spaceGrotesk } from "@/utilities/font";
export default async function Orgs() {
  const data = await getSession();
  if (data?.statusCode === 401) {
    redirect("/");
  }
  const [orgDetails, users] = await Promise.all([getOrgDetails(), getUsers()]);

  return (
    <div
      className={` ${spaceGrotesk.className} flex flex-col p-6 md:p-10 w-full !dark:bg-[#13111C]`}
    >
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-lg md:text-3xl font-semibold">
            Hello there, &nbsp;
            <span
              className={` ${spaceGrotesk.className} bg-clip-text text-center text-xl font-black font-sans text-transparent bg-gradient-to-r from-[#C6BEE5] via-[#7B89D4] to-[#C6BEE5] md:text-4xl`}
            >
              {data?.name}
            </span>
          </h1>
          <p className="text-grey text-xs md:text-base">
            Here&apos;s the list of organisations you have joined
          </p>
        </div>
      </div>
      <OrganisationTable data={orgDetails as Org[]} />
    </div>
  );
}
