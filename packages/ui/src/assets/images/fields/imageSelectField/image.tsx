import { cn } from "@ui/lib/utils";
import { CldImage } from "@ui/components/cldImage";
import React from "react";
import { CheckSquareIcon, ImageIcon } from "lucide-react";

type SelectableImageProps = {
  src: string;
  alt?: string;
  selected?: boolean;
  onSelect: () => void;
};

export function SelectableImage({
  onSelect,
  src,
  selected,
  alt,
}: SelectableImageProps) {
  return (
    <div
      className={cn(
        "relative cursor-pointer ring-2 ring-transparent group rounded hover:ring-primary",
        selected && "ring-primary",
      )}
      onClick={onSelect}
    >
      <div
        className={cn(
          "z-10 absolute inset-0 group-hover:bg-primary/20",
          selected && "bg-primary/30",
        )}
      >
        {selected && (
          <CheckSquareIcon className={"ml-2 mt-2 w-5 h-5 shrink-0"} />
        )}
      </div>
      <div
        className={cn(
          "relative pb-[56.25%] w-32 rounded bg-muted overflow-hidden",
        )}
      >
        <CldImage
          src={src}
          loading={"lazy"}
          fill={true}
          alt={alt ?? src}
          sizes="200px"
          className={"w-full h-full object-cover"}
        />
      </div>
    </div>
  );
}

export function SelectableImageListSkeleton() {
  return Array.from(Array(10).keys()).map((x) => (
    <SelectableImageSkeleton key={x} />
  ));
}

export function SelectableImageSkeleton() {
  return (
    <div
      className={cn(
        "animate-pulse relative cursor-pointer ring-2 ring-transparent group rounded",
      )}
    >
      <div className={cn("relative pb-[56.25%] w-32")}>
        <div
          className={
            "object-cover absolute w-full h-full flex items-center justify-center rounded bg-muted"
          }
        >
          <ImageIcon className={"w-5 h-5 shrink-0"} />
        </div>
      </div>
    </div>
  );
}
