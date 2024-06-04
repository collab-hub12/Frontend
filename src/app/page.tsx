import React from "react";
import Reusable from "@/components/custom/Reusable";
import { promises as fs } from "fs";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import ReusableCard from "@/components/custom/ReusableCard";
import LandingNav from "@/components/custom/LandingNav";
import ReusbaleGemini from "@/components/ui/ReusbaleGemini";
import ReusableFlipWord from "@/components/custom/ReusableFlipWord";

import ResusableCustomBeams from "@/components/custom/ResusableCustomBeams";
import ReusableMovingCards from "@/components/custom/ReusableMovingCards";
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
      <div className="w-full !font-sans !bg-neutral-950">
        <LandingNav />
        <div className="w-full z-0">
          <div className="relative flex min-h-screen flex-col items-center overflow-hidden w-full rounded-md z-0 -translate-y-16 ">
            <Reusable title={data.title} subtitle={data.subtitle} />
          </div>
          <div className="-translate-y-44 flex justify-center items-center w-full pb-60 h-[700px]">
            <ReusableCard />
          </div>
          <div>
            <ReusbaleGemini />
          </div>

          <div className="h-[50rem] w-full dark:bg-neutral-950  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center py-[80px]">
            {/* Radial gradient for the container to give a faded look */}
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-neutral-950 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            <div className="flex h-auto flex-col items-center justify-center relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
              CollabHub is a one stop solution
              <ReusableFlipWord />
              <div className="flex items-center pt-10 gap-10">
                <div className="flex flex-col justify-center basis-{50%] h-[400px] w-[400px] rounded-lg border-slate-800 animate-shimmer border-[0.5px] bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] p-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-[20px]">
                  <h1 className="text-[30px] font-bold text-slate-200">
                    SUPER SAIYAN PLAN
                  </h1>
                  <ul className="py-10 gap-4 flex flex-col justify-start items-start">
                    <li className="flex gap-4 items-center">
                      <div className="bg-blue-200 h-2 w-2 rounded-full"></div>
                      Unlimited Creation of Organisations
                    </li>
                    <li className="flex gap-4 items-center">
                      <div className="bg-blue-200 h-2 w-2 rounded-full"></div>
                      Unlimited Creation of Teams
                    </li>
                    <li className="flex gap-4 items-center">
                      <div className="bg-blue-200 h-2 w-2 rounded-full"></div>
                      Unlimited Creation of Tasks
                    </li>
                    <li className="flex gap-4 items-center">
                      <div className="bg-blue-200 h-2 w-2 rounded-full"></div>
                      Unlimited Usage of the flow-board
                    </li>
                  </ul>
                  <button className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
                    <span className="absolute inset-0 overflow-hidden rounded-full">
                      <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    </span>
                    <div className="relative flex justify-center space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
                      <span>Its free, For all my lovely users</span>
                    </div>
                    <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
                  </button>
                </div>
                <div className="flex flex-col justify-center basis-{50%] h-[400px] w-[400px] rounded-lg border-slate-800  border-[0.5px] bg-[linear-gradient(110deg,#000103,45%,#1e2631,40%,#000103)]  p-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-[20px]">
                  <h1 className="text-[30px] font-bold">COMING SOON</h1>
                  <ul className="py-10 gap-4 flex flex-col justify-start items-start animate-pulse">
                    <li className="w-full h-8 bg-slate-700 rounded-full"></li>
                    <li className="w-full h-8 bg-slate-700 rounded-full"></li>
                    <li className="w-full h-8 bg-slate-700 rounded-full"></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div>
            <ReusableMovingCards />
          </div>
          <div>
            <ResusableCustomBeams />
          </div>
        </div>
      </div>
    </>
  );
}
