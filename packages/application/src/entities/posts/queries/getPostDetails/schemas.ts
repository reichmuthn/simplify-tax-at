import { Prisma } from "@prisma/client";

export type PostDetails = Prisma.PostGetPayload<{
  select: typeof getPostDetailsSelect;
}>;

export const getPostDetailsSelect = {
  id: true,
  slug: true,
  summary: true,
  title: true,
  titleImage: true,
  publishedAt: true,
  content: true,
  tags: {
    select: {
      id: true,
      slug: true,
      title: true,
    },
  },
  author: {
    select: {
      id: true,
      image: true,
      title: true,
      position: true,
      description: true,
      socialLinks: true,
    },
  },
} satisfies Prisma.PostSelect;
