"use client";
import Link from "next/link";
import React from "react";
import { ActiveTermItem } from "@app/entities/terms/queries/getActiveTermItems/schemas";
import { Badge } from "@ui/components/ui-app/badge";
import { useRouter, useSearchParams } from "next/navigation";
import {H4} from "@ui/typography/typography";

type TermListItemViewProps = {
  termItem: ActiveTermItem;
};

export function TermListItemView({ termItem }: TermListItemViewProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  return (
    <Link
      href={`/de/lexikon/${termItem.slug}`}
      onClick={(e) => {
        e.preventDefault();
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set("begriff", termItem.slug!);
        router.push(`/de/lexikon?${newSearchParams.toString()}`);
      }}
    >
      <div className="bg-white shadow-img rounded-lg border-l-2 border-l-appAccent p-4 md:p-6">
        <div className="overflow-hidden flex flex-col gap-y-6">
          <H4>{termItem.title}</H4>
          <div className="flex gap-x-4 flex-wrap">
            {termItem.tags?.map((x) => (
              <Badge key={x.title}>
                {x.title}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

export function TermListItemViewSkeleton() {
  return (
    <div>
      <div
        className="animate-pulse bg-white shadow-img rounded-lg border-l-2 border-l-appAccent p-4 md:p-6">
        <div className="overflow-hidden flex flex-col gap-y-6">
          <H4>
            <span className="h-6 bg-gray-200 rounded-full w-1/4 mb-2.5"></span>
          </H4>
          <div className="flex gap-4 mt-4 flex-wrap">
            <div className="h-5 bg-gray-200 w-20 rounded-full"></div>
            <div className="h-5 bg-gray-200 w-20 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
