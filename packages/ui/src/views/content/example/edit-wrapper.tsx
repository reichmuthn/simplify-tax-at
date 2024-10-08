"use client";
import React, { useEffect } from "react";
import { ExampleContentSheet } from "@ui/views/content/example/sheet";

export function ContentEditWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [content, setContent] = React.useState("");

  function handleEdit(event: Event) {
    event.preventDefault();

    const contentKey = (event.target as HTMLElement).getAttribute(
      "data-editable",
    );
    const value = (event.target as HTMLElement).textContent!;
    setIsOpen(true);
    setContent(value ?? "");
  }

  useEffect(() => {
    document.querySelectorAll("[data-editable]").forEach((element) => {
      element.addEventListener("dblclick", handleEdit);
    });
  }, []);

  return (
    <>
      <ExampleContentSheet
        onOpenChange={setIsOpen}
        open={isOpen}
        content={content}
      />
      {children}
    </>
  );
}
