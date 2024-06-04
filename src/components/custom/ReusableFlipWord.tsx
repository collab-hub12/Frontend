"use client";
import React from "react";
import { FlipWords } from "../ui/flip-words";

export default function ReusableFlipWord() {
  const words = ["Kanban", "Drawing"];
  return (
    <div className="flex gap-2 items-center">
      <FlipWords words={words} className="!text-[#4FABFF] " />

      <div className="">Board</div>
    </div>
  );
}
