import { TipTapRenderer } from "@ui/entities/posts/views/client/postDetailView/renderer";
import { PostContentMapping } from "@ui/entities/posts/views/client/postDetailView/mapping";

export function PostContent({ jsonContent }: { jsonContent: string }) {
  const data = JSON.parse(jsonContent);

  return (
    <div className="prose prose-base prose-headings:font-normal prose-headings:text-display prose-p:text-body prose-p:tracking-tight focus:outline-none max-w-full">
      <TipTapRenderer handlers={PostContentMapping} node={data} />
    </div>
  );
}
