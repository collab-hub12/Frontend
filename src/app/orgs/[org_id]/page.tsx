import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { TeamsTable } from "@/components/custom/TeamsTable";
import { UserButton } from "@clerk/nextjs";

function Teams(): React.ReactNode {
  return (
    <div className="flex flex-col p-10 w-full">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-semibold">Minutes Live</h1>
        </div>
        <UserButton />
      </div>
      <TeamsTable />
    </div>
  );
}

export default Teams;