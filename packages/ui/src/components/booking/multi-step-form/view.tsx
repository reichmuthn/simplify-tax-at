import {MultiStepForm} from "@ui/components/booking/multi-step-form/multiStepForm";
import {getAllActiveBookingSlotsQuery} from "@app/entities/bookingSlots/queries/getAllActiveBookingSlots/query";
import {MultiStepFormMessages} from "@ui/components/booking/multi-step-form/schemas";

type BookingViewProps = {
  messages: MultiStepFormMessages;
}

export async function BookingView({messages}: BookingViewProps) {
  const bookingSlots = await getAllActiveBookingSlotsQuery();

  console.log(bookingSlots);

  return (
    <MultiStepForm bookingSlots={bookingSlots} messages={messages} />
  )
}