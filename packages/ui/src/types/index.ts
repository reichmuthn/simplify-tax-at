import React from "react";
export interface TableOption {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
  withCount?: boolean;
}

export interface DataTableFilterField<TData> {
  label: string;
  value: keyof TData;
  placeholder?: string;
  options?: TableOption[];
}

export interface DataTableFilterOption<TData> {
  id: string;
  label: string;
  value: keyof TData;
  options: TableOption[];
  filterValues?: string[];
  filterOperator?: string;
  isMulti?: boolean;
}
