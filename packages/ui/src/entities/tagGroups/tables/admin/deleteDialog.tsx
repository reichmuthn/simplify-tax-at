"use client";

import * as React from "react";
import { TrashIcon } from "lucide-react";
import { type Row } from "@tanstack/react-table";

import { Button } from "@ui/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui/components/ui/dialog";
import { AdminTagGroupItem } from "@app/entities/tagGroups/queries/getAdminTagGroupItems/schemas";
import { deleteTagGroups } from "@ui/entities/tagGroups/tables/admin/clientActions";

interface DeleteTasksDialogProps
  extends React.ComponentPropsWithoutRef<typeof Dialog> {
  tagGroups: Row<AdminTagGroupItem>[];
  onSuccess?: () => void;
  showTrigger?: boolean;
}

export function DeleteTagGroupsDialog({
  tagGroups,
  onSuccess,
  showTrigger = true,
  ...props
}: DeleteTasksDialogProps) {
  const [isDeletePending, startDeleteTransition] = React.useTransition();

  return (
    <Dialog {...props}>
      {showTrigger ? (
        <DialogTrigger asChild>
          <Button
            variant="secondary"
            size="icon"
            className="size-7 border"
            disabled={isDeletePending}
          >
            <TrashIcon className="size-4" aria-hidden="true" />
          </Button>
        </DialogTrigger>
      ) : null}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Bist du sicher?</DialogTitle>
          <DialogDescription>
            Diese Aktion kann nicht rückgängig gemacht werden. Es werden{" "}
            <span className="font-medium">{tagGroups.length}</span>
            {tagGroups.length === 1 ? " TagGroup" : " TagGroups"} dauerhaft
            gelöscht.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:space-x-0">
          <DialogClose asChild>
            <Button variant="outline">Abbrechen</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              aria-label="Ausgewählte Reihen löschen"
              variant="destructive"
              onClick={() => {
                startDeleteTransition(() => {
                  deleteTagGroups({
                    rows: tagGroups,
                    onSuccess,
                  });
                });
              }}
              disabled={isDeletePending}
            >
              Löschen
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
