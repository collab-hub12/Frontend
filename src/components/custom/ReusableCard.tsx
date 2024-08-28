"use client";
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import React from "react";
import { Usages } from "../../public/assets";

export default function ReusableCard() {
  return (
    <CardContainer className="inter-var sm:w-full cursor-pointer">
      <CardBody className="sm:w-full shadow-2xl drop-shadow-2xl">
        <CardItem
          translateZ="100"
          className="border-2 border-landing_blue rounded-xl w-full shadow-2xl drop-shadow-[100px]"
        >
          <Image
            src={Usages.SS}
            height="1120"
            width="700"
            className="h-auto w-full object-cover rounded-xl group-hover/card:shadow-xl drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]"
            alt="thumbnail"
          />
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}
