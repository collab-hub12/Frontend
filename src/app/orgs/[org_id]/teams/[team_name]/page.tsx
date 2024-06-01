import { JoinedUser } from "@/components/custom/JoinedUser";
import KanbanBoard, { DNDType } from "@/components/custom/KanbanBoard";
import Member from "@/components/custom/Member";
import { getCurrentOrg, getMemberOfOrg } from "@/lib/orgs.query";
import { getSession } from "@/lib/session";
import {
  getMembersOfTeam,
  getTaskDetails,
  getTeamDetails,
} from "@/lib/teams.query";
import { User } from "@/utilities/types";
import { redirect } from "next/navigation";
import { Toaster } from "react-hot-toast";

export default async function Teams({
  params,
}: {
  params: { org_id: number; team_name: string };
}) {
  const { org_id, team_name } = params;
  const data = await getSession({
    org_id,
    team_name,
  });

  if (data?.statusCode === 401) {
    redirect("/");
  }

  if (data?.statusCode === 403) {
    return (
      <div className='flex m-10 w-full my-auto '>
        <h1 className='text-2xl text-center font-semibold'>
          User is not part of this team inside org
        </h1>
      </div>
    );
  }

  const [membersOfteam, tasks] = await Promise.all([
    getMembersOfTeam(org_id, team_name),
    getTaskDetails(org_id, team_name),
  ]);

  return (
    <div className='flex flex-col p-10 w-full'>
      <Toaster position='bottom-left' reverseOrder={false} />
      <div className='flex justify-between bg-[#1967D2] px-10 py-4 rounded-md shadow-2xl drop-shadow-xl'>
        <div className='flex flex-col'>
          <h1 className='text-3xl font-semibold dark:text-white text-white '>
            {team_name}
          </h1>
        </div>
      </div>

      <KanbanBoard data={tasks} org_id={org_id} team_name={team_name} />
      <div className='flex gap-4 w-full pt-6'>
        <div className='flex flex-col basis-[50%] w-full '>
          <h1 className="text-blue-500 text-2xl font-semibold ">Access to the user</h1>
          <JoinedUser data={membersOfteam as User[]} />
        </div>
        <div className='flex flex-col basis-[50%] w-full'>
        <h1 className="text-blue-500 text-2xl font-semibold ">Members in the organisation</h1>
        <Member org_id={org_id} />
        </div>
      </div>
    </div>
  );
}
