import { kv } from "@vercel/kv";

export async function getSectionContentQuery(key: string) {
  return await kv.get<{ subtitle: string; title: string; description: string }>(
    "asm.content.exampleContent",
  );
}
