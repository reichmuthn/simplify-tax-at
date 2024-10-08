import { Row } from "@tanstack/react-table";
import { AdminPersonItem } from "@app/entities/persons/queries/getAdminPersonItems/schemas";
import { toast } from "sonner";
import { deletePerson } from "@ui/entities/persons/forms/admin/actions";

export function deletePersons({
  rows,
  onSuccess,
}: {
  rows: Row<AdminPersonItem>[];
  onSuccess?: () => void;
}) {
  toast.promise(
    Promise.all(rows.map(async (row) => deletePerson(row.original.id))),
    {
      loading: "Lösche...",
      success: () => {
        onSuccess?.();
        return "Persons gelöscht";
      },
      error: (err) => "Fehler beim Löschen",
    },
  );
}
