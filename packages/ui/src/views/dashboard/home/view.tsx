import React from "react";
import {B1, B3, H3, H4} from "@ui/typography/typography";
import Link from "next/link";
import {BookIcon, CalendarIcon, PenSquareIcon, TagsIcon, UsersIcon,} from "lucide-react";

export const dashboardMenuCards = [
  {
    title: "Blogbeiträge",
    description: "Verwalten und bearbeiten Sie alle Beiträge auf Ihrer Website.",
    icon: PenSquareIcon,
    href: "/admin/posts"
  },
  {
    title: "Tags",
    description: "Organisieren Sie Ihre Blogbeiträge mit Tags, um die Suche und Navigation zu verbessern.",
    icon: TagsIcon,
    href: "/admin/tags"
  },
  {
    title: "Autoren",
    description: "Verwalten Sie die Profile Ihrer Blogbeitragsersteller.",
    icon: UsersIcon,
    href: "/admin/persons"
  },
  {
    title: "Lexikonbegriffe",
    description: "Erstellen und verwalten Sie Begriffe und Definitionen für Ihr Online-Lexikon.",
    icon: BookIcon,
    href: "/admin/terms"
  },
  {
    title: "Termine",
    description: "Schalten und verwalten Sie Termine im Online-Buchungstool.",
    icon: CalendarIcon,
    href: "/admin/bookings"
  },
]

export async function DashboardHome() {
  return (
    <div>
      <div className="grid gap-4 py-4">
        <H3 className="dark:text-white">Home</H3>
        <B1 className="dark:text-muted-foreground">Willkommen, beim Simplify Tax Dashboard.</B1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-2">
        {dashboardMenuCards.map(item => (
          <Link href={item.href} key={item.title}
                className="bg-surface-1 dark:bg-background p-4 md:p-6 rounded-xl md:rounded-2xl shadow-img border-[0.75px] border-surface-1/80 dark:border-surface-1/20">
            <div className="bg-appPrimary dark:bg-secondary mb-8 md:mb-12 self-start rounded-lg lg:rounded-[10px] p-2.5 w-fit">
              <item.icon className="stroke-onPrimary size-4 md:size-5"/>
            </div>
            <div className={"flex flex-col gap-y-4 md:gap-y-8"}>
              <div className="flex flex-col gap-y-2 md:gap-y-4">
                <H4 className="dark:text-white">{item.title}</H4>
                <B3 className="prose prose-base dark:text-muted-foreground">{item.description}</B3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}