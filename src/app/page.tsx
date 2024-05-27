import React from "react";
import Reusable from "@/components/custom/Reusable";
import { promises as fs } from "fs";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import ReusableCard from "@/components/custom/ReusableCard";
import LandingNav from "@/components/custom/LandingNav";
import ReusbaleGemini from "@/components/ui/ReusbaleGemini";
export default async function Landing() {
  const file = await fs.readFile(
    process.cwd() + "/public/data/usage.json",
    "utf8"
  );
  const data = JSON.parse(file);
  const session = await getSession();

  if (!(session.statusCode === 401)) redirect("/orgs");

  return (
    <>
      <div className="w-full bg-slate-950">
        <LandingNav />
        <div className="w-full bg-slate-950 z-0">
          <div className="relative flex min-h-screen flex-col items-center overflow-hidden bg-slate-950 w-full rounded-md z-0 -translate-y-16">
            <Reusable title={data.title} subtitle={data.subtitle} />
          </div>
          <div className="-translate-y-44 flex justify-center items-center w-full">
            <ReusableCard />
          </div>
        </div>
        <ReusbaleGemini />
      </div>
    </>
  );
}
