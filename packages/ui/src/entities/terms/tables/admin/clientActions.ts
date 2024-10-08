import { Row } from "@tanstack/react-table";
import { AdminTermItem } from "@app/entities/terms/queries/getAdminTermItems/schemas";
import { toast } from "sonner";
import { deleteTerm } from "@ui/entities/terms/forms/admin/actions";

export function deleteTerms({
  rows,
  onSuccess,
}: {
  rows: Row<AdminTermItem>[];
  onSuccess?: () => void;
}) {
  toast.promise(
    Promise.all(rows.map(async (row) => deleteTerm(row.original.id))),
    {
      loading: "Lösche...",
      success: () => {
        onSuccess?.();
        return "Terms gelöscht";
      },
      error: (err) => "Fehler beim Löschen",
    },
  );
}
