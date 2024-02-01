# Service Status Component Values

This values are used to send data through the reusable component. As mentioned above, it is reusable and only varies depending on the `.json` file received.

```javascript
    serviceStatus() {
      //Assign Date Released Value and Logic.
      let date_released_data = this.service.hospitalService.date_released
        ? {
            title: "Date Released",
            content: format(
              parseISO(this.service.hospitalService.date_released),
              "MMMM dd, yyyy"
            ),
          }
        : false;

      //Conditional for General Format and Dialysis Format Messages
      let messages = null;

      if (this.service.hospitalService.status !== "DIALYSIS") {
        messages = {
          pending: "Requested Service is pending...",
          inProgress: "Requested Service is in progress...",
          unattended: "Requested Service was unattended...",
          completed: "Requested Service was successfully completed...",
        };
      } else {
        messages = {
          pending: "Dialysis session is pending...",
          inProgress: "Dialysis session is in progress...",
          unattended: "Dialysis session was unattended...",
          completed: "Dialysis session was successfully completed...",
        };
      }

      return {
        status: this.service.hospitalService.status,
        scheduledDate: {
          title: "Scheduled Date",
          content: format(
            parseISO(this.service.hospitalService.scheduled_date),
            "MMMM dd, yyyy"
          ),
        },
        dateReleased: date_released_data,
        messages: messages,
      };
    },
```