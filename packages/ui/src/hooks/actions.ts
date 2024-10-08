"use server";

import { uploadImageCommand } from "@app/assets/images/commands/uploadImage/command";

export async function uploadFile(
  fileDataUrl: string,
  filename: string,
  folder: string,
) {
  try {
    return await uploadImageCommand({
      fileDataUrl: fileDataUrl,
      filename,
      folder: `${process.env.NEXT_PUBLIC_CLOUDINARY_ROOT_FOLDER_NAME}/${folder}`,
    });
  } catch (err) {
    return {
      errors: {
        root: ["Fehler beim Hochladen"],
      },
    };
  }
}
