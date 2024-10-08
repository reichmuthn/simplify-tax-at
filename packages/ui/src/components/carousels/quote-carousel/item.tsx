import React from "react";
import {CldImage} from "@ui/components/cldImage";
import {SubHeading} from "@ui/typography/typography";

export interface CarouselQuoteItemProps {
  subtitle: string;
  quote: string;
  name: string;
  position: string;
  imgSrc: string;
}

export function CarouselQuoteItem({subtitle, quote, name, position, imgSrc}: CarouselQuoteItemProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2">
      <div className="flex flex-col space-y-8 py-16 md:py-20 lg:py-24">
        <div className="space-y-4">
          <SubHeading>{subtitle}</SubHeading>
          <p className="text-display tracking-tight font-medium text-lg md:text-2xl lg:text-3xl">
            {quote}
          </p>
        </div>
        <div className="space-y-2">
          <p className="font-semibold font-lg text-display">— {name}</p>
          <p className="font-base text-body">{position}</p>
        </div>
      </div>
      <div className="h-full w-full">
        <div className="relative pb-[85%] sm:pb-[50%] md:pb-[24%] h-full">
          <CldImage src={imgSrc} alt={name} sizes={"400px"} fill={true}
                 className="w-full h-full object-contain"/>
        </div>
      </div>
    </div>
  )
}