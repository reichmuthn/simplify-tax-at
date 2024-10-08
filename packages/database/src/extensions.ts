import { Prisma } from "@prisma/client";
import slugify from "slugify";

export function slugifyTitle(title: string) {
  return slugify(title, {
    lower: true,
    remove: /[*+~.,()'"!:@?/§]/g,
    locale: "de",
  });
}

const slugModels = [
  "Post",
  "Tag",
  "TagGroup",
  "Term",
  "Person",
  "QuestionGroup",
];

export const SlugifyTitles = Prisma.defineExtension({
  query: {
    $allModels: {
      create({ model, args, query }) {
        if (
          slugModels.includes(model) &&
          "title" in args.data &&
          args.data.title &&
          // @ts-ignore
          !args.data.slug
        ) {
          // @ts-ignore
          args.data.slug = slugifyTitle(args.data.title);
        }

        return query(args);
      },
      update({ model, args, query }) {
        if (
          slugModels.includes(model) &&
          "title" in args.data &&
          args.data.title &&
          // @ts-ignore
          !args.data.slug
        ) {
          // @ts-ignore
          args.data.slug = slugifyTitle(args.data.title as string);
        }

        return query(args);
      },
    },
  },
});
