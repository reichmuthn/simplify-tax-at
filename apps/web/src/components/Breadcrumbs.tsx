"use client";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@ui/components/ui/breadcrumb";
import {Link} from "@/components/localeConfig";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@ui/components/ui/dropdown-menu";
import React from "react";
import {usePathname} from "next/navigation";

type BreadcrumbsProps = {
  items: {
    href?: string,
    label?: string,
  }[];
}

const paths = {
  "kerngebiete": {
    label: "Kerngebiete"
  },
  "kerngebiete/aerzte": {
    label: "Ärzte"
  },
} as any;

const ITEMS_TO_DISPLAY = 3;

export function Breadcrumbs({items }: BreadcrumbsProps) {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const pathParts = pathname.split("/");

  const key  = pathParts[2]!;

  console.log(paths[key]?.label);

  return (<>
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href={items[0]?.href}>{items[0]?.label}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator/>
        {items.length > ITEMS_TO_DISPLAY ? (
          <>
            <BreadcrumbItem>
              <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger className="flex items-center gap-1" aria-label="Toggle menu">
                  <BreadcrumbEllipsis className="h-4 w-4"/>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {items.slice(1, -2).map((item, index) => (
                    <DropdownMenuItem key={index}>
                      <Link href="#" prefetch={false}>
                        {item.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
            <BreadcrumbSeparator/>
          </>
        ) : null}
        {items.slice(-ITEMS_TO_DISPLAY + 1).map((item, index) => (
          <BreadcrumbItem key={index}>
            {item.href ? (
              <>
                <BreadcrumbLink asChild className="max-w-20 truncate md:max-w-none">
                  <Link href="#" prefetch={false}>
                    {item.label}
                  </Link>
                </BreadcrumbLink>
                <BreadcrumbSeparator/>
              </>
            ) : (
              <BreadcrumbPage className="max-w-20 truncate md:max-w-none">{item.label}</BreadcrumbPage>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  </>)
}