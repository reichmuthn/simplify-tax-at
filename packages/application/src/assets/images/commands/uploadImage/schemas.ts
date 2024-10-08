import { z } from "zod";

export const uploadImageCommandSchema = z.object({
  fileDataUrl: z.string().min(1, "FileDataUrl muss angegeben werden"),
  filename: z.string().min(1, "Dateiname muss angegeben werden"),
  folder: z.string().optional(),
});

export type UploadImageCommand = z.infer<typeof uploadImageCommandSchema>;

export type UploadImageCloudinaryResponse =
  typeof uploadImageCloudinaryExampleResponse & { asset_id?: string };

export type UploadedImage = {
  url: string;
  id: string;
  name: string;
  format: string;
  width: number;
  height: number;
};

const uploadImageCloudinaryExampleResponse = {
  public_id: "cr4mxeqx5zb8rlakpfkg",
  version: 1571218330,
  signature: "63bfbca643baa9c86b7d2921d776628ac83a1b6e",
  width: 864,
  height: 576,
  format: "jpg",
  resource_type: "image",
  created_at: "2017-06-26T19:46:03Z",
  bytes: 120253,
  type: "upload",
  url: "http://res.cloudinary.com/demo/image/upload/v1571218330/cr4mxeqx5zb8rlakpfkg.jpg",
  secure_url:
    "https://res.cloudinary.com/demo/image/upload/v1571218330/cr4mxeqx5zb8rlakpfkg.jpg",
};
