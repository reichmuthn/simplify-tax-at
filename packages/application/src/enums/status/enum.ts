import { z } from "zod";

export const statusEnum = z.union([
  z.literal("Hidden"),
  z.literal("Draft"),
  z.literal("Planned"),
  z.literal("Active"),
  z.literal("Approval"),
  z.literal("Expired"),
]);

export const StatusEnums = {
  Hidden: "Hidden",
  Draft: "Draft",
  Planned: "Planned",
  Active: "Active",
  Approval: "Approval",
  Expired: "Expired",
} as const;

export type StatusEnum = z.infer<typeof statusEnum>;
