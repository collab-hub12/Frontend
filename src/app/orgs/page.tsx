import React from "react";
import { OrganisationTable } from "@/components/custom/OrganisationTable";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { Org } from "@/utilities/types";
import { getOrgDetails } from "@/lib/orgs.query";
import { getUsers } from "@/lib/users.query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export default async function Orgs() {
  const data = await getSession();
  if (!data) {
    redirect("/");
  }
  const [orgDetails, users] = await Promise.all([getOrgDetails(), getUsers()]);

  console.log(data);

  return (
    <div className="flex flex-col p-10 w-full">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-semibold">Hello there {data?.name}!</h1>
          <p className="text-grey ">
            Here&apos;s the list of organisations you have joined
          </p>
        </div>
        <Avatar>
          <AvatarImage src={data?.picture} alt="ok" />
          <AvatarFallback>
            {data?.name.substr(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
      <OrganisationTable data={orgDetails as Org[]} />
    </div>
  );
}
