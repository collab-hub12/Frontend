import React from "react";
import Reusable from "@/components/custom/Reusable";
import { promises as fs } from "fs";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
export default async function Landing() {
  const file = await fs.readFile(
    process.cwd() + "/public/data/usage.json",
    "utf8"
  );
  const data = JSON.parse(file);
  const session = await getSession();

  if (session) redirect("/orgs");
  return (
    <div className='w-full bg-slate-950'>
      <div className='w-full bg-black z-0'>
        <div className='relative flex min-h-screen flex-col items-center overflow-hidden bg-slate-950 w-full rounded-md z-0 -translate-y-20'>
          <Reusable title={data.title} />
        </div>
      </div>
    </div>
  );
}
