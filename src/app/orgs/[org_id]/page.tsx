import React from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { headers } from "next/headers";
import { parseUrlPath } from "@/utilities/parseUrl";

export default async function Teams() {
  const headersList = headers();
  const pathname = headersList.get("x-pathname");
  if (!pathname) redirect("/");
  const withRoles = parseUrlPath(pathname)!;
  const data = await getSession(withRoles);

  if (!data) {
    redirect("/");
  }

  //const teamDetails = await getTeamDetails();
  return (
    <div className="flex flex-col p-10 w-full">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-semibold">Minutes Live</h1>
        </div>
      </div>
      {/* <TeamsTable data={teamDetails as Team[]} /> */}
    </div>
  );
}
