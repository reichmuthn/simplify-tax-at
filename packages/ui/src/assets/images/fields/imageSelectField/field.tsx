"use client";
import { CldImage } from "@ui/components/cldImage";
import { AdminImageItem } from "@app/assets/images/queries/getAdminImageItems/schemas";
import React, { useEffect } from "react";
import {
  loadImages,
  loadNextImages,
} from "@ui/assets/images/fields/imageSelectField/actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@ui/components/ui/dialog";
import { ImageIcon, Search } from "lucide-react";
import { Input } from "@ui/components/ui-app/input";
import { cn } from "@ui/lib/utils";
import { Card, CardContent } from "@ui/components/ui/card";
import {
  SelectableImage,
  SelectableImageListSkeleton,
} from "@ui/assets/images/fields/imageSelectField/image";
import { Button } from "@ui/components/ui/button";
import { FileUploader } from "@ui/components/file-uploader/file-uploader";
import { useFileUpload } from "@ui/hooks/use-file-upload";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@ui/components/ui/tabs";
import { useDebounce } from "@ui/hooks/use-debounce";

export function ImageSelectField({
  onChange,
  defaultValue,
  maxSelected,
  folder,
}: {
  onChange: (value: string) => void;
  defaultValue?: string;
  maxSelected?: number;
  folder: string;
}) {
  const { uploadFiles, progresses, uploadedFiles, isUploading } =
    useFileUpload(folder);
  const [images, setImages] = React.useState<AdminImageItem[]>([]);
  const [imagesInitialized, setImagesInitialized] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const debounceSearch = useDebounce(search, 500);
  const [nextCursor, setNextCursor] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (!open || imagesInitialized) return;
    (async () => {
      const response = await loadImages(folder);
      setImages(response.items);
      setNextCursor(response.nextCursor);
      setImagesInitialized(true);
    })();
  }, [open, imagesInitialized]);

  useEffect(() => {
    if (!imagesInitialized) return;
    (async () => {
      const response = await loadImages(folder, debounceSearch);
      setImages(response.items);
      setNextCursor(response.nextCursor);
    })();
  }, [debounceSearch]);

  function loadNext() {
    if (nextCursor && !loading) {
      setLoading(true);
      (async () => {
        const response = await loadNextImages(
          nextCursor,
          folder,
          debounceSearch,
        );
        setImages((prev) => [...prev, ...response.items]);
        setNextCursor(response.nextCursor);
        setLoading(false);
      })();
    }
  }

  return (
    <>
      <div
        className={cn( "cursor-pointer")}
        onClick={() => setOpen(true)}
      >
        <div className="relative aspect-video w-14 -my-1 -mx-2">
          {defaultValue ? (
            <CldImage
              src={defaultValue}
              loading={"lazy"}
              fill={true}
              alt={defaultValue}
              sizes="100px"
              className={"w-full h-full rounded object-cover"}
            />
          ) : (
            <div
              className={
                "object-cover absolute w-full h-full flex items-center justify-center rounded bg-accent"
              }
            >
              <ImageIcon className={"w-5 h-5 shrink-0"} />
            </div>
          )}
        </div>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          onOpenAutoFocus={(event) => event.preventDefault()}
          className={"max-w-7xl h-[800px] max-h-screen content-start"}
        >
          <DialogHeader>
            <DialogTitle>Wähle ein Bild</DialogTitle>
            <DialogDescription />
          </DialogHeader>
          <Tabs defaultValue="select" className={"min-h-0 flex flex-col"}>
            <div className={"flex justify-between gap-4"}>
              <div className={"flex flex-col md:flex-row gap-4"}>
                <div className="relative flex-1 md:grow-0">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Suche..."
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                    value={search}
                    className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                  />
                </div>
                <TabsList className="grid grid-cols-2">
                  <TabsTrigger value="select">Bibliothek</TabsTrigger>
                  <TabsTrigger value="upload">Hochladen</TabsTrigger>
                </TabsList>
              </div>
              <div
                className={
                  "flex-1 grow-0 flex flex-col-reverse md:flex-row gap-4"
                }
              >
                <Button
                  variant={"default"}
                  onClick={() => {
                    onChange(selectedImage);
                    setOpen(false);
                  }}
                  disabled={!selectedImage}
                >
                  Auswählen
                </Button>
                <Button variant={"secondary"} onClick={() => setOpen(false)}>
                  Abbrechen
                </Button>
              </div>
            </div>
            <TabsContent
              value="upload"
              className={"flex flex-col gap-4 w-full min-h-0"}
            >
              <div className={"mt-2"}>
                <FileUploader
                  maxFiles={4}
                  maxSize={10 * 1024 * 1024}
                  progresses={progresses}
                  onUpload={uploadFiles}
                  disabled={isUploading}
                />
              </div>
              {uploadedFiles.length > 0 && (
                <Card className={"max-h-full overflow-y-auto"}>
                  <CardContent className={"py-6"}>
                    <div className={"flex flex-wrap gap-4"}>
                      {uploadedFiles.map((image) => (
                        <SelectableImage
                          key={image.id}
                          onSelect={() =>
                            setSelectedImage(
                              selectedImage !== image.name ? image.name : "",
                            )
                          }
                          src={image.name}
                          alt={image.name}
                          selected={
                            (!selectedImage && defaultValue === image.name) ||
                            selectedImage === image.name
                          }
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            <TabsContent value="select" className={"min-h-0"}>
              <Card className={"max-h-full overflow-y-auto"}>
                <CardContent className={"py-6"}>
                  <div className="flex flex-wrap gap-4">
                    {!imagesInitialized && <SelectableImageListSkeleton />}
                    {imagesInitialized &&
                      images.map((image) => (
                        <SelectableImage
                          key={image.id}
                          onSelect={() =>
                            setSelectedImage(
                              selectedImage !== image.name ? image.name : "",
                            )
                          }
                          src={image.name}
                          alt={image.name}
                          selected={
                            (!selectedImage && defaultValue === image.name) ||
                            selectedImage === image.name
                          }
                        />
                      ))}
                  </div>
                  {nextCursor && (
                    <div className={"text-center mt-6"}>
                      <Button
                        variant={"secondary"}
                        onClick={loadNext}
                        disabled={loading}
                      >
                        Mehr laden
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
}
