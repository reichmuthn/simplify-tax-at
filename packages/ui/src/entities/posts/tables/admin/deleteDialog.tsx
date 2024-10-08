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
import { AdminPostItem } from "@app/entities/posts/queries/getAdminPostItems/schemas";
import { deletePosts } from "@ui/entities/posts/tables/admin/clientActions";

interface DeleteTasksDialogProps
  extends React.ComponentPropsWithoutRef<typeof Dialog> {
  posts: Row<AdminPostItem>[];
  onSuccess?: () => void;
  showTrigger?: boolean;
}

export function DeletePostsDialog({
  posts,
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
            <span className="font-medium">{posts.length}</span>
            {posts.length === 1 ? " Post" : " Posts"} dauerhaft gelöscht.
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
                  deletePosts({
                    rows: posts,
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
