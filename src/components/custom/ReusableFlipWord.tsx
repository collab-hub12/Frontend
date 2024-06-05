"use client";
import React from "react";
import { FlipWords } from "../ui/flip-words";

export default function ReusableFlipWord() {
  const words = ["Kanban", "Drawing"];
  return (
    <div className="flex gap-2 items-center">
      <FlipWords words={words} className="!text-[#4FABFF] " />

      <div className="relative z-10 text-lg md:text-5xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
        Board
      </div>
    </div>
  );
}
