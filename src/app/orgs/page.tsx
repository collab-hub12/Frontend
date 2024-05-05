import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { Usages } from "../../../public/assets";
import { OrganisationTable } from "@/components/custom/OrganisationTable";
import { UserButton } from "@clerk/nextjs";

export default function Orgs() {
  return (
    <div className="flex flex-col p-10 w-full">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-semibold">Hello there Bishakh!</h1>
          <p className="text-grey ">
            Here&apos;s the list of organisations you have joined
          </p>
        </div>
        <UserButton />
      </div>
      <OrganisationTable />
    </div>
  );
}
