"use client";
import React from "react";
import { MultipleSelector, SelectOption } from "@ui/components/ui/multi-select";
import { searchTags } from "@ui/entities/tags/fields/tagSelectField/actions";

const TagSelectField = ({
  onChange,
  defaultValue,
  tagGroupSlugs,
}: {
  onChange: (value: string[]) => void;
  defaultValue: SelectOption[];
  tagGroupSlugs: string[];
}) => {
  const [selected, setSelected] = React.useState<SelectOption[]>();

  React.useEffect(() => {
    if (!selected && defaultValue) setSelected(defaultValue);
  }, [selected, defaultValue]);

  const handleSelect = (options: SelectOption[]) => {
    setSelected(options);
    onChange(options.map((x) => x.value));
  };

  return (
    <MultipleSelector
      className={"bg-background"}
      value={selected}
      onChange={handleSelect}
      onSearch={async (value) => {
        return await searchTags(value, tagGroupSlugs);
      }}
      triggerSearchOnFocus
      defaultOptions={defaultValue}
      placeholder="Suche nach Tags..."
      hidePlaceholderWhenSelected
      loadingIndicator={
        <p className="py-2 text-center text-lg leading-10 text-muted-foreground">
          Suche...
        </p>
      }
      emptyIndicator={
        <p className="w-full text-center text-lg leading-10 text-muted-foreground">
          Keine Tags gefunden.
        </p>
      }
    />
  );
};

export { TagSelectField };
