"use client";
import React from "react";
import { Facebook, Twitter, Instagram } from 'lucide-react';

const LandingFooter: React.FC = () => {
  return (
    <footer className="bg-[#13111C] w-full relative z-10 backdrop-blur">
      <div className="w-full mx-auto px-auto py-14 space-y-16">
        <div className="mt-8 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Company Name. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;