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
import { Key } from "react";
import { Toaster } from "react-hot-toast";

export default async function Teams({
  params,
}: {
  params: { org_id: number; team_id: number };
}) {
  const { org_id, team_id } = params;
  const data = await getSession({
    org_id,
    team_id,
  });

  if (data?.statusCode === 401) {
    redirect("/");
  }

  if (data?.statusCode === 403) {
    return (
      <div className="flex m-10 w-full my-auto ">
        <h1 className="text-2xl text-center font-semibold">
          User is not part of this team inside org
        </h1>
      </div>
    );
  }

  const [teamMemberDetailsWithTeam, tasks] = await Promise.all([
    getMembersOfTeam(org_id, team_id),
    getTaskDetails(org_id, team_id),
  ]);

  if (!teamMemberDetailsWithTeam) {
    return (
      <div className="flex m-10 w-full my-auto ">
        <h1 className="text-2xl text-center font-semibold">
          Error occured while fetching team member details
        </h1>
      </div>
    );
  }

  if (!tasks) {
    return (
      <div className="flex m-10 w-full my-auto ">
        <h1 className="text-2xl text-center font-semibold">
          Error occured while fetching task details
        </h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-10 w-full">
      <Toaster position="bottom-left" reverseOrder={false} />
      <div className="flex justify-between items-center bg-[#181622] px-10 py-4 rounded-md shadow-2xl drop-shadow-xl">
        <div className="flex flex-col">
          <h1 className="text-3xl font-semibold text-white ">
            {teamMemberDetailsWithTeam.name.toUpperCase()}
          </h1>
        </div>
        <div className="flex -space-x-4 rtl:space-x-reverse">
          {teamMemberDetailsWithTeam.users?.map(
            (user: {
              id: Key | null | undefined;
              picture: string | undefined;
              name: string | undefined;
            }) => (
              <img
                key={user.id}
                width={40}
                height={40}
                className="border-2 rounded-full border-gray-800"
                src={user.picture}
                alt={user.name}
              />
            )
          )}
        </div>
      </div>

      <KanbanBoard data={tasks} org_id={org_id} team_id={team_id} />
      <div className="flex gap-4 w-full pt-6 flex-col md:flex-row">
        <div className="flex flex-col basis-[50%] w-full ">
          <h1 className="text-[#8491A4] text-[#8491A4] text-2xl font-semibold ">
            Access to the user
          </h1>
          <JoinedUser data={teamMemberDetailsWithTeam?.users as User[]} />
        </div>
        <div className="flex flex-col basis-[50%] w-full">
          <h1 className="text-[#8491A4] text-[#8491A4] text-2xl font-semibold ">
            Members in the organisation
          </h1>
          <Member org_id={org_id} />
        </div>
      </div>
    </div>
  );
}
