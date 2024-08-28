import React from "react";
import Reusable from "@/components/custom/Reusable";
import { promises as fs } from "fs";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import ReusableCard from "@/components/custom/ReusableCard";
import ReusableFlipWord from "@/components/custom/ReusableFlipWord";
import ResusableCustomBeams from "@/components/custom/ResusableCustomBeams";
import ReusableMovingCards from "@/components/custom/ReusableMovingCards";
import RootLayout from "@/app/layout"; // Import the layout
import { Space_Grotesk } from "next/font/google";
import ReusableText from "@/components/custom/ReusableText";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import ReusablePriceCard from "@/components/custom/ReusablePriceCard";
import LandingFooter from "@/components/custom/LandingFooter";

const textData = [
  {
    buttonText: "Become a Beta tester!",
    title: "Welcome to Our Platform",
    subtitle: "Join us and explore the new features.",
  },
  {
    buttonText: "Sign Up Now!",
    title: "Get Started Today",
    subtitle: "Experience the best services we offer.",
  },
  {
    buttonText: "Learn More",
    title: "Discover More",
    subtitle: "Find out what makes us unique.",
  },
];

const plans = [
  {
    planName: "Basic Plan",
    price: "$9.99",
    features: [
      "Limited visualizations",
      "500 usage tokens per day",
      "File upload limit",
      "No cloud storage",
      "Normal support",
    ],
  },
  {
    planName: "Pro Plan",
    price: "$19.99",
    features: [
      "Limited visualizations",
      "500 usage tokens per day",
      "File upload limit",
      "No cloud storage",
      "Normal support",
    ],
  },
  // {
  //   planName: "Enterprise Plan",
  //   price: "$49.99",
  //   features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5"]
  // }
];

export default async function Landing() {
  const file = await fs.readFile(
    process.cwd() + "/src/public/data/usage.json",
    "utf8"
  );
  const data = JSON.parse(file);
  const session = await getSession();

  if (!(session.statusCode === 401)) redirect("/orgs");

  return (
    <>
      <div className="w-full bg-dot-white/[0.2] relative flex items-center justify-center flex-col bg-fixed !bg-[#13111C]">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <nav className="fixed w-full top-0 left-0 z-50 flex items-center px-5 pt-5">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center justify-between w-3/12 bg-primary-v3/10 border border-[#474E85] py-3 px-6 rounded-full backdrop-blur-3xl">
              <a className="font-bold text-lg text-white" href="/">
                Flint
              </a>
              <div className="flex items-center gap-3 ml-8">
                <a
                  className="text-sm font-medium text-neutral-200 hover:text-[#474E85] transition font-secondary"
                  href="/"
                >
                  Features
                </a>
                <a
                  className="text-sm font-medium text-neutral-200 hover:text-[#474E85] transition font-secondary"
                  href="/"
                >
                  Pricing
                </a>
              </div>
            </div>
            <button className="flex items-center gap-3 text-sm bg-black border border-[#474E85] !text-white py-3 px-8 h-[50px] rounded-full hover:scale-105 transition ml-10">
              Try Flint
            </button>
          </div>
        </nav>

        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center pt-44 md:pt-36 gap-4 md:gap-8 mb-32 px-4 md:px-0">
          <div className="space-y-8 flex flex-col items-center">
            <Reusable title={data.title} subtitle={data.subtitle} />
          </div>
          <div className="flex justify-center items-center w-full px-3 mb-12">
            <ReusableCard />
          </div>

          <ReusableText
            buttonText={textData[0].buttonText}
            title={textData[0].title}
            subtitle={textData[0].subtitle}
          />

          <HoverEffect
            items={[
              {
                title: "Lorem ipsum dolor sit aemt",
                description:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et ",
              },
              {
                title: "Lorem ipsum dolor sit aemt",
                description:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et ",
              },
              {
                title: "Lorem ipsum dolor sit aemt",
                description:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et ",
              },
              {
                title: "Lorem ipsum dolor sit aemt",
                description:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et ",
              },
              {
                title: "Lorem ipsum dolor sit aemt",
                description:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et ",
              },
              {
                title: "Lorem ipsum dolor sit aemt",
                description:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et ",
              },
            ]}
          />

          <ReusableText
            buttonText={textData[1].buttonText}
            title={textData[1].title}
            subtitle={textData[1].subtitle}
          />
          <div className="flex flex-wrap justify-center gap-4">
            <ReusablePriceCard
              planName={plans[0].planName}
              price={plans[0].price}
              features={plans[0].features}
            />
            <ReusablePriceCard
              planName={plans[1].planName}
              price={plans[1].price}
              features={plans[1].features}
            />
            {/* <ReusablePriceCard
          planName={plans[2].planName}
          price={plans[2].price}
          features={plans[2].features}
          /> */}
          </div>
        </div>
        <LandingFooter />
      </div>
    </>
  );
}
