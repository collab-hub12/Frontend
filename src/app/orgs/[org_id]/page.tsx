import React from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getCurrentOrg, getMemberOfOrg } from "@/lib/orgs.query";
import { Org, Team, User } from "@/utilities/types";
import { getTeamDetails, getTeamsInsideOrg } from "@/lib/teams.query";
import { TeamsTable } from "@/components/custom/TeamsTable";
import { JoinedUser } from "@/components/custom/JoinedUser";
import Member from "@/components/custom/Member";
import { Toaster } from "react-hot-toast";
import { Building, MapPin } from "lucide-react";

export default async function Teams({
  params,
}: {
  params: { org_id: number };
}) {
  const { org_id } = params;
  const data = await getSession({ org_id });

  if (data?.statusCode === 401) {
    redirect("/");
  }
  // get current org detail & team details concurrently
  const [orgDetailResponse, teamDetailsResponse, memberDetailsOfOrg] =
    await Promise.all([
      getCurrentOrg(org_id),
      getTeamsInsideOrg(org_id),
      getMemberOfOrg(org_id),
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

  return (
    <div className="flex flex-col p-4 md:p-10 w-full">
      <Toaster position="bottom-left" reverseOrder={false} />
      <div className="flex  justify-between bg-[#181622] px-10 py-4 rounded-md shadow-2xl drop-shadow-xl w-full">
        <div className="flex  flex-col md:flex-row justify-between w-full">
          <h1 className="text-xl md:text-3xl font-semibold  text-white ">
            {(orgDetailResponse as Org)?.org_name.toUpperCase()}
          </h1>
          <div className="flex gap-2">
            <div className="px-6 rounded-md flex gap-2 items-center ">
              <Building color="#8491A4" />
              <h1 className="  text-[#8491A4] text-sm md:text-base">
                {(orgDetailResponse as Org)?.org_desc}
              </h1>
            </div>
            <div className="px-6 rounded-md flex gap-2 items-center ">
              <MapPin color="#8491A4" />
              <h1 className="text-sm md:text-base  text-[#8491A4]">
                {(orgDetailResponse as Org)?.location}
              </h1>
            </div>
          </div>
        </div>
      </div>
      <TeamsTable
        data={teamDetailsResponse as Team[]}
        org_id={params.org_id!}
      />
      <div className="flex flex-col md:flex-row gap-4 w-full pt-6">
        <div className="flex flex-col basis-[50%] w-full ">
          <h1 className="text-[#8491A4] text-2xl font-semibold ">
            Users with access
          </h1>
          <JoinedUser data={memberDetailsOfOrg as User[]} />
        </div>
        <div className="flex flex-col basis-[50%] w-full">
          <h1 className="text-[#BF93EC]  text-2xl font-semibold ">
            Users pool
          </h1>
          <Member />
        </div>
      </div>
    </div>
  );
}
