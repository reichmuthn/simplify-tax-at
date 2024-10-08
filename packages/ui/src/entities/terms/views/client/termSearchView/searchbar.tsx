"use client";
import React, {useState, useTransition} from "react";
import {usePathname, useRouter} from "next/navigation";
import {GetActiveTermItemsSearchParams} from "@app/entities/terms/queries/getActiveTermItems/schemas";
import {MagnifyingGlass, Xmark} from "@ui/components/icons/ClassicRegularIcons";
import {Spinner} from "@ui/components/icons/ClassicSolidIcons";

type TermSearchbarProps = {
  searchParams: GetActiveTermItemsSearchParams;
};

export function TermSearchbar({searchParams}: TermSearchbarProps) {
  const [searchInput, setSearchInput] = useState(searchParams["suche"] || "");
  const router = useRouter();
  const pathname = usePathname();
  const [showReset, setShowReset] = useState(false);
  const [isPending, startTransition] = useTransition();

  const searchItems = (searchValue: string) => {
    setSearchInput(searchValue);
  };

  const handleSearch = () => {
    startTransition(() => {
      const newSearchParams = new URLSearchParams(searchParams);

      newSearchParams.delete("buchstabe");
      newSearchParams.set("suche", searchInput);

      router.push(`/de/lexikon?${newSearchParams.toString()}`);
    });
  };

  const handleKeyDown = (e: any) => {
    if (e.code === "Enter") {
      e.preventDefault();
      handleSearch();
    } else if (e.code === "Escape") {
      e.preventDefault();
      handleReset();
    }
  };

  const handleReset = () => {
    setSearchInput("");
  };

  return (
    <form
      className="w-full flex flex-row items-center"
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
    >
      <div className="flex h-10 py-1 px-2 gap-1 flex-row items-center w-full rounded">
        <input
          className="pl-2 md:pl-3 w-full h-full text-sm text-body rounded bg-surface-1 py-1.5 placeholder:text-sm placeholder:text-body/60 active:border-none focus:outline-none focus:border-none focus:ring-transparent"
          placeholder="Suchen Sie nach einem Begriff …"
          value={searchInput}
          onChange={(e) => searchItems(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowReset(true)}
          onBlur={() => setShowReset(false)}
        />
        {searchInput && (
          <button
            onClick={handleReset}
            className="p-1.5 rounded text-sm sm:text-base text-body hover:text-display hover:bg-surface-2"
            role="button"
            type="reset"
          >
            <Xmark className="h-3 w-3 sm:h-4 md:w-4 fill-current"/>
          </button>
        )}
      </div>
      <button
        role="button"
        type="submit"
        className="w-auto h-full px-1 sm:px-6 py-1 bg-appAccent rounded"
      >
        {!isPending && (
          <>
            <span className="inline sm:hidden text-sm leading-6 text-white">
              <MagnifyingGlass className="w-4 h-4 fill-current m-1 p-0.5"/>
            </span>
            <span className="hidden sm:inline text-sm leading-6 text-white">
              Suchen
            </span>
          </>
        )}
        {isPending && (
          <Spinner className="animate-spin h-4 w-4 fill-white m-1 p-0.5 cursor-progress"/>
        )}
      </button>
    </form>
  );
}
