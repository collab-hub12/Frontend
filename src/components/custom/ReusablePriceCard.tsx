"use client";
import React from "react";
import { spaceGrotesk } from "@/utilities/font";
import { CircleCheck } from 'lucide-react';

interface PriceCardProps {
  planName: string;
  price: string;
  features: string[];
}

const ReusablePriceCard: React.FC<PriceCardProps> = ({ planName, price, features }) => {
  return (
    <div className="h-full max-w-lg fu rounded-3xl border border-landing_blue bg-[#13111C] p-8 space-y-6">
      <div className="flex flex-col items-start space-y-4">
        <h2 className="font-medium text-xl text-neutral-200">{planName}</h2>
        <div className="flex items-center gap-2">
          <p className={`text-4xl font-bold text-neutral-200 ${spaceGrotesk.className}`}>{price}</p>
          <p className="text-sm text-[#BF93EC]">/month</p>
        </div>
        <div className="space-y-2">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center text-[#ACACAC] text-sm">
              <CircleCheck className="text-[#ACACAC] mr-2 w-4 h-4" />
              {feature}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReusablePriceCard;