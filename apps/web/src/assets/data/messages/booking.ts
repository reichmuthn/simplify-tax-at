export const getBookingMultiStepFormMessages = (tBooking: any) => {
  return {
    form: {
      firstName: {
        label: tBooking("Form.FirstName.label"),
        error: tBooking("Form.FirstName.error"),
      },
      lastName: {
        label: tBooking("Form.LastName.label"),
        error: tBooking("Form.LastName.error"),
      },
      eMail: {
        label: tBooking("Form.EMail.label"),
        error: tBooking("Form.EMail.error"),
      },
      phone: {
        label: tBooking("Form.Phone.label"),
        error: tBooking("Form.Phone.error"),
      },
      appointmentType: {
        label: tBooking("Form.AppointmentType.label"),
        placeholder: tBooking("Form.AppointmentType.placeholder"),
        options: [
          tBooking("Form.AppointmentType.Option.one"),
          tBooking("Form.AppointmentType.Option.two"),
        ],
        error: tBooking("Form.AppointmentType.error"),
      },
      additionalInfos: {
        label: tBooking("Form.AdditionalInfos.label"),
        description: tBooking("Form.AdditionalInfos.description"),
        error: tBooking("Form.AdditionalInfos.error"),
      },
      button: {
        ghost: {
          label: tBooking("Form.Button.Ghost.label"),
        },
        appPrimary: {
          label: tBooking("Form.Button.AppPrimary.label"),
        }
      },
      date: {
        label: tBooking("Form.Date.label"),
      },
      time: {
        label: tBooking("Form.Time.label"),
        timeFormat: tBooking("Form.Time.timeFormat"),
      },
      optional: tBooking("Form.optional"),
      concent: tBooking("Form.concent"),
      concentLink: tBooking("Form.concentLink"),
      contactDetails: {
        label: tBooking("Form.ContactDetails.label"),
      },
      appointmentDetails: {
        label: tBooking("Form.AppointmentDetails.label"),
      },
    },
    statusMessages: {
      submitSuccessful: {
        headline: tBooking("StatusMessages.SubmitSuccessful.headline"),
        message: tBooking("StatusMessages.SubmitSuccessful.message"),
        button: tBooking("StatusMessages.SubmitSuccessful.button"),
      }
    },
  };
}