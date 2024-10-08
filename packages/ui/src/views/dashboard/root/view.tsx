"use client";
import React from "react";
import Link from "next/link";
import {
  BookIcon,
  CalendarIcon,
  Home,
  Package2,
  PanelLeft,
  PenSquareIcon,
  Search,
  TagsIcon,
  UsersIcon,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@ui/components/ui/breadcrumb";
import {Button} from "@ui/components/ui/button";
import {Input} from "@ui/components/ui/input";
import {Sheet, SheetContent, SheetTrigger} from "@ui/components/ui/sheet";
import {Tooltip, TooltipContent, TooltipTrigger,} from "@ui/components/ui/tooltip";
import {usePathname} from "next/navigation";
import {cn} from "@ui/lib/utils";
import {UserButton} from "@clerk/nextjs";

const dashboardLinks = [
  {
    Icon: Home,
    label: "Dashboard",
    href: "/admin",
  },
  {
    Icon: PenSquareIcon,
    label: "Blogbeiträge",
    href: "/admin/posts",
  },
  {
    Icon: TagsIcon,
    label: "Tags",
    href: "/admin/tags",
  },
  {
    Icon: UsersIcon,
    label: "Autoren",
    href: "/admin/persons",
  },
  {
    Icon: BookIcon,
    label: "Lexikonbegriffe",
    href: "/admin/terms",
  },
  {
    Icon: CalendarIcon,
    label: "Termine",
    href: "/admin/bookings",
  }
];

export function DashboardRootView({
                                    modeToggle,
                                    children,
                                  }: {
  children: React.ReactNode;
  modeToggle: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link
            href="#"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 md:h-8 md:w-8 cursor-default"
          >
            <img
              className="block h-6 w-6 dark:saturate-0 dark:invert"
              src="/icons/icon-72x72.png"
              alt="Logo"
            />
            <span className="sr-only">Simplify Tax</span>
          </Link>
          {dashboardLinks.map((dashboardLink) => (
            <Tooltip key={dashboardLink.href}>
              <TooltipTrigger asChild>
                <Link
                  href={dashboardLink.href}
                  className={cn(
                    (pathname.startsWith(dashboardLink.href) &&
                      dashboardLink.label !== "Dashboard") ||
                    (pathname === dashboardLink.href &&
                      dashboardLink.label === "Dashboard")
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground",
                    "flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8",
                  )}
                >
                  <dashboardLink.Icon className="h-5 w-5"/>
                  <span className="sr-only">{dashboardLink.label}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                {dashboardLink.label}
              </TooltipContent>
            </Tooltip>
          ))}
        </nav>
        {/*<nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/settings"
                className={cn(
                  pathname.startsWith("/settings")
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground",
                  "flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8",
                )}
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Einstellungen</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Einstellungen</TooltipContent>
          </Tooltip>
        </nav>*/}
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header
          className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5"/>
                <span className="sr-only">Menü öffnen/schließen</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <Package2 className="h-5 w-5 transition-all group-hover:scale-110"/>
                  <span className="sr-only">Simplify Tax</span>
                </Link>
                {dashboardLinks.map((dashboardLink) => (
                  <Link
                    key={dashboardLink.href}
                    href={dashboardLink.href}
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <dashboardLink.Icon className="h-5 w-5"/>
                    {dashboardLink.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/admin">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {pathname !== "/admin" && (
                <>
                  <BreadcrumbSeparator/>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href={pathname}>
                        {
                          dashboardLinks.find(
                            (x) =>
                              pathname.startsWith(x.href) &&
                              x.label !== "Dashboard",
                          )?.label
                        }
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {/*                <BreadcrumbSeparator/>*/}
                  {/* <BreadcrumbItem>
                    <BreadcrumbPage>
                      Alle{" "}
                      {
                        dashboardLinks.find(
                          (x) =>
                            pathname.startsWith(x.href) &&
                            x.label !== "Dashboard",
                        )?.label
                      }
                    </BreadcrumbPage>
                  </BreadcrumbItem>*/}
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb>
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
            <Input
              type="search"
              placeholder="Suche..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
          </div>
          <UserButton/>
          {modeToggle}
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 overflow-x-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
