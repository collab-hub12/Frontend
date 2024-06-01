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
export default async function Orgs() {
  const data = await getSession();
  if (data?.statusCode === 401) {
    redirect("/");
  }
  const [orgDetails, users] = await Promise.all([getOrgDetails(), getUsers()]);

  return (
    <div className="flex flex-col p-10 w-full">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-semibold">Hello there, 
          <span className="text-blue-400 pl-1 text-[40px]">
             {data?.name}
            </span>
            </h1>
          <p className="text-grey ">
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
