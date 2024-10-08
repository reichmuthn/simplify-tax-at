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
import { AdminTermItem } from "@app/entities/terms/queries/getAdminTermItems/schemas";
import { deleteTerms } from "@ui/entities/terms/tables/admin/clientActions";

interface DeleteTasksDialogProps
  extends React.ComponentPropsWithoutRef<typeof Dialog> {
  terms: Row<AdminTermItem>[];
  onSuccess?: () => void;
  showTrigger?: boolean;
}

export function DeleteTermsDialog({
  terms,
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
            <span className="font-medium">{terms.length}</span>
            {terms.length === 1 ? " Term" : " Terms"} dauerhaft gelöscht.
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
                  deleteTerms({
                    rows: terms,
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
