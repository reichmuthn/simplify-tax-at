import { Row } from "@tanstack/react-table";
import { AdminTagGroupItem } from "@app/entities/tagGroups/queries/getAdminTagGroupItems/schemas";
import { toast } from "sonner";
import { deleteTagGroup } from "@ui/entities/tagGroups/forms/admin/actions";

export function deleteTagGroups({
  rows,
  onSuccess,
}: {
  rows: Row<AdminTagGroupItem>[];
  onSuccess?: () => void;
}) {
  toast.promise(
    Promise.all(rows.map(async (row) => deleteTagGroup(row.original.id))),
    {
      loading: "Lösche...",
      success: () => {
        onSuccess?.();
        return "TagGroups gelöscht";
      },
      error: (err) => "Fehler beim Löschen",
    },
  );
}
