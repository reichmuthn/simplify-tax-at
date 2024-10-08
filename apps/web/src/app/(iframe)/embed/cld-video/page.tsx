import "next-cloudinary/dist/cld-video-player.css";
import { VideoPlayer } from "@ui/components/video-player/video-player";

type PageProps = {
  searchParams: {
    width: string;
    height: string;
    publicId: string;
  };
};

export default function Page({ searchParams }: PageProps) {
  return (
    <div className={"w-full"}>
      <VideoPlayer
        width={parseInt(searchParams.width)}
        height={parseInt(searchParams.height)}
        publicId={searchParams.publicId}
      />
    </div>
  );
}
