"use client";
import {Button} from "@ui/components/ui-app/button";
import {Input} from "@ui/components/ui-app/input";
import {Textarea} from "@ui/components/ui-app/textarea";
import * as React from "react";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@ui/components/ui-app/form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@ui/components/ui-app/select";
import {cn} from "@ui/lib/utils";
import {Calendar} from "@ui/components/ui-app/calendar";
import {B3, H4} from "@ui/typography/typography";
import {
  MultiStepFormMessages,
  SubmitMultiStepFormCommand,
  submitMultiStepFormSchema
} from "@ui/components/booking/multi-step-form/schemas";
import {ActiveBookingSlots} from "@app/entities/bookingSlots/queries/getAllActiveBookingSlots/schemas";
import {submitMultiStepForm} from "@ui/components/booking/multi-step-form/actions";
import {BookingThankYou} from "@ui/components/booking/multi-step-form/thankYou";
import {Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow} from "@ui/components/ui-app/table";
import {fromZonedTime} from "date-fns-tz/fromZonedTime";
import {de} from "date-fns/locale";

type MultiStepFormProps = {
  bookingSlots: ActiveBookingSlots;
  messages: MultiStepFormMessages;
}

export function MultiStepForm({bookingSlots, messages}: MultiStepFormProps) {
  const [isPending, startTransition] = React.useTransition();
  const [currentStep, setCurrentStep] = useState(0);
  //const [selected, onSelect] = useState<Date>();

  const form = useForm<SubmitMultiStepFormCommand>({
    resolver: zodResolver(submitMultiStepFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      eMail: "",
      date: undefined,
      time: "",
      appointmentType: "Präsenz",
      additionalInfos: "",
    },
  });


  function onSubmit(values: SubmitMultiStepFormCommand) {
    startTransition(async () => {
      await submitMultiStepForm(values);
      setCurrentStep(0);
    });
  }

  if (form.formState.isSubmitSuccessful && !isPending) {
    return (
      <BookingThankYou messages={messages} reset={form.reset}/>
    );
  }

  const dateWatched = form.watch("date");
  const timeWatched = form.watch("time");

  function nextButtonEnabled() {
    if (currentStep === 0 && dateWatched !== undefined) return true;
    if (currentStep === 1 && timeWatched) return true;
    if (currentStep === 2) return form.formState.isValid;
    if (currentStep === 3) return true;
    return false;
  }

  function handleNext() {
    if (currentStep === 0 && dateWatched !== undefined) {
      setCurrentStep(1);
    }
    if (currentStep === 1 && timeWatched) {
      setCurrentStep(2);
    }
    if (currentStep === 2) {
      setCurrentStep(3);
    }
    if (currentStep === 3) {
      form.handleSubmit(onSubmit)();
    }
  }

  function prevButtonEnabled() {
    if (currentStep === 1) return true;
    if (currentStep === 2) return true;
    if (currentStep === 3) return true;
  }

  function handlePrev() {
    if (currentStep === 1) {
      setCurrentStep(0);
    }
    if (currentStep === 2) {
      setCurrentStep(1);
    }
    if (currentStep === 3) {
      setCurrentStep(2);
    }
  }

  function renderNextText() {
    if (currentStep === 1) {
      return "Weiter";
    }
    if (currentStep === 2) {
      return "Weiter"
    }
    if (currentStep === 3) {
      return "Terminanfrage senden"
    }
    return "Weiter";
  }

  const getFormData = () => [
    {
      label: `${messages.form.firstName.label}`,
      value: `${form.getValues("firstName")}`
    },
    {
      label: `${messages.form.lastName.label}`,
      value: `${form.getValues("lastName")}`
    },
    {
      label: `${messages.form.eMail.label}`,
      value: `${form.getValues("eMail")}`
    },
    {
      label: `${messages.form.phone.label}`,
      value: `${form.getValues("phone")}`
    },
    {
      label: `${messages.form.appointmentType.label}`,
      value: `${form.getValues("eMail")}`,
    },
    {
      label: `${messages.form.additionalInfos.label}`,
      value: `${form.getValues("additionalInfos")}`,
    }
  ];

  return (
    <div
      className="w-full p-4 md:pb-4 md:pt-6 px-6 rounded-xl md:rounded-2xl shadow-img border-[0.75px] border-surface-1/80 bg-surface-2  md:w-[500px] mx-auto">
      <Form {...form}>
        <form
          //onSubmit={form.handleSubmit(onSubmit)}
          onSubmit={(event) => event.preventDefault()}
          className="flex flex-col gap-5 w-auto pb-4">
          <div className={cn("block divide-body/10 divide-y space-y-4", currentStep !== 0 && "hidden")}>
            <div className="space-y-1">
              <H4 className="">Kalender</H4>
              <B3 className="md:text-sm">Wählen Sie ein Datum aus.</B3>
            </div>
            <div className="">
              <FormField
                control={form.control}
                name="date"
                render={({field}) => (
                  <Calendar
                    className=""
                    mode="single"
                    locale={de}
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => {
                      return new Date() > date || !Object.keys(bookingSlots).includes((fromZonedTime(date, "Europe/Berlin")).toISOString())
                    }}
                    initialFocus
                  />
                )}
              />
            </div>
          </div>
          <div className={cn("block divide-body/10 divide-y space-y-4", currentStep !== 1 && "hidden")}>
            <div className="space-y-2">
              <H4 className="">Verfügbare Uhrzeiten</H4>
              <B3 className="md:text-sm">Wählen Sie eine Uhrzeit aus.</B3>
            </div>
            <FormField
              control={form.control}
              name="time"
              render={({field}) => (
                <div className="grid gap-2 pt-6">
                  {(dateWatched ? bookingSlots[(fromZonedTime(dateWatched, "Europe/Berlin"))?.toISOString()] : [])?.map((availableTime) => (
                    <Button
                      type={"button"}
                      className={cn("w-full text-body border-body/10 bg-surface-1", availableTime === field.value && "bg-onPrimary hover:bg-surface-2 text-display outline-none ring-2 ring-appPrimary ring-offset-2 ")}
                      variant="outline"
                      key={availableTime}
                      onClick={() => field.onChange(availableTime)}
                    >
                      {availableTime}
                    </Button>
                  ))}
                </div>
              )}/>
          </div>
          <div className={cn("block divide-body/10 divide-y space-y-4", currentStep !== 2 && "hidden")}>
            <div className="space-y-1">
              <H4 className="">Kontaktdaten</H4>
              <B3 className="md:text-sm">Füllen Sie Ihre Kontaktdaten aus.</B3>
            </div>
            <div>
              <div className={cn("pt-6 space-y-4")}>
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>{messages.form.firstName.label}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>{messages.form.lastName.label}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="eMail"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>{messages.form.eMail.label}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>{messages.form.phone.label}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="appointmentType"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>{messages.form.appointmentType.label}</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={messages.form.appointmentType.placeholder}/>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {messages.form.appointmentType.options.map((x) => {
                            return (
                              <SelectItem key={x} value={x}>
                                <div className="flex w-[6.25rem] items-center">
                                  <span className="capitalize">{x}</span>
                                </div>
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                      <FormMessage/>
                    </FormItem>
                  )}/>
                <FormField
                  control={form.control}
                  name="additionalInfos"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>
                        {messages.form.additionalInfos.label} {messages.form.optional}
                      </FormLabel>
                      <FormControl>
                        <Textarea className="resize-none" {...field} rows={6}/>
                      </FormControl>
                      <FormDescription className="text-xs tracking-tight">
                        {messages.form.additionalInfos.description}
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <div className={cn("block divide-body/10 divide-y space-y-4", currentStep !== 3 && "hidden")}>
            <div className="space-y-1.5">
              <H4 className="">Terminanfrage</H4>
              <B3 className="md:text-sm">Bitte überprüfen Sie, dass alle Ihre angegebenen Daten richtig sind.</B3>
            </div>
            <div className="pt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{messages.form.appointmentDetails.label}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>{messages.form.date.label}</TableCell>
                    <TableCell>{form.getValues("date")?.toLocaleDateString("de-DE", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>{messages.form.time.label}</TableCell>
                    <TableCell>{form.getValues("time")}&nbsp;{messages.form.time.timeFormat}</TableCell>
                  </TableRow>
                </TableBody>
                <TableHeader>
                  <TableRow>
                    <TableHead>{messages.form.contactDetails.label}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="pb-4 sm:!pb-8">
                  {getFormData().map((item: any) => (
                    <TableRow key={item.label}>
                      <TableCell>{item.label}</TableCell>
                      <TableCell>{item.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={2}
                               className="text-body text-xs font-light">
                      <span>{messages.form.concent} </span><a href={"/simplify-tax-datenschutzerklärung-für-klienten-2018.pdf"} target="_blank"
                         className="hover:underline">{messages.form.concentLink}</a>.
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          </div>
          <div className="flex justify-end gap-x-2">
            <Button
              variant="ghost"
              size="sm"
              disabled={!prevButtonEnabled()}
              onClick={handlePrev}
              className={cn(currentStep === 0 && "hidden")}
            >
              {messages.form.button.ghost.label}
            </Button>
            <Button
              type="button"
              size="sm"
              disabled={!nextButtonEnabled()}
              onClick={handleNext}
            >
              {renderNextText()}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
