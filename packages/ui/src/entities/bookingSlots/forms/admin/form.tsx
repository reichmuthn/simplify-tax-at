"use client";
import React from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@ui/components/ui/form";
import {Button} from "@ui/components/ui/button";
import {Input} from "@ui/components/ui/input";
import {saveBookingSlot} from "@ui/entities/bookingSlots/forms/admin/actions";
import {ServerAlert} from "@ui/components/ui/alert";
import {
  CreateBookingSlotCommand,
  createBookingSlotCommandSchema,
} from "@app/entities/bookingSlots/commands/createBookingSlot/schemas";
import {toast} from "sonner";
import {AdminBookingSlotItem} from "@app/entities/bookingSlots/queries/getAdminBookingSlotItems/schemas";
import {StatusEnums} from "@app/enums/status/enum";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@ui/components/ui/select";
import {cn, getStatusIcon} from "@ui/lib/utils";
import {Popover, PopoverContent, PopoverTrigger} from "@ui/components/ui/popover";
import {format} from "date-fns";
import {de} from "date-fns/locale";
import {CalendarIcon, InfoIcon} from "lucide-react";
import {Calendar} from "@ui/components/ui/calendar";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@ui/components/ui/tooltip";

interface AdminBookingSlotItemFormProps {
  bookingSlot?: AdminBookingSlotItem;
  onClose?: () => void;
}

export function AdminBookingSlotItemForm({
                                           bookingSlot,
                                           onClose,
                                         }: AdminBookingSlotItemFormProps) {
  const [isPending, startTransition] = React.useTransition();

  const form = useForm<CreateBookingSlotCommand>({
    resolver: zodResolver(createBookingSlotCommandSchema),
    defaultValues: {
      title: bookingSlot?.title ?? undefined,
      dateFrom: bookingSlot?.dateFrom ?? new Date(),
      dateTo: bookingSlot?.dateTo ?? new Date(),
      status: bookingSlot?.status ?? StatusEnums.Draft,
      availableTimes: bookingSlot?.availableTimes ?? undefined,
      availableWeekdays: bookingSlot?.availableWeekdays ?? undefined,
    },
  });

  function onSubmit(values: CreateBookingSlotCommand) {
    startTransition(async () => {
      const toastId = toast.loading("Speichere...");

      const result = await saveBookingSlot(values, bookingSlot?.id);

      if (result?.errors) {
        Object.keys(result?.errors).forEach((value) => {
          // @ts-ignore
          form.setError(value, {message: result.errors[value][0]});
        });
        toast.error("Speichern fehlgeschlagen.", {id: toastId});
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 relative">
        {form.formState.errors.root && (
          <ServerAlert message={form.formState.errors.root.message}/>
        )}
        <FormField
          control={form.control}
          name="title"
          render={({field}) => (
            <FormItem>
              <FormLabel>Titel</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({field}) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Status"/>
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
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dateFrom"
          render={({field}) => (
            <FormItem>
              <FormLabel>Von</FormLabel>
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
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
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
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dateTo"
          render={({field}) => (
            <FormItem>
              <FormLabel>Bis</FormLabel>
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
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
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
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="availableTimes"
          render={({field}) => (
            <FormItem>
              <FormLabel>Verfügbare Zeiten</FormLabel>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <InfoIcon
                      className="inline-flex items-center size-4 fill-transparent ml-2 hover:fill-secondary cursor-pointer"/>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Uhrzeiten</p>
                    <p className="font-normal mt-1">Format: hh:mm</p>
                    <p className="font-normal mt-1">Uhrzeiten werden durch einen Strichpunkt (;) getrennt.</p>
                    <p className="font-normal mt-1">z.B.: 10:00;11:00;11:30</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <FormControl>
                <Input {...field} placeholder={"HH:MM (z.B: 10:00;10:30)"}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="availableWeekdays"
          render={({field}) => (
            <FormItem>
              <FormLabel>Verfügbare Wochentage
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon
                        className="inline-flex items-center size-4 fill-transparent ml-2 hover:fill-secondary cursor-pointer"/>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Wochentage</p>
                      <p className="font-normal mt-1">Format: Mo / Di / Mi / Do / Fr / Sa / So</p>
                      <p className="font-normal mt-1">Wochentage werden durch einen Strichpunkt (;) getrennt.</p>
                      <p className="font-normal mt-1">z.B.: Mo;Di;Mi</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </FormLabel>
              <FormControl>
                <Input {...field} placeholder={"MO;DI;MI;DO;FR"}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <div className={"bottom-0 left-0 right-0 sticky flex items-center gap-2"}>
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
