import React from "react";
import { OrganisationTable } from "@/components/custom/OrganisationTable";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Org } from "@/utilities/types";
import { getOrgDetails } from "@/actions/org.action";

export default async function Orgs() {
  const data = await getSession();
  if (!data) {
    redirect("/");
  }
  const orgDetails = await getOrgDetails();

  return (
    <div className="flex flex-col p-10 w-full">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-semibold">Hello there {data?.name}!</h1>
          <p className="text-grey ">
            Here&apos;s the list of organisations you have joined
          </p>
        </div>
        <Image
          width="40"
          height="40"
          className="w-10 h-10 rounded-full"
          src={data?.picture}
          alt="Rounded avatar"
        />
      </div>
      <OrganisationTable data={orgDetails as Org[]} />
    </div>
  );
}
