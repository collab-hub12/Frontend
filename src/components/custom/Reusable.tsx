"use client";
import React from "react";
import { LampContainer } from "../ui/lamp";
import { motion } from "framer-motion";
import { TextGenerateEffect } from "../ui/text-generate-effect";
import { LoginHandler } from "@/actions/auth.action";
import { spaceGrotesk } from "@/utilities/font";
import { Flame } from "lucide-react";
export default function Reusable({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <>
      <>
        {/* <motion.div
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="flex flex-col gap-4 items-center justify-center"
        > */}
        <div className="bg-[#474E85] rounded-full py-1 px-2 flex items-center gap-2 bg-primary-v3/10 text-primary-v2 w-max text-sm ">
          <Flame size={16} color="white" />
          <button className="text-sm text-white">Become a Beta tester!</button>
        </div>
        <div className="flex flex-col">
          <h1
            className={` ${spaceGrotesk.className} bg-clip-text text-center text-4xl font-black font-sans text-transparent bg-gradient-to-r from-[#C6BEE5] via-[#7B89D4] to-[#C6BEE5] md:text-7xl`}
          >
            {title}
          </h1>
          <TextGenerateEffect
            className="text-center !text-neutral-200"
            words={`${subtitle}`}
          />
        </div>
        <form action={LoginHandler} className="pt-4 flex gap-6 items-center">
          <button className="flex border bg-landing_blue border-[#474E85] py-3 px-8  rounded-full backdrop-blur-3xl">
            <span className="pl-2 text-white">Try Flint</span>
          </button>
          <a
            href="/features"
            className="flex text-[#BF93EC]  backdrop-blur-3xl underline"
          >
            See features
          </a>
        </form>
        {/* </motion.div> */}
      </>
    </>
  );
}
