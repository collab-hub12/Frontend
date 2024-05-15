"use client";
import React from "react";
import { LampContainer } from "../ui/lamp";
import { motion } from "framer-motion";
import { TextGenerateEffect } from "../ui/text-generate-effect";
import { LoginHandler } from "@/actions/auth.action";
import Image from "next/image";
import { Usages } from "../../../public/assets";
export default function Reusable({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <>
      <LampContainer>
        <motion.div
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className='flex flex-col gap-4 items-center justify-center'
        >
          <h1 className=' bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text text-center text-4xl font-medium tracking-tight text-[#4FABFF] md:text-7xl '>
            {title}
          </h1>
          <TextGenerateEffect
            className='text-center !text-slate-500 pt-4'
            words={`${subtitle}`}
          />
          <form action={LoginHandler} className='pt-4'>
            <button className='relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50'>
              <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]' />
              <span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-10 text-sm font-medium text-white backdrop-blur-3xl py-[0.5px]'>
                <img
                  className='w-6 h-6'
                  src='https://www.svgrepo.com/show/475656/google-color.svg'
                  loading='lazy'
                  alt='google logo'
                ></img>
                <span className='pl-2'>Login With Google</span>
              </span>
            </button>
          </form>
        </motion.div>
      </LampContainer>
    </>
  );
}
