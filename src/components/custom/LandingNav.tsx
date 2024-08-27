"use client";
import React from "react";
import { FloatingNav } from "../ui/floating-navbar";

export default function LandingNav() {
  const navItems = [
    {
      name: "Features",
      link: "/",
    },
    {
      name: "Pricing",
      link: "/",
    },
  ];
  return (
    <div className='relative  w-full'>
      <FloatingNav navItems={navItems} />
    </div>
  );
}
