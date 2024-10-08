export type GetAdminImageItemsSearchParams = {
  search: string;
  nextCursor?: string;
};

export type GetAdminImageItemsCloudinaryResponse =
  typeof getAdminImageItemsCloudinaryExampleResponse;

export type AdminImageItem = {
  url: string;
  id: string;
  name: string;
  format: string;
  width: number;
  height: number;
};

const getAdminImageItemsCloudinaryExampleResponse = {
  total_count: 21,
  time: 9,
  next_cursor:
    "72805fc5363a90c05165c31a57e19c5b59ccbb2577c1d07e6dd8376b0961f225575b63e9e62fb032fd7bfd081143af73",
  resources: [
    {
      asset_id: "b1ce1d159bc3696e5a74d8b8aefbe707",
      public_id: "face_center",
      format: "jpg",
      version: 1333013579,
      resource_type: "image",
      type: "upload",
      created_at: "2012-03-29T09:32:59Z",
      bytes: 128891,
      width: 283,
      height: 424,
      backup: true,
      access_mode: "public",
      url: "http://res.cloudinary.com/demo/image/upload/v1333013579/face_center.jpg",
      secure_url: "https://.../image/upload/v1333013579/face_center.jpg",
    },
    {
      asset_id: "835d1cf89bd7c1b84dc4f53d35bc235f",
      public_id: "12208495",
      format: "jpg",
      resource_type: "image",
      type: "facebook",
      created_at: "2012-10-06T17:18:52Z",
      bytes: 0,
      access_mode: "public",
      url: "http://res.cloudinary.com/demo/image/facebook/12208495.jpg",
      secure_url: "https://.../image/facebook/12208495.jpg",
    },
  ],
  rate_limit_allowed: 2000,
  rate_limit_reset_at: "2024-05-22T21:00:00.000Z",
  rate_limit_remaining: 1922,
};
