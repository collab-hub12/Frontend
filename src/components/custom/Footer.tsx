import { DiscordLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { Facebook, Slack } from "lucide-react";
import React from "react";

export default function Footer() {
  return (
    <div className="bg-neutral-950 flex p-10 w-full items-center">
      <div className="flex basis-[25%]  gap-6">
        <DiscordLogoIcon color="white" />
        <TwitterLogoIcon color="white" />
      </div>
      <div className="flex basis-[50%] justify-center">
        <h1 className="text-neutral-500">
          Create. Collab. Code. Made with ❤️ Collabhub
        </h1>
      </div>
      <div className="flex basis-[25%]  gap-6 justify-end">
        <Slack color="white" />
        <Facebook color="white" />
      </div>
    </div>
  );
}
