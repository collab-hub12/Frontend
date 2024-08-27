"use client";
import React from "react";
import { spaceGrotesk } from "@/utilities/font";
import { TextGenerateEffect } from "../ui/text-generate-effect";

interface ReusableTextProps {
  buttonText: string;
  title: string;
  subtitle: string;
}

const ReusableText: React.FC<ReusableTextProps> = ({ buttonText, title, subtitle }) => {
  return (
    <>
      <div className="bg-[#474E85] rounded-full py-1 px-2 flex items-center gap-2 bg-primary-v3/10 text-primary-v2 w-max text-sm ">
        <svg
          stroke="currentColor"
          fill="none"
          strokeWidth="2"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm0 -12a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm-7 12a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6z"></path>
        </svg>
        <button className="text-sm">{buttonText}</button>
      </div>
      <div className="flex flex-col">
        <h1
          className={` ${spaceGrotesk.className} bg-clip-text text-center text-3xl font-black font-sans text-transparent bg-gradient-to-r from-[#C6BEE5] via-[#7B89D4] to-[#C6BEE5] md:text-5xl`}
        >
          {title}
        </h1>
        <TextGenerateEffect
          className="text-center !text-neutral-200"
          words={`${subtitle}`}
        />
      </div>
    </>
  );
};

export default ReusableText;