import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@ui/components/ui/card";
import { ScrollArea, ScrollBar } from "@ui/components/ui/scroll-area";
import { EmptyCard } from "@ui/components/file-uploader/empty-card";
import { CldImage } from "@ui/components/cldImage";
import { UploadedFile } from "@ui/hooks/use-file-upload";

interface UploadedFilesCardProps {
  uploadedFiles: UploadedFile[];
}

export function UploadedFilesCard({ uploadedFiles }: UploadedFilesCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hochgeladene Dateien</CardTitle>
        <CardDescription>
          Hier eine Vorschau der hochgeladenen Dateien
        </CardDescription>
      </CardHeader>
      <CardContent>
        {uploadedFiles.length > 0 ? (
          <ScrollArea className="pb-4">
            <div className="flex w-max space-x-2.5">
              {uploadedFiles.map((file) => (
                <div key={file.id} className="relative aspect-video w-64">
                  <CldImage
                    src={file.url}
                    alt={file.name}
                    fill
                    sizes="(min-width: 640px) 640px, 100vw"
                    loading="lazy"
                    className="rounded-md object-cover"
                  />
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        ) : (
          <EmptyCard
            title="Keine Files hochgeladen"
            description="Lade Files hoch, um sie hier zu sehen"
            className="w-full"
          />
        )}
      </CardContent>
    </Card>
  );
}
