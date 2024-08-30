import React from "react";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";
const testimonials = [
  {
    quote:
      "CollabHub revolutionizes remote work by seamlessly integrating task management, real-time communication, and collaborative tools into a single, user-friendly platform. Its robust features and intuitive design ensure enhanced productivity and effortless virtual team collaboration.",
    name: "Shreyak Upadhyay",
    title: "CTO, CosX",
  },
  {
    quote:
      "CollabHub's innovative real-time drawing board fosters creativity and spontaneous collaboration among team members. Additionally, its comprehensive security measures provide peace of mind by protecting sensitive data and ensuring privacy.",
    name: "Samayak Upadhyay",
    title: "CEO, CosX",
  },
  {
    quote:
      "CollabHub's customizable kanban boards streamline task management, promoting transparency and accountability within teams. Its seamless integration with AWS guarantees high availability and performance, making it an ideal solution for modern remote work environments",
    name: "Vishal Ahuja",
    title: "Founder, VNG & Cardiocare",
  },
  {
    quote:
      "CollabHub boasts an elegant and intuitive UI that enhances user experience by simplifying navigation and reducing the learning curve. Its visually appealing design ensures that all essential features are easily accessible, making collaboration both enjoyable and efficient.",
    name: "Sumit Dey",
    title: "SDE3, Betterhalf",
  },
];
export default function ReusableMovingCards() {
  return (
    <>
      <div className="h-[40rem] rounded-md flex flex-col antialiased bg-white bg-neutral-950 items-center justify-center relative overflow-hidden">
        <h1 className="relative z-10 text-lg md:text-5xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
          Loved by thousands of people.
        </h1>
        <p className="relative z-10 text-lg md:text-lg  bg-clip-text text-transparent bg-neutral-300  text-center font-sans font-medium pt-2 pb-10">
          Here's what some of our users have to say about Collabhub.
        </p>
        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          speed="slow"
        />
      </div>
    </>
  );
}
