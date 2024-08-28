"use client";
import React from "react";
import { Linkedin, Twitter, Github } from 'lucide-react';

const LandingFooter: React.FC = () => {
  return (
    <footer className="bg-[#13111C] w-full relative z-10 backdrop-blur border-t border-landing_blue px-12 py-10 md:px-40 md:py-14">
      <div className="flex flex-col md:flex-row justify-between">


      <div className="flex flex-col items-start">
        <a href="/" className="mb-4 md:mb-0">
          <img src="/assets/flint_logo.svg" className="w-16 h-16 md:w-20 md:h-20" alt="Flint Logo" />
        </a>
        <div className="text-left w-1/2 text-[#acacac] ">
          Lorem ipsum dolor sit amet, consectetur
        </div>
        <button className="flex items-center justify-center gap-3 text-sm bg-black border border-[#474E85] text-white py-3 px-8 h-[50px] rounded-full hover:scale-105 transition mt-4">
          Try Flint
        </button>
      </div>


      <div className="flex flex-col item-center md:items-start mt-10 md:mt-20 text-[#BF93EC] gap-2">
        <a href="/features" className="mb-4 md:mb-0">
          Features
        </a>
        <a href="/Pricing" className="mb-4 md:mb-0">
          Pricing
        </a>
      </div>
      </div>

      <div className="flex flex-col md:flex-row md:justify-between items-center mt-8">
        <div className="text-center text-[#BF93EC] text-sm mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} Flint. All rights reserved.
        </div>
        <div className="flex space-x-4">
          <a href="#" className="text-[#acacac] hover:text-[#BF93EC]">
            <Linkedin className="w-6 h-6" />
          </a>
          <a href="#" className="text-[#acacac] hover:text-[#BF93EC]">
            <Github className="w-6 h-6" />
          </a>
          <a href="#" className="text-[#acacac] hover:text-[#BF93EC]">
            <Twitter className="w-6 h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;