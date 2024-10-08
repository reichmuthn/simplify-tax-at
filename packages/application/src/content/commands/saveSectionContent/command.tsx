import { kv } from "@vercel/kv";

export async function saveSectionContentCommand(data: {
  subtitle: string;
  title: string;
  description: string;
}) {
  await kv.set("asm.content.exampleContent", data);
}
