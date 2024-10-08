"use client";
import React, { useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  currentPage: number;
  totalItems: number;
};

export function Pagination({ currentPage, totalItems }: PaginationProps) {
  const pageBias = 20;

  const pathname = usePathname();

  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (params.has(name)) {
        params.set(name, value);
      } else {
        params.append(name, value);
      }

      return params.toString();
    },
    [searchParams],
  );

  const totalPages = Math.ceil(totalItems / pageBias);

  const prevPage = currentPage > 1 ? currentPage - 1 : 1;
  const nextPage = currentPage === totalPages ? currentPage : currentPage + 1;

  const prevDisabledClass = currentPage === 1 ? "opacity-30" : "";
  const nextDisabledClass = currentPage == totalPages ? "opacity-30" : "";

  return (
    <nav
      className="mt-10 flex items-center justify-between border-t border-body/10 px-4 py-3"
      aria-label="Pagination"
    >
      <div className="flex flex-1 justify-between items-center pt-4">
        <Link
          href={`${pathname}?${createQueryString("seite", prevPage.toString())}`}
          title="Seite zurück"
          rel={"prev"}
          className={`relative inline-flex items-center rounded-full bg-surface-1 p-2 text-sm text-body ring-1 ring-inset ring-body/10 hover:bg-surface-2 focus-visible:outline-offset-0 ${prevDisabledClass}`}
        >
          <ChevronLeft className="w-6 h-6 text-current" />
        </Link>
        <div className="hidden sm:block">
          <p className="text-sm text-body">
            Zeige{" "}
            <span className="font-medium">
              {currentPage * pageBias - pageBias + 1}
            </span>{" "}
            bis{" "}
            <span className="font-medium">
              {totalItems >= currentPage * pageBias
                ? currentPage * pageBias
                : totalItems}
            </span>{" "}
            von <span className="font-medium">{totalItems}</span> Einträge
          </p>
        </div>
        <div className="block sm:hidden">
          <p className="text-sm text-body">
            Seite <span className="font-medium">{currentPage}</span>/
            <span className="font-medium">{totalPages}</span>
          </p>
        </div>
        <Link
          href={`${pathname}?${createQueryString("seite", nextPage.toString())}`}
          title="Seite weiter"
          rel={"next"}
          className={`relative ml-3 inline-flex items-center rounded-full bg-white p-2 text-sm text-body ring-1 ring-inset ring-body/20 hover:bg-surface-2 focus-visible:outline-offset-0 ${nextDisabledClass}`}
        >
          <ChevronRight className="w-6 h-6 text-current" />
        </Link>
      </div>
    </nav>
  );
}
