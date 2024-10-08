import * as React from "react";
import { toast } from "sonner";
import { uploadFile } from "@ui/hooks/actions";
import { UploadedImage } from "@app/assets/images/commands/uploadImage/schemas";

export interface UploadedFile {
  url: string;
  id: string;
  name: string;
}

export function useFileUpload(folder: string) {
  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadedFiles, setUploadedFiles] = React.useState<UploadedImage[]>([]);
  const [progresses, setProgresses] = React.useState<Record<string, number>>(
    {},
  );

  async function uploadFiles(files: File[]) {
    setIsUploading(true);
    try {
      const uploadPromises = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        if (file) {
          reader.readAsDataURL(file);
        }

        uploadPromises.push(
          new Promise((resolve) => {
            reader.onprogress = (function (f) {
              return function (e) {
                if (!f) return;
                console.log(f.name, (e.loaded / e.total) * 100);
                setProgresses((prev) => {
                  return {
                    ...prev,
                    [f.name]: (e.loaded / e.total) * 100,
                  };
                });
              };
            })(file);

            reader.onload = (function (f) {
              return async function (e) {
                if (!e.target?.result || !f) return;
                const response = await uploadFile(
                  e.target.result as string,
                  f.name,
                  folder,
                );

                if (response && !Object.keys(response).includes("errors")) {
                  const uploadedImage = response as UploadedImage;

                  setUploadedFiles((prev) =>
                    prev ? [...prev, uploadedImage] : [uploadedImage],
                  );
                  resolve(uploadedImage);
                }
              };
            })(file);
          }),
        );
        await Promise.all(uploadPromises);
      }
    } catch (err) {
      toast.error("Error");
    } finally {
      setProgresses({});
      setIsUploading(false);
    }
  }

  return {
    isUploading,
    uploadFiles,
    uploadedFiles,
    progresses,
  };
}
