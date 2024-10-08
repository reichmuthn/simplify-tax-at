"use client";
import { CldVideoPlayer } from "next-cloudinary";
import React, { useId, useState } from "react";
import clsx from "clsx";
import "next-cloudinary/dist/cld-video-player.css";
import { PlayIcon } from "lucide-react";

export type VideoPlayerProps = {
  publicId: string;
  width: number;
  height: number;
};

export function VideoPlayer({ publicId, width, height }: VideoPlayerProps) {
  const [startVideo, setStartVideo] = useState(false);

  const id = useId();
  const previewId = useId();

  return (
    <div className="relative rounded-lg overflow-hidden">
      {!startVideo && (
        <div
          className="group cursor-pointer absolute bg-display/5 hover:bg-display/20 inset-0 z-20 flex items-center justify-center"
          onClick={() => setStartVideo(true)}
        >
          <button
            className="rounded-full w-20 h-20 bg-primary/70 group-hover:bg-primary/90 flex items-center justify-center"
            title="Video starten"
            type="button"
          >
            <PlayIcon className="ml-1 text-white/70 group-hover:text-white/90 w-10 h-10" />
          </button>
        </div>
      )}
      {!startVideo && (
        <CldVideoPlayer
          className={clsx(!startVideo ? "!inline-block" : "!hidden")}
          id={previewId}
          width={width}
          height={height}
          src={publicId}
          logo={{
            imageUrl: "/img/Icon_white.svg",
            onClickUrl: "https://lawfinder.at",
          }}
          fluid={true}
          colors={{
            base: "#2980b8",
            accent: "#414151",
            text: "#fff",
          }}
          hideContextMenu={true}
          sourceTransformation={[{ effect: "preview" }, { duration: 15 }]}
          controls={false}
          autoplay={"on-scroll"}
          loop={true}
          muted={true}
        />
      )}
      {startVideo && (
        <CldVideoPlayer
          className={clsx(startVideo ? "!inline-block" : "!hidden")}
          id={id}
          width={width}
          height={height}
          src={publicId}
          logo={{
            imageUrl: "/img/Icon_white.svg",
            onClickUrl: "https://lawfinder.at",
          }}
          fluid={true}
          colors={{
            base: "#2980b8",
            accent: "#414151",
            text: "#fff",
          }}
          hideContextMenu={true}
          autoplay={true}
        />
      )}
    </div>
  );
}
