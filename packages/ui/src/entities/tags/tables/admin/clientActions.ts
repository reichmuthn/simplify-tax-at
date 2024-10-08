import { Row } from "@tanstack/react-table";
import { AdminTagItem } from "@app/entities/tags/queries/getAdminTagItems/schemas";
import { toast } from "sonner";
import { deleteTag } from "@ui/entities/tags/forms/admin/actions";

export function deleteTags({
  rows,
  onSuccess,
}: {
  rows: Row<AdminTagItem>[];
  onSuccess?: () => void;
}) {
  toast.promise(
    Promise.all(rows.map(async (row) => deleteTag(row.original.id))),
    {
      loading: "Lösche...",
      success: () => {
        onSuccess?.();
        return "Tags gelöscht";
      },
      error: (err) => "Fehler beim Löschen",
    },
  );
}
