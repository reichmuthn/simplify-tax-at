import { Row } from "@tanstack/react-table";
import { AdminQuestionGroupItem } from "@app/entities/questionGroups/queries/getAdminQuestionGroupItems/schemas";
import { toast } from "sonner";
import { deleteQuestionGroup } from "@ui/entities/questionGroups/forms/admin/actions";

export function deleteQuestionGroups({
  rows,
  onSuccess,
}: {
  rows: Row<AdminQuestionGroupItem>[];
  onSuccess?: () => void;
}) {
  toast.promise(
    Promise.all(rows.map(async (row) => deleteQuestionGroup(row.original.id))),
    {
      loading: "Lösche...",
      success: () => {
        onSuccess?.();
        return "QuestionGroups gelöscht";
      },
      error: (err) => "Fehler beim Löschen",
    },
  );
}
