import React from "react";
import { BackgroundBeams } from "../ui/custom-beams";

export default function ResusableCustomBeams() {
  return (
    <>
      <div className="h-[20rem] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased border-none">
        <div className="max-w-2xl mx-auto p-4">
          <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
            Contact Us
          </h1>
          <p></p>
          <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
            We are team CollabHub, and we are here to help you with any queries
            you might have. Feel free to reach out to us. We are available 24/7.
          </p>
          <input
            type="text"
            placeholder="collabhub.in"
            className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500  w-full relative z-10 p-4 bg-neutral-950 placeholder:text-neutral-700 flex items-center"
          />
        </div>
        <BackgroundBeams />
      </div>
    </>
  );
}
