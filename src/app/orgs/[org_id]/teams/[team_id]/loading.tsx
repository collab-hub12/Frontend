import { spaceGrotesk } from "@/utilities/font";
import { Settings } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full bg-[#13111C]">
      <Settings className="text-[#7B89D4] w-16 h-16 animate-spin" />
      <h1
        className={` ${spaceGrotesk.className} bg-clip-text text-center text-3xl font-black font-sans text-transparent bg-gradient-to-r from-[#C6BEE5] via-[#7B89D4] to-[#C6BEE5] md:text-5xl`}
      >
        Loading
      </h1>
    </div>
  );
}
