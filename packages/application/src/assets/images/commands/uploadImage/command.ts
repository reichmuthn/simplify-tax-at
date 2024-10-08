import {
  UploadedImage,
  UploadImageCloudinaryResponse,
  UploadImageCommand,
} from "@app/assets/images/commands/uploadImage/schemas";
import { cloudinaryAssetsProvider } from "@app/providers/assetsProvider/provider";

export async function uploadImageCommand(values: UploadImageCommand) {
  const result: UploadImageCloudinaryResponse =
    await cloudinaryAssetsProvider.uploader.upload(values.fileDataUrl, {
      filename_override: values.filename,
      folder: values.folder,
      upload_preset: "ml_default",
    });

  return {
    url: result.secure_url,
    id: result?.asset_id || result.public_id,
    name: result.public_id,
    format: result.format,
    width: result.width,
    height: result.height,
  } as UploadedImage;
}
