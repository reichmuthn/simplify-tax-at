import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { StatusEnum } from "@app/enums/status/enum";
import {
  CircleCheckBigIcon,
  CircleDashedIcon,
  CircleDotDashed,
  CircleIcon,
  CircleSlash2Icon,
  CircleUserIcon,
  CircleXIcon,
} from "lucide-react";

export const replaceHyphen = (value: string) => value.replaceAll('-', '‑');

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function formatBytes(
  bytes: number,
  opts: {
    decimals?: number;
    sizeType?: "accurate" | "normal";
  } = {},
) {
  const { decimals = 0, sizeType = "normal" } = opts;

  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const accurateSizes = ["Bytes", "KiB", "MiB", "GiB", "TiB"];
  if (bytes === 0) return "0 Byte";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
    sizeType === "accurate" ? accurateSizes[i] ?? "Bytest" : sizes[i] ?? "Bytes"
  }`;
}

export function getStatusIcon(status: StatusEnum) {
  const statusIcons = {
    Hidden: CircleSlash2Icon,
    Draft: CircleDashedIcon,
    Planned: CircleDotDashed,
    Active: CircleCheckBigIcon,
    Approval: CircleUserIcon,
    Expired: CircleXIcon,
  };

  return statusIcons[status] || CircleIcon;
}

export function formatDate(
  date: Date | string | number,
  opts: Intl.DateTimeFormatOptions = {},
) {
  return new Intl.DateTimeFormat("de-DE", {
    month: opts.month ?? "long",
    day: opts.day ?? "numeric",
    year: opts.year ?? "numeric",
    timeZone: "Europe/Berlin",
    ...opts,
  }).format(new Date(date));
}

export function generateScale({
  name,
  isOverlay = false,
}: {
  name: string;
  isOverlay?: boolean;
}) {
  const scale = Array.from({ length: 12 }, (_, i) => {
    const id = i + 1;
    if (isOverlay) {
      return [[`a${id}`, `var(--${name}-a${id})`]];
    }
    return [
      [id, `var(--${name}-${id})`],
      [`a${id}`, `var(--${name}-a${id})`],
    ];
  }).flat();

  return Object.fromEntries(scale);
}

/**
 * Stole this from the @radix-ui/primitive
 * @see https://github.com/radix-ui/primitives/blob/main/packages/core/primitive/src/primitive.tsx
 */
export function composeEventHandlers<E>(
  originalEventHandler?: (event: E) => void,
  ourEventHandler?: (event: E) => void,
  { checkForDefaultPrevented = true } = {},
) {
  return function handleEvent(event: E) {
    originalEventHandler?.(event);

    if (
      checkForDefaultPrevented === false ||
      !(event as unknown as Event).defaultPrevented
    ) {
      return ourEventHandler?.(event);
    }
  };
}

export const renderFullDateWithWeekday = (date: Date | null) => {
  if (!date) return;

  return new Date(date).toLocaleDateString("de-DE", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "Europe/Berlin",
  });
};

export const renderFullDate = (date: Date | null) => {
  if (!date) return;

  return new Date(date).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "Europe/Berlin",
  });
};

export const renderTime = (date: Date | null) => {
  if (!date) return;

  return new Date(date).toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Berlin",
  });
};
