"use client";
import React, { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui/components/ui-app/select-lexicon";
import { GetActiveTermItemsSearchParams } from "@app/entities/terms/queries/getActiveTermItems/schemas";
import { UsedTermTagItem } from "@app/entities/tags/queries/getUsedTermTagItems/schemas";

type TermCategoryFilterProps = {
  searchParams: GetActiveTermItemsSearchParams;
  categoriesPromise: Promise<UsedTermTagItem[]>;
};

export function TermCategoryFilter({
  categoriesPromise,
  searchParams,
}: TermCategoryFilterProps) {
  const categories = React.use(categoriesPromise);

  const categoryOptions = [
    {
      id: "all",
      title: "Alle Kategorien",
      slug: "alle",
    },
    ...categories,
  ];

  const router = useRouter();

  const getActiveCategory = () => {
    if (!searchParams["kategorie"]) {
      return "alle";
    } else {
      const categorySlug = searchParams["kategorie"]?.toString();

      const activeCategory = categoryOptions.find(
        (x) => x.slug === categorySlug,
      );

      return activeCategory?.slug ?? "alle";
    }
  };

  const [selected, setSelected] = useState(getActiveCategory());
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setSelected(getActiveCategory());
  }, [searchParams]);

  const onCategoryChange = (categorySlug: string) => {
    startTransition(() => {
      const newSearchParams = new URLSearchParams(searchParams);

      if (categorySlug === "alle") {
        newSearchParams.delete("kategorie");
        router.push(`/de/lexikon?${newSearchParams.toString()}`);
      } else {
        newSearchParams.set("kategorie", categorySlug);
        router.push(`/de/lexikon?${newSearchParams.toString()}`);
      }
    });
  };

  return (
    <div className="relative w-36 sm:w-40 md:w-52 pl-1">
      <Select
        defaultValue={selected}
        onValueChange={onCategoryChange}
        disabled={isPending}
      >
        <SelectTrigger
          className={"border-none"}
          aria-label={"Lexikon Kategorie auswählen"}
        >
          <SelectValue placeholder="Kategorie" />
        </SelectTrigger>

        <SelectContent>
          {categoryOptions.map((category) => (
            <SelectItem key={category.id} value={category.slug!}>
              {category.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function TermCategoryFilterSkeleton() {
  return (
    <div className="relative w-40 md:w-52">
      <Select>
        <SelectTrigger
          className={"border-none"}
          aria-label={"Lexikon Kategorie auswählen"}
        >
          <SelectValue placeholder="Lade Kategorien..." />
        </SelectTrigger>
      </Select>
    </div>
  );
}
