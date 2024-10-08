import Link from "next/link";
import React from "react";
import { cn } from "@ui/lib/utils";
import { GetActiveTermItemsSearchParams } from "@app/entities/terms/queries/getActiveTermItems/schemas";

type TermLetterFilterProps = {
  searchParams: GetActiveTermItemsSearchParams;
  availableLettersPromise: Promise<string[]>;
};

const letters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

export function TermLetterFilter({
  searchParams,
  availableLettersPromise,
}: TermLetterFilterProps) {
  const availableLetters = React.use(availableLettersPromise);

  const activeLetter = searchParams["buchstabe"]?.toString();

  const isActiveLetter = (letter: string) => letter === activeLetter;
  const isAvailableLetter = (letter: string) =>
    availableLetters.includes(letter);

  const renderLetter = (letter: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete("suche");
    newSearchParams.set("buchstabe", letter);

    if (isActiveLetter(letter)) newSearchParams.delete("buchstabe");

    if (isAvailableLetter(letter)) {
      return (
        <Link
          key={letter}
          href={`/de/lexikon?${newSearchParams.toString()}`}
          className={cn(
            "h-8 p-2 flex items-center justify-center aspect-square w-auto",
            isActiveLetter(letter)
              ? "text-appPrimary"
              : "hover:rounded hover:bg-surface-3",
          )}
        >
          {letter}
        </Link>
      );
    } else {
      return (
        <span
          key={letter}
          className={
            "h-8 p-2 flex items-center justify-center aspect-square w-auto text-body/30 cursor-default"
          }
        >
          {letter}
        </span>
      );
    }
  };

  const getAllLink = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete("buchstabe");

    return newSearchParams.toString();
  };

  return (
    <div className="mt-10 mb-6">
      <div className="overflow-x-auto scrollbar-hide w-full flex flex-row items-center justify-between font-semibold text-base body capitalize">
        <Link
          href={`/de/lexikon?${getAllLink()}`}
          className={cn(
            "h-8 p-2 flex items-center justify-center aspect-square w-auto",
            activeLetter
              ? "hover:rounded hover:bg-surface-3 "
              : "text-appPrimary",
          )}
        >
          alle
        </Link>
        {letters.map((letter) => renderLetter(letter))}
      </div>
    </div>
  );
}

export function TermLetterFilterSkeleton() {
  return (
    <div className="mt-10 mb-6">
      <div className="overflow-x-auto scrollbar-hide w-full flex flex-row items-center justify-between font-semibold text-base body capitalize">
        <span
          className={cn(
            "h-8 p-2 flex items-center justify-center aspect-square w-auto text-appPrimary",
          )}
        >
          alle
        </span>
        {letters.map((letter) => (
          <span
            key={letter}
            className={
              "h-8 p-2 flex items-center justify-center aspect-square w-auto text-body/30 cursor-default"
            }
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
}
