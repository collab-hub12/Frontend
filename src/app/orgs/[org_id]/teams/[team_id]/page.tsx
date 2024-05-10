"use client";
import React from "react";
import Member from "@/components/custom/Member";
import KanbanBoard from "@/components/custom/KanbanBoard";
import { UserButton } from "@clerk/nextjs";
import { ProtectedRoute } from "@/components/protectedRoute";

function Work() {
  return (
    <div className="flex flex-col p-10 w-full gap-4">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-semibold">Frontend Team</h1>
        </div>
        <UserButton />
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

export default ProtectedRoute(Work);
