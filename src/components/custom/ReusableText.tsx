"use client";
import React from "react";
import { spaceGrotesk } from "@/utilities/font";
import { TextGenerateEffect } from "../ui/text-generate-effect";
import { Flame } from "lucide-react";

interface ReusableTextProps {
  buttonText: string;
  title: string;
  subtitle: string;
}

const ReusableText: React.FC<ReusableTextProps> = ({
  buttonText,
  title,
  subtitle,
}) => {
  return (
    <>
      <div className="bg-[#474E85] rounded-full py-1 px-2 flex items-center gap-2 bg-primary-v3/10 text-primary-v2 w-max text-sm ">
        <Flame size={16} color="white" />
        <button className="text-sm text-white">{buttonText}</button>
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
