import Member from "@/components/custom/Member";
import { getTaskDetails } from "@/lib/task.query";
import { Task } from "@/utilities/types";
import { Toaster } from "react-hot-toast";

const page = async ({
  params,
}: {
  params: { org_id: number; team_name: string; task_id: number };
}) => {
  const { org_id, team_name, task_id } = params;
  const taskDetail = (await getTaskDetails(org_id, team_name, task_id)) as Task;

  return (
    <div className="flex flex-col p-10 w-full gap-6">
      {/* Task Title */}
      <Toaster position="bottom-left" reverseOrder={false} />

      <div className="flex flex-col gap-4">
        <div className="font-semibold text-[28px]">{taskDetail.title}</div>
        <div className="flex gap-4 items-center ">
          <div className="bg-[#EA4335] rounded-full w-[10px] h-[10px]"></div>
          <div className="text-[#b55bb0] font-medium text-[20px]">
            {taskDetail.task_progress}
          </div>
          <span className="p-5 ml-auto">Assigned to :</span>
          <div className="flex -space-x-4 rtl:space-x-reverse">
            {taskDetail.assigned_to?.map((user) => (
              <img
                key={user.id}
                width={40}
                height={40}
                className="border-2 border-white rounded-full dark:border-gray-800"
                src={user.picture}
                alt={user.name}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 px-6">
        <h1 className="font-bold text-[20px]">DETAILS</h1>
        <div className="flex gap-8">
          <div className="flex gap-4 items-center">
            <div className="h-[50px] w-[60px] bg-[#b55bb0] rounded-md"></div>
            <div className="flex flex-col gap-1">
              <p className="text-[12px] text-[#9C9C9D]">Task Manager</p>
              {/* Name of the task assigner */}
              <p className="text-[20px] font-bold">Bishakh Neogi</p>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <div className="h-[50px] w-[60px] bg-[#b55bb0] rounded-md"></div>
            <div className="flex flex-col gap-1">
              <p className="text-[12px] text-[#9C9C9D]">Task Deadline</p>
              {/* Deadline of the task */}
              <p className="text-[20px] font-bold">
                {taskDetail.task_deadline}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-md border-dotted dark:border-slate-800 border-2 p-6 w-[60%] gap-4 flex flex-col">
        <h1 className="font-bold text-[20px]">DESCRIPTION</h1>
        {/* Description of the task */}
        <h1 className="text-[14px] text-grey">{taskDetail.task_desc}</h1>
      </div>

      <Member org_id={params.org_id} team_name={params.team_name} />
    </div>
  );
};

export default page;
