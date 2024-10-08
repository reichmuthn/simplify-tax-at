import { createImageUpload } from "novel/plugins";
import { toast } from "sonner";
import { uploadFile } from "@ui/hooks/actions";
import { getCldImageUrl } from "next-cloudinary";
import { UploadedImage } from "@app/assets/images/commands/uploadImage/schemas";

const onUpload = (file: File) => {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = (function (f) {
      return async function (e) {
        if (!e.target?.result || !f) return;

        const promise = uploadFile(e.target.result as string, f.name, "editor");

        toast.promise(
          promise.then(async (response) => {
            if (response && !Object.keys(response).includes("errors")) {
              const uploadedImage = response as UploadedImage;

              const cloudinaryUrl = getCldImageUrl({
                src: uploadedImage.url,
                width: uploadedImage.width > 1400 ? 1400 : uploadedImage.width,
              });

              const img = new Image();
              img.src = cloudinaryUrl;
              img.onload = () => {
                resolve(cloudinaryUrl);
              };
            }
          }),
          {
            loading: "Lade Bild hoch...",
            success: "Bild erfolgreich hochgeladen",
            error: (e) => e.message,
          },
        );
      };
    })(file);
  });
};

export const uploadFn = createImageUpload({
  onUpload,
  validateFn: (file) => {
    if (!file.type.includes("image/")) {
      toast.error("Dateityp nicht unterstützt.");
      return false;
    }
    if (file.size / 1024 / 1024 > 20) {
      toast.error("Datei zu groß (max 20MB).");
      return false;
    }
    return true;
  },
});
