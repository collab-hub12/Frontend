"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { Usages } from "../../../public/assets";
import Member from "@/components/custom/Member";
import KanbanBoard from "@/components/custom/KanbanBoard";

export default function Work() {
  return (
    <div className='flex flex-col p-10 w-full gap-4'>
      <div className='flex justify-between'>
        <div className='flex flex-col'>
          <h1 className='text-3xl font-semibold'>Frontend Team</h1>
        </div>
        <Avatar>
          <AvatarImage src={Usages.Avatar} alt='ok' />
          <AvatarFallback>BN</AvatarFallback>
        </Avatar>
      </div>
      <div>
        <Member />
      </div>
      <div>
        <KanbanBoard />
      </div>
    </div>
  );
}
