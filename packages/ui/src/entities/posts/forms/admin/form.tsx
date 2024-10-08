"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/components/ui/form";
import { Button } from "@ui/components/ui/button";
import { Input } from "@ui/components/ui/input";
import { savePost } from "@ui/entities/posts/forms/admin/actions";
import { ServerAlert } from "@ui/components/ui/alert";
import {
  CreatePostCommand,
  createPostCommandSchema,
} from "@app/entities/posts/commands/createPost/schemas";
import { toast } from "sonner";
import { AdminPostItem } from "@app/entities/posts/queries/getAdminPostItems/schemas";
import { StatusEnums } from "@app/enums/status/enum";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui/components/ui/select";
import { Textarea } from "@ui/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@ui/components/ui/popover";
import { cn, getStatusIcon } from "@ui/lib/utils";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@ui/components/ui/calendar";
import { TagSelectField } from "@ui/entities/tags/fields/tagSelectField/field";
import { PersonSelectField } from "@ui/entities/persons/fields/personSelectField/field";
import { AdvancedEditor } from "@ui/components/editor/advanced-editor";
import { ImageSelectField } from "@ui/assets/images/fields/imageSelectField/field";

interface AdminPostItemFormProps {
  post?: AdminPostItem;
  onClose?: () => void;
}

export function AdminPostItemForm({ post, onClose }: AdminPostItemFormProps) {
  const [isPending, startTransition] = React.useTransition();

  const form = useForm<CreatePostCommand>({
    resolver: zodResolver(createPostCommandSchema),
    defaultValues: {
      title: post?.title ?? undefined,
      summary: post?.summary ?? undefined,
      publishedAt: post?.publishedAt ?? new Date(),
      status: post?.status ?? StatusEnums.Draft,
      tags: post?.tags?.map((tag) => tag.id) ?? [],
      author: post?.author?.id,
      content: post?.content ?? undefined,
      titleImage: post?.titleImage ?? undefined,
    },
  });

  function onSubmit(values: CreatePostCommand) {
    startTransition(async () => {
      const toastId = toast.loading("Speichere...");

      const result = await savePost(values, post?.id);

      if (result?.errors) {
        Object.keys(result?.errors).forEach((value) => {
          // @ts-ignore
          form.setError(value, { message: result.errors[value][0] });
        });
        toast.error("Speichern fehlgeschlagen.", { id: toastId });
      } else {
        toast.success("Speichern erfolgreich.", {
          id: toastId,
          action: {
            label: "Vorschau",
            onClick: () => console.log("Vorschau!"),
          },
        });
        onClose?.();
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 relative"
      >
        {form.formState.errors.root && (
          <ServerAlert message={form.formState.errors.root.message} />
        )}
        <div className={"grid grid-cols-[1fr,_100px] gap-2"}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Titel</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="titleImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Titelbild</FormLabel>
                <FormControl>
                  <ImageSelectField
                    folder={"posts"}
                    defaultValue={field.value}
                    onChange={field.onChange}
                    maxSelected={1}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className={"grid grid-cols-2 items-center gap-2"}>
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(StatusEnums).map((x) => {
                      const Icon = getStatusIcon(x);

                      return (
                        <SelectItem key={x} value={x}>
                          <div className="flex w-[6.25rem] items-center">
                            <Icon
                              className="mr-2 size-4 text-muted-foreground"
                              aria-hidden="true"
                            />
                            <span className="capitalize">{x}</span>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="publishedAt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Veröffentlicht</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full block pl-3 text-left font-normal hover:bg-background",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        <div className={"flex"}>
                          {field.value ? (
                            format(field.value, "P", {
                              locale: de,
                            })
                          ) : (
                            <span>DD.MM.YYYY</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </div>
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      locale={de}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Zusammenfassung</FormLabel>
              <FormControl>
                <Textarea className="resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <TagSelectField
                  tagGroupSlugs={["postcategories"]}
                  onChange={field.onChange}
                  defaultValue={
                    post?.tags?.map((x) => ({
                      value: x.id,
                      label: x.title,
                    })) ?? []
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Autor</FormLabel>
              <FormControl>
                <PersonSelectField
                  maxSelected={1}
                  onChange={(values) => {
                    field.onChange(values[0]);
                  }}
                  defaultValue={
                    post?.author
                      ? [
                          {
                            value: post.author.id,
                            label: post.author.title,
                          },
                        ]
                      : []
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Inhalt</FormLabel>
              <FormControl>
                <AdvancedEditor
                  onChange={field.onChange}
                  defaultValue={field.value ?? null}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div
          className={"bottom-0 left-0 right-0 sticky flex items-center gap-2"}
        >
          <Button type="submit" disabled={isPending}>
            Speichern
          </Button>
          <Button
            variant={"secondary"}
            type={"button"}
            onClick={() => {
              onClose?.();
            }}
          >
            Abbrechen
          </Button>
        </div>
      </form>
    </Form>
  );
}
