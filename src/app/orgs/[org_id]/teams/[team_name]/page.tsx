import { JoinedUser } from "@/components/custom/JoinedUser";
import KanbanBoard, { DNDType } from "@/components/custom/KanbanBoard";
import Member from "@/components/custom/Member";
import { getCurrentOrg, getMemberOfOrg } from "@/lib/orgs.query";
import { getSession } from "@/lib/session";
import { getTaskDetails, getTeamDetails } from "@/lib/teams.query";
import { User } from "@/utilities/types";
import { redirect } from "next/navigation";
import { Toaster } from "react-hot-toast";

export default async function Teams({
  params,
}: {
  params: { org_id: number; team_name: string };
}) {
  const tasks = await getTaskDetails(params.org_id, params.team_name);
  const data = await getSession({ org_id: params.org_id });

  if (!data) {
    redirect("/");
  }
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
  return (
    <div className='flex flex-col p-10 w-full'>
      <Toaster position='bottom-left' reverseOrder={false} />
      <div className='flex justify-between bg-[#205BF1] px-10 py-4 rounded-md shadow-2xl drop-shadow-xl'>
        <div className='flex flex-col'>
          <h1 className='text-3xl font-semibold dark:text-white text-white '>
            {params.team_name}
          </h1>
        </div>
      </div>

      <KanbanBoard
        data={tasks}
        org_id={params.org_id}
        team_name={params.team_name}
      />

      {/* <Member /> */}
      <JoinedUser data={memberDetailsOfOrg as User[]} />
    </div>
  );
}
