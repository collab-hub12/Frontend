import Member from "@/components/custom/Member";
import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/session";
import { getTaskDetails } from "@/lib/task.query";
import { Task, User } from "@/utilities/types";
import dynamic from "next/dynamic";
import { Toaster } from "react-hot-toast";
import { ReactFlowProvider } from "reactflow";

const DynamicFlowComponent = dynamic(
  () => import("@/components/custom/DrawingComponent"),
  {
    ssr: false,
  }
);

const page = async ({
  params,
}: {
  params: { org_id: number; team_id: number; task_id: number };
}) => {
  const { org_id, team_id, task_id } = params;
  const data = await getSession({
    org_id,
    team_id,
  });
  const taskDetail = (await getTaskDetails(org_id, team_id, task_id)) as Task;

  return (
    <div className="flex flex-col w-full gap-6 h-50vh p-10">
      <div className="flex px-10 justify-between items-center bg-[#181622] py-4 rounded-md shadow-2xl drop-shadow-xl">
        <div className="flex flex-col">
          <h1 className="text-3xl font-semibold text-white text-white">
            {taskDetail.title.toUpperCase()}
          </h1>
        </div>
        <Button
          variant="outline"
          className="flex flex-row gap-1 border-[#52297A] text-[#BF93EC] hover:bg-[#52297A] hover:text-white"
        >
          {taskDetail.task_progress}
        </Button>
      </div>
      {/* Task Title */}

      <div className="flex flex-col gap-4">
        <div className="flex gap-4 items-center ">
          <span className="p-5 ml-auto">Assigned to :</span>
          <div className="flex -space-x-4 rtl:space-x-reverse">
            {taskDetail.assigned_to?.map((user) => (
              <img
                key={user.id}
                width={40}
                height={40}
                className="border-2 border-white rounded-full border-gray-800"
                src={user.picture}
                alt={user.name}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-10 items-center flex-col md:flex-row">
        <div className="flex flex-col gap-4 px-0 md:px-6 basis-[50%]">
          <h1 className="font-bold text-[20px]">DETAILS</h1>
          <div className="flex gap-8">
            <div className="flex gap-4 items-center">
              <div className="h-[50px] w-[60px] bg-[#9C9C9D] rounded-md"></div>
              <div className="flex flex-col gap-1">
                <p className="text-[12px] text-[#9C9C9D]">Task Manager</p>
                {/* Name of the task assigner */}
                <p className="text-[20px] font-bold">Bishakh Neogi</p>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <div className="h-[50px] w-[60px] bg-[#1967D2] rounded-md"></div>
              <div className="flex flex-col gap-1">
                <p className="text-[12px] text-[#9C9C9D]">Task Deadline</p>
                {/* Deadline of the task */}
                <p className="text-[20px] font-bold">
                  {taskDetail.task_deadline}
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-md border-dotted border-slate-800 border-2 p-6  gap-4 flex flex-col">
            <h1 className="font-bold text-[20px]">DESCRIPTION</h1>
            {/* Description of the task */}
            <h1 className="text-[14px] text-grey">{taskDetail.task_desc}</h1>
          </div>
        </div>
        <div className="flex basis-[100%] w-full md:basis-[50%] px-0 md:px-6">
          <Member org_id={params.org_id} team_id={params.team_id} />
        </div>
      </div>

      <div className="flex flex-col items-center ">
        <DynamicFlowComponent
          roomId={`room-${team_id}-task-${taskDetail.id}`}
          user={data as User}
          task_id={task_id}
          board_details={taskDetail.boardDetails!}
        />
        <Toaster position="bottom-left" reverseOrder={false} />
      </div>
    </div>
  );
};

export default page;
