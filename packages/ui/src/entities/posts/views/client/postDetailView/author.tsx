import React from "react";
import {SocialMediaIcon} from "@ui/components/icons/social-media-icon";
import {CldImage} from "@ui/components/cldImage";

export function Author({
  imageSrc,
  title,
  position,
  description,
  socialLinks,
}: {
  imageSrc: string;
  title: string;
  position?: string | null;
  description?: string | null;
  socialLinks: string[];
}) {
  return (
    <div className="bg-surface-2 flex flex-col md:flex-row md:items-center gap-y-4 md:gap-x-6 px-6 py-5 rounded-xl">
      <div className="relative w-20 h-20 sm:w-28 sm:h-28 md:w-40 md:h-40 shrink-0 border-[0.75px] border-white/80 rounded-lg">
        <CldImage
          className="h-full w-full object-center object-cover rounded-md"
          src={imageSrc}
          alt={title}
          sizes={"500px"}
          fill={true}
        />
      </div>

      <div className="w-full space-y-2">
        <div className="space-y-1 md:space-y-1.5">
          <div className="flex flex-row items-center justify-start gap-x-4">
            <div className="text-display font-medium text-lg md:text-xl tracking-tight">
              {title}
            </div>
            <div className="flex flex-row gap-2">
              {socialLinks?.map((x) => (
                <div className="">
                  <SocialMediaIcon
                    key={x?.toString()}
                    link={x?.toString()}
                    className="size-4 md:size-5 fill-appPrimary"
                  />
                </div>
              ))}
            </div>
          </div>
          <h5 className={`text-xs sm:text-sm md:text-base antialiased font-medium text-display -tracking-[2%]`}>
            {position}
          </h5>
        </div>
        <p className="font-normal antialiased text-sm md:text-base text-body">{description}</p>
      </div>
    </div>
  );
}
