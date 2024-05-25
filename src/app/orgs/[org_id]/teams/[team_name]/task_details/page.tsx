export default async function TaskDetails() {
  return (
    <div className='flex flex-col p-10 w-full gap-6'>
      {/* Task Title */}
      <div className='flex flex-col gap-4'>
        <div className='font-semibold text-[28px]'>Changes in UI</div>
        <div className='flex gap-4 items-center '>
          <div className='bg-[#EA4335] rounded-full w-[10px] h-[10px]'></div>
          <div className='text-[#205BF1] font-medium text-[20px]'>
            In Review
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-4 px-6'>
        <h1 className='font-bold text-[20px]'>DETAILS</h1>
        <div className='flex gap-8'>
          <div className='flex gap-4 items-center'>
            <div className='h-[50px] w-[60px] bg-[#205BF1] rounded-md'></div>
            <div className='flex flex-col gap-1'>
              <p className='text-[12px] text-[#9C9C9D]'>Task Manager</p>
              {/* Name of the task assigner */}
              <p className='text-[20px] font-bold'>Bishakh Neogi</p>
            </div>
          </div>
          <div className='flex gap-4 items-center'>
            <div className='h-[50px] w-[60px] bg-[#205BF1] rounded-md'></div>
            <div className='flex flex-col gap-1'>
              <p className='text-[12px] text-[#9C9C9D]'>Task Deadline</p>
              {/* Deadline of the task */}
              <p className='text-[20px] font-bold'>28/05/2024</p>
            </div>
          </div>
        </div>
      </div>
      <div className='rounded-md border-dotted dark:border-slate-800 border-2 p-6 w-[60%] gap-4 flex flex-col'>
        <h1 className='font-bold text-[20px]'>DESCRIPTION</h1>
        {/* Description of the task */}
        <h1 className='text-[14px] text-grey'>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </h1>
      </div>
    </div>
  );
}
