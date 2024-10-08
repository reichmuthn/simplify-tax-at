import { Row } from "@tanstack/react-table";
import { AdminPostItem } from "@app/entities/posts/queries/getAdminPostItems/schemas";
import { toast } from "sonner";
import { deletePost } from "@ui/entities/posts/forms/admin/actions";

export function deletePosts({
  rows,
  onSuccess,
}: {
  rows: Row<AdminPostItem>[];
  onSuccess?: () => void;
}) {
  toast.promise(
    Promise.all(rows.map(async (row) => deletePost(row.original.id))),
    {
      loading: "Lösche...",
      success: () => {
        onSuccess?.();
        return "Posts gelöscht";
      },
      error: (err) => "Fehler beim Löschen",
    },
  );
}
