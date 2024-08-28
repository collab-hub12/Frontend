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
      className={` ${spaceGrotesk.className} flex flex-col p-4 md:p-10 w-full`}
    >
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-lg md:text-3xl font-semibold">
            Hello there, &nbsp;
            <span
              className={` ${spaceGrotesk.className} bg-clip-text text-center text-3xl font-black font-sans text-transparent bg-gradient-to-r from-[#C6BEE5] via-[#7B89D4] to-[#C6BEE5] md:text-4xl`}
            >
              {data?.name}
            </span>
          </h1>
          <p className="text-grey text-xs md:text-base">
            Here&apos;s the list of organisations you have joined
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar>
                <AvatarImage src={data?.picture} alt="ok" />
                <AvatarFallback>
                  {data?.name.substr(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{data?.name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {data?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <form action={LogoutHandler}>
                <button type="submit">Logout</button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <OrganisationTable data={orgDetails as Org[]} />
    </div>
  );
}
