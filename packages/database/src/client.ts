import { PrismaClient } from "@prisma/client";
import PrismaPaginate from "prisma-paginate";
import { SlugifyTitles } from "./extensions";

function getExtendedClient() {
  return new PrismaClient().$extends(PrismaPaginate).$extends(SlugifyTitles);
}

type ExtendedPrismaClient = ReturnType<typeof getExtendedClient>;

const globalForPrisma = global as unknown as {
  prisma: ExtendedPrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma || getExtendedClient();

export * from "prisma-paginate";

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
