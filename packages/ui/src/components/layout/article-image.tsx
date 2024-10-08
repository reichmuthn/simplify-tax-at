import {CldImage} from "@ui/components/cldImage";
import {cn} from "@ui/lib/utils";

type ArticleImageProps = {
  className?: string,
  src: string;
  alt: string;
}

export function ArticleImage({className, src, alt}: ArticleImageProps) {
  return (
    <div className={cn("relative pb-[45%] w-full min-h-64", className)}>
      <CldImage src={src} alt={alt} fill={true}
                className={"object-cover object-top w-full h-full rounded-xl md:rounded-2xl shadow-img border-[0.75px] border-surface-1/80"}/>
    </div>
  )
}