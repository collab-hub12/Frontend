import KanbanBoard, { DNDType } from "@/components/custom/KanbanBoard";
import Member from "@/components/custom/Member";
import { getTaskDetails } from "@/lib/teams.query";
import { Toaster } from "react-hot-toast";

export default async function Teams({
  params,
}: {
  params: { org_id: number; team_name: string };
}) {
  const tasks = await getTaskDetails(params.org_id, params.team_name);

  return (
    <div className="flex flex-col p-5 w-full gap-4">
      <Toaster position="bottom-left" reverseOrder={false} />
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-semibold">{params.team_name}</h1>
        </div>
      </div>
      <div>
        <KanbanBoard
          data={tasks}
          org_id={params.org_id}
          team_name={params.team_name}
        />
      </div>
      <div>
        <Member />
      </div>
    </div>
  );
}
