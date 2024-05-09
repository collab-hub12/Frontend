import React from "react";
import { OrganisationTable } from "@/components/custom/OrganisationTable";

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
      </div>
      <OrganisationTable />
    </div>
  );
}
