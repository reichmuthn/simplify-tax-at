import { prisma } from "./client";

const examplePosts = [
  {
    title: "Erster Post",
    slug: "erster-post",
  },
];

(async () => {
  try {
    await Promise.all(
      examplePosts.map(async (post) =>
        prisma.post.upsert({
          where: {
            slug: post.slug,
          },
          update: {
            ...post,
          },
          create: {
            ...post,
          },
        }),
      ),
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
