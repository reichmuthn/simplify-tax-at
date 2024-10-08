"use client";
import { useEffect, useRef } from "react";

export function ProgressBar({
  referenceSection,
}: {
  referenceSection: string;
}) {
  const scrollBar = useRef(null);

  useEffect(() => {
    // @ts-ignore
    window.addEventListener("scroll", animateScrollbar);
    animateScrollbar();

    return () => {
      // @ts-ignore
      window.removeEventListener("scroll", animateScrollbar);
    };
  }, []);

  const animateScrollbar = () => {
    // @ts-ignore
    const section = document.querySelector(referenceSection);
    if (!section || !scrollBar || !scrollBar.current) return;
    let scrollDistance = -section.getBoundingClientRect().top;
    // @ts-ignore
    let progressWidth =
      (scrollDistance /
        (section.getBoundingClientRect().height -
          document.documentElement.clientHeight)) *
      100;

    let value = Math.floor(progressWidth);

    if (value < 0) value = 0;

    if (value > 100) value = 100;

    // @ts-ignore
    scrollBar.current.style.width = value + "%";
  };

  //pt-[49px] md:pt-[65px]
  return (
    <div className="fixed left-0 h-1 z-40 w-full">
      <div
        className="bg-appAccent h-full transition-all ease-linear"
        style={{ width: "0%" }}
        ref={scrollBar}
      ></div>
    </div>
  );
}
