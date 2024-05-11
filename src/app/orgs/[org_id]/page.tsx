import React from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { headers } from "next/headers";
import { parseUrlPath } from "@/utilities/parseUrl";
import { getCurrentOrg, getMemberOfOrg } from "@/lib/orgs.query";
import { Org, Team } from "@/utilities/types";
import { getTeamDetails } from "@/lib/teams.query";
import { TeamsTable } from "@/components/custom/TeamsTable";

export default async function Teams() {
  const headersList = headers();
  const pathname = headersList.get("x-pathname");
  const withRoles = parseUrlPath(pathname!);
  const data = await getSession(withRoles!);
  console.log(data);

  if (!data) {
    redirect("/");
  }
  // get current org detail & team details concurrently
  const [orgDetailResponse, teamDetailsResponse, memberDetailsOfOrg] =
    await Promise.all([
      getCurrentOrg(withRoles?.org_id!),
      getTeamDetails(withRoles?.org_id!),
      getMemberOfOrg(withRoles?.org_id!),
    ]);

  if (orgDetailResponse?.error === "Forbidden") {
    return (
      <div className="flex m-10 w-full my-auto ">
        <h1 className="text-2xl text-center font-semibold">
          User is not part of this org
        </h1>
      </div>
    );
  }

  // console.log(memberDetailsOfOrg);
  // const teamDetails = await getTeamDetails();
  return (
    <div className="flex flex-col p-10 w-full">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-semibold">
            {(orgDetailResponse as Org)?.org_name}
          </h1>
          <h1 className="text-xl font-semibold">
            {(orgDetailResponse as Org)?.org_desc}
          </h1>
          <h1 className="text-l font-semibold">
            - {(orgDetailResponse as Org)?.location}
          </h1>
        </div>
      </div>
      <TeamsTable
        data={teamDetailsResponse as Team[]}
        org_id={withRoles?.org_id!}
      />
    </div>
  );
}
