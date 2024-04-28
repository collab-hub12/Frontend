import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { Usages } from "../../../public/assets";
import { TeamsTable } from "@/components/custom/TeamsTable";

export default function Teams() {
  return (
    <div className='flex flex-col p-10 w-full'>
      <div className='flex justify-between'>
        <div className='flex flex-col'>
          <h1 className='text-3xl font-semibold'>Minutes Live</h1>
        </div>
        <Avatar>
          <AvatarImage src={Usages.Avatar} alt='ok' />
          <AvatarFallback>BN</AvatarFallback>
        </Avatar>
      </div>
      <TeamsTable />
    </div>
  );
}
