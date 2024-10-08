"use client";
import React, {FC} from "react";
import {CldImage} from "@ui/components/cldImage";

export type CarouselItem = {
  href: string;
  title: string;
  style: string;
  srcURL: string;
}

export const LogoCarousel: FC<{ logos: CarouselItem[] }> = ({logos}) => {

  const Item = function ({href, title, style, srcURL}: CarouselItem) {
    return (
      <a href={href} key={title} className="mx-10">
        <CldImage
          src={srcURL}
          alt={title}
          width={160}
          height={100}
          className={style}
        />
      </a>
    )
  };

  return (
    <div className="relative">
      <div className="overflow-clip">
        <div className="flex items-center w-full whitespace-nowrap animate-infiniteLoop">
          {logos.map(item => (
            <Item key={item.title} href={item.href} title={item.title} style={item.style} srcURL={item.srcURL} />
          ))}
          {logos.map(item => (
            <Item key={item.title} href={item.href} title={item.title} style={item.style} srcURL={item.srcURL} />
          ))}
        </div>
      </div>
      <div
        className="absolute inset-y-0 left-0 w-[calc(100%-90%)] bg-gradient-to-l from-transparent to-surface-2"></div>
      <div
        className="absolute inset-y-0 right-0 w-[calc(100%-90%)] bg-gradient-to-r from-transparent to-surface-2"></div>
    </div>
  );
};