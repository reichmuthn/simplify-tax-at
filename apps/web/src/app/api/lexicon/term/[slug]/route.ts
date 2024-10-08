import type { NextRequest } from "next/server";
import { getTermDetailsQueryCached } from "@ui/entities/terms/views/client/termDetailView/view";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } },
) {
  const term = await getTermDetailsQueryCached(params.slug);

  return Response.json(term);
}
