import { DiscordLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { Facebook, LinkedinIcon, Slack } from "lucide-react";
import React from "react";

export default function Footer() {
  return (
    <div className="bg-neutral-950 flex p-10 w-full items-center border-none">
      <div className="flex basis-[25%]  gap-6 items-center">
        <DiscordLogoIcon color="white" />
        <TwitterLogoIcon color="white" />
      </div>
      <div className="flex basis-[50%] justify-center items-center">
        <h1 className="text-neutral-500 text-sm md:text-base text-center">
          Create. Code. Collab.
          <br /> Made with ❤️ Collabhub&apos;24
        </h1>
      </div>
      <div className="flex basis-[25%]  gap-6 justify-end items-center">
        <Slack color="white" size={16} />
        <LinkedinIcon color="white" size={16} />
      </div>
    </div>
  );
}
