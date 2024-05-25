import React from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getCurrentOrg, getMemberOfOrg } from "@/lib/orgs.query";
import { Org, Team, User } from "@/utilities/types";
import { getTeamDetails } from "@/lib/teams.query";
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
  const data = await getSession({ org_id: params.org_id });

  if (!data) {
    redirect("/");
  }
  // get current org detail & team details concurrently
  const [orgDetailResponse, teamDetailsResponse, memberDetailsOfOrg] =
    await Promise.all([
      getCurrentOrg(params.org_id),
      getTeamDetails(params.org_id),
      getMemberOfOrg(params.org_id),
    ]);

  if (orgDetailResponse?.error === "Forbidden") {
    return (
      <div className='flex m-10 w-full my-auto '>
        <h1 className='text-2xl text-center font-semibold'>
          User is not part of this org
        </h1>
      </div>
    );
  }

  // console.log(memberDetailsOfOrg);
  // const teamDetails = await getTeamDetails();
  return (
    <div className='flex flex-col p-10 w-full'>
      <Toaster position='bottom-left' reverseOrder={false} />
      <div className='flex justify-between bg-[#205BF1] px-10 py-4 rounded-md shadow-2xl drop-shadow-xl w-full'>
        <div className='flex justify-between w-full'>
          <h1 className='text-3xl font-semibold dark:text-white text-white '>
            {(orgDetailResponse as Org)?.org_name}
          </h1>
          <div className='flex gap-2'>
            <div className='px-6 rounded-md flex gap-2 items-center bg-white'>
              <Building color='#205BF1' />
              <h1 className='text-base  dark:text-[#205BF1] text-[#205BF1]'>
                {(orgDetailResponse as Org)?.org_desc}
              </h1>
            </div>
            <div className='px-6 rounded-md flex gap-2 items-center bg-white'>
              <MapPin color='#205BF1' />
              <h1 className='text-base  dark:text-[#205BF1] text-[#205BF1]'>
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
      <div className='flex gap-4 w-full'>
        <div className='flex basis-[50%] w-full'>
          <JoinedUser data={memberDetailsOfOrg as User[]} />
        </div>
        <div className='flex flex-col basis-[50%] w-full'>
          <Member />
        </div>
      </div>
    </div>
  );
}
