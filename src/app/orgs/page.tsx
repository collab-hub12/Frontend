import React from "react";
import { OrganisationTable } from "@/components/custom/OrganisationTable";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { Org } from "@/utilities/types";
import { getOrgDetails } from "@/lib/orgs.query";
import { getUsers } from "@/lib/users.query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { JoinedUser } from "@/components/custom/JoinedUser";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Member } from "@/components/custom/Member";
export default async function Orgs() {
  const data = await getSession();
  if (!data) {
    redirect("/");
  }
  const [orgDetails, users] = await Promise.all([getOrgDetails(), getUsers()]);

  console.log(data);

  return (
    <div className='flex flex-col p-10 w-full'>
      <div className='flex justify-between'>
        <div className='flex flex-col'>
          <h1 className='text-3xl font-semibold'>Hello there {data?.name}!</h1>
          <p className='text-grey '>
            Here&apos;s the list of organisations you have joined
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
              <Avatar>
                <AvatarImage src={data?.picture} alt='ok' />
                <AvatarFallback>
                  {data?.name.substr(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56' align='end' forceMount>
            <DropdownMenuLabel className='font-normal'>
              <div className='flex flex-col space-y-1'>
                <p className='text-sm font-medium leading-none'>{data?.name}</p>
                <p className='text-xs leading-none text-muted-foreground'>
                  {data?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className='flex gap-4 w-full'>
        <div className='flex basis-[50%] w-full'>
          <JoinedUser />
        </div>
        <div className='flex flex-col basis-[50%] w-full'>
          <Member />
        </div>
      </div>
      <OrganisationTable data={orgDetails as Org[]} />
    </div>
  );
}
